const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// JSON 형식의 요청을 처리하기 위한 미들웨어
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('public'));

// 댓글 저장 파일 경로
const commentFilePath = path.join(__dirname, 'comments.txt');

// 댓글 목록 반환
app.get('/api/comments', (req, res) => {
    fs.readFile(commentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('서버 오류');
        }

        // 댓글을 줄바꿈 기준으로 분리하고, 각 댓글의 username과 content를 추출
        const comments = data.split('\n\n').map(line => {
            const match = line.match(/Username: (.+)\nContent: (.+)/);
            if (match) {
                return { username: match[1], content: match[2] };
            }
            return null;
        }).filter(comment => comment !== null);

        res.json({ comments });
    });
});

// 댓글 저장
app.post('/api/comments', (req, res) => {
    const { username, content } = req.body;

    // username과 content가 비어있으면 오류 메시지
    if (!username || !content) {
        return res.status(400).json({ message: 'Username and content are required.' });
    }

    // 댓글을 파일에 추가
    const comment = `Username: ${username}\nContent: ${content}\n\n`;
    fs.appendFile(commentFilePath, comment, (err) => {
        if (err) {
            return res.status(500).json({ message: '댓글 저장에 실패했습니다.' });
        }
        res.status(200).json({ message: '댓글이 저장되었습니다.' });
    });
});

// 댓글 삭제
app.delete('/api/comments/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(commentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('서버 오류');
        }

        const comments = data.split('\n\n');
        const newComments = comments.filter((comment, index) => index !== parseInt(id));

        if (comments.length === newComments.length) {
            return res.status(400).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        const updatedData = newComments.join('\n\n');

        fs.writeFile(commentFilePath, updatedData, (err) => {
            if (err) {
                return res.status(500).send('댓글 삭제 중 오류가 발생했습니다.');
            }
            res.status(200).json({ message: '댓글이 삭제되었습니다.' });
        });
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
