import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, content }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>댓글을 작성해 주세요</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="댓글 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">댓글 작성</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
