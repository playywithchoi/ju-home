import { useState, useEffect } from 'react';

export default function ChristmasPage() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('댓글 목록 가져오기 실패:', error);
      }
    };

    fetchComments();
  }, []);

  // 댓글 제출
  const submitComment = async (e) => {
    e.preventDefault();

    const newComment = { name, comment };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, { ...newComment, createdAt: new Date() }]);
        setName('');
        setComment('');
      } else {
        console.error('댓글 저장 실패');
      }
    } catch (error) {
      console.error('댓글 저장 중 오류:', error);
    }
  };

  return (
    <div>
      <h1>크리스마스 페이지</h1>

      {/* 댓글 목록 출력 */}
      <div>
        <h2>댓글 목록</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p><strong>{comment.name}</strong>: {comment.comment}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 작성 폼 */}
      <form onSubmit={submitComment}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="댓글을 남겨주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
}
