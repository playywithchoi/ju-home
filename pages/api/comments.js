import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // 환경 변수에서 URI 가져오기
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, content } = req.body;

    try {
      await client.connect(); // MongoDB 연결
      const database = client.db('comments'); // 데이터베이스 선택
      const collection = database.collection('posts'); // 컬렉션 선택

      // 댓글 저장
      const newComment = { username, content, createdAt: new Date() };
      const result = await collection.insertOne(newComment);

      res.status(200).json({ message: '댓글이 저장되었습니다.', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
