// api/comments.js

let comments = [];  // 댓글을 메모리 상에 저장 (실제 서비스에서는 데이터베이스 사용)

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 댓글 목록을 반환
        res.status(200).json({ comments });
    } else if (req.method === 'POST') {
        // 댓글 추가
        const { username, content } = req.body;
        comments.push({ username, content });
        res.status(201).json({ message: 'Comment added!' });
    } else {
        // 다른 HTTP 메소드 처리
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
