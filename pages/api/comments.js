import { MongoClient } from 'mongodb';

// MongoDB URI
const uri = process.env.MONGODB_URI;  // 환경 변수에서 URI를 가져옴
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, content } = req.body;

    try {
      await client.connect();  // MongoDB 연결
      const database = client.db('comments');  // 'comments' 데이터베이스 선택
      const collection = database.collection('posts');  // 'posts' 컬렉션 선택

      const newComment = { username, content };  // 댓글 데이터
      await collection.insertOne(newComment);  // MongoDB에 데이터 삽입

      res.status(200).json({ message: '댓글이 저장되었습니다.' });  // 성공 메시지
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });  // 오류 처리
    } finally {
      await client.close();  // MongoDB 연결 종료
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });  // 잘못된 요청 처리
  }
}
