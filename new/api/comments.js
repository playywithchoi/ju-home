import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const commentFilePath = path.join(process.cwd(), 'comments.txt');

    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(commentFilePath, 'utf8');
            const comments = data.split('\n').filter(Boolean).map(line => {
                const [username, content] = line.split(':');
                return { username, content };
            });
            res.status(200).json({ comments });
        } catch (error) {
            res.status(500).json({ error: 'Unable to read comments.' });
        }
    } else if (req.method === 'POST') {
        const { username, content } = req.body;
        try {
            fs.appendFileSync(commentFilePath, `${username}:${content}\n`);
            res.status(200).json({ message: 'Comment added.' });
        } catch (error) {
            res.status(500).json({ error: 'Unable to save comment.' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
