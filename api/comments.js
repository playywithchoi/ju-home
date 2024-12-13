<<<<<<< HEAD
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

=======
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ comments: [] }); // 더미 데이터 반환
  } else if (req.method === 'POST') {
    res.status(200).json({ message: '댓글 저장 완료' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
>>>>>>> 3c3af15 (Fix eslint error)
