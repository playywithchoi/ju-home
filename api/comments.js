const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const commentFilePath = path.join(process.cwd(), 'comments.txt');

    if (req.method === 'GET') {
        fs.readFile(commentFilePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ error: '서버 오류' });
                return;
            }

            const comments = data.trim().split('\n').map(line => {
                const [username, content] = line.split(':');
                return { username: username.trim(), content: content.trim() };
            });

            res.status(200).json({ comments });
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
