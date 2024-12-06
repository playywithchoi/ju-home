import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // 환경 변수에서 URI를 가져옴
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, content } = req.body;

    try {
      await client.connect();
      const database = client.db('comments');
      const collection = database.collection('posts');

      const newComment = { username, content };
      await collection.insertOne(newComment);

      res.status(200).json({ message: '댓글이 저장되었습니다.' });
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
