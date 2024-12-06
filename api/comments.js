// api/comments.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      // 더미 데이터 반환 (나중에 실제 데이터 로직으로 변경)
      res.status(200).json({ comments: [{ username: 'John', content: 'Great post!' }] });
    } else if (req.method === 'POST') {
      // 댓글 저장 완료 (여기에서 실제 댓글 저장 로직을 구현하면 됩니다)
      res.status(200).json({ message: '댓글 저장 완료' });
    } else {
      // 다른 HTTP 메서드에 대해서는 405 응답
      res.status(405).end(); // 405 Method Not Allowed
    }
  }
  