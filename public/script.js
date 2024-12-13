const apiURL = 'https://comments-api-e7k1.vercel.app/api/comments';

async function fetchComments() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('댓글 가져오기 실패');
    const comments = await response.json();
    console.log("API 응답 데이터:", comments);

    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // 초기화

    comments.forEach(({ name, comment, createdAt }) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${name}: ${comment} (작성 시간: ${new Date(createdAt).toLocaleString()})`;
      commentsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("댓글 목록 가져오기 실패:", error);
  }
}

async function submitComment(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');

  const commentData = {
    name: nameInput.value,
    comment: commentInput.value,
  };

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) throw new Error('댓글 저장 실패');
    console.log(await response.json());

    nameInput.value = '';
    commentInput.value = '';
    fetchComments(); // 댓글 목록 갱신
  } catch (error) {
    console.error("댓글 저장 중 오류:", error);
  }
}

document.getElementById('comment-form').addEventListener('submit', submitComment);
fetchComments();
