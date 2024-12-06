export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ comments: [] }); // 더미 데이터 반환
  } else if (req.method === 'POST') {
    res.status(200).json({ message: '댓글 저장 완료' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
