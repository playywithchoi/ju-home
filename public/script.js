document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    fetch('https://ju-home-qdph1q31g-yeonjus-projects-b2ee6582.vercel.app/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, content })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => console.error('댓글 저장 실패:', error));
});

fetch('https://ju-home-qdph1q31g-yeonjus-projects-b2ee6582.vercel.app/api/comments')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const commentList = document.getElementById('comments');
        commentList.innerHTML = data.comments.map(comment =>
            `<li><strong>${comment.username}:</strong> ${comment.content}</li>`
        ).join('');
    })
    .catch(error => console.error('댓글 목록 가져오기 실패:', error));
