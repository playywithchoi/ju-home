import { MongoClient } from 'mongodb';

// 환경 변수에서 MongoDB URI 가져오기
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서 MongoDB 클라이언트를 캐싱
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 프로덕션 환경에서 새 클라이언트를 생성
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { comment } = req.body;

    if (!comment) {
      res.status(400).json({ error: 'Comment is required' });
      return;
    }

    try {
      const client = await clientPromise;
      const database = client.db('comments'); // 데이터베이스 이름
      const collection = database.collection('posts'); // 컬렉션 이름

      const result = await collection.insertOne({ comment, createdAt: new Date() });
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error('Database error:', error); // 상세 로그 추가
      res.status(500).json({ error: 'Failed to save comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
