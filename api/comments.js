import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // 환경 변수에서 MongoDB URI 가져오기
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, content } = req.body;

    try {
      console.log('Connecting to MongoDB...');
      await client.connect(); // MongoDB 연결
      console.log('Connected successfully to MongoDB.');

      const database = client.db('comments'); // 데이터베이스 선택
      const collection = database.collection('posts'); // 컬렉션 선택
      console.log('Database and collection selected.');

      const newComment = { username, content }; // 댓글 데이터 생성
      const result = await collection.insertOne(newComment); // 데이터 삽입
      console.log('Comment inserted:', result);

      res.status(200).json({ message: '댓글이 저장되었습니다.' });
    } catch (error) {
      console.error('MongoDB connection error:', error); // 에러 로깅
      res.status(500).json({ error: '서버 오류 발생' });
    } finally {
      console.log('Closing MongoDB connection...');
      await client.close(); // 연결 종료
     
