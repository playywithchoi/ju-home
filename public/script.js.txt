// 댓글 가져오기
function fetchComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById('comments');
            commentsList.innerHTML = '';

            data.comments.forEach(comment => {
                const listItem = document.createElement('li');
                listItem.textContent = `${comment.username}: ${comment.content}`;
                commentsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('댓글 목록 가져오기 실패:', error));
}

// 댓글 추가
function addComment(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchComments(); // 댓글 목록 갱신
        })
        .catch(error => console.error('댓글 저장 실패:', error));
}

document.getElementById('commentForm').addEventListener('submit', addComment);
fetchComments();
