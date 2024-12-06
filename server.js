// 필요한 모듈 가져오기
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // JSON 요청 처리
app.use(express.static('public')); // 정적 파일 제공

// 댓글 저장 파일 경로
const commentFilePath = path.join(__dirname, 'comments.txt');

// 1) 댓글 목록 반환
app.get('/api/comments', (req, res) => {
    fs.readFile(commentFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 파일이 없으면 빈 배열 반환
                return res.json({ comments: [] });
            }
            return res.status(500).json({ error: '서버 오류' });
        }

        // 파일 내용 파싱
        const comments = data
            .trim()
            .split('\n')
            .filter(line => line.includes(':'))
            .map(line => {
                const [username, content] = line.split(':');
                return { username: username.trim(), content: content.trim() };
            });

        res.json({ comments });
    });
});

// 2) 댓글 저장
app.post('/api/comments', (req, res) => {
    const { username, content } = req.body;

    // 유효성 검사
    if (!username || !content) {
        return res.status(400).json({ error: '유효하지 않은 데이터' });
    }

    // 새로운 댓글 추가
    const comment = `${username}:${content}\n`;
    fs.appendFile(commentFilePath, comment, (err) => {
        if (err) {
            return res.status(500).json({ error: '서버 오류' });
        }
        res.status(200).json({ message: '댓글이 저장되었습니다.' });
    });
});

// 서버 실행
const port = 3000;
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
