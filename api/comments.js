import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB 환경 변수 URI
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, content } = req.body;

    try {
      await client.connect();
      const database = client.db('comments');
      const collection = database.collection('posts');

      const newComment = { username, content, createdAt: new Date() };
      const result = await collection.insertOne(newComment);

      console.log("MongoDB insert result:", result); // 디버그 로그
      res.status(200).json({ message: "댓글이 저장되었습니다." });
    } catch (error) {
      console.error("MongoDB 연결 오류:", error); // 오류 처리
      res.status(500).json({ error: "서버 오류" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
