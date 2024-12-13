import { useState, useEffect } from 'react';

export default function ChristmasPage() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // 댓글 목록 가져오기
  const fetchComments = async () => {
    const res = await fetch('/api/comments');
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 댓글 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !comment) {
      alert('이름과 댓글을 모두 입력해주세요.');
      return;
    }

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: name, content: comment }),
    });

    if (res.ok) {
      setName('');
      setComment('');
      fetchComments(); // 댓글 제출 후 목록 갱신
    } else {
      alert('댓글 제출에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>크리스마스 페이지</h1>
      <div>
        <h2>댓글</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}</strong>: {comment.content}
            </li>
          ))}
        </ul>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">댓글 제출</button>
      </form>
    </div>
  );
}
