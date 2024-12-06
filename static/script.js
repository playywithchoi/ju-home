// 댓글 목록 가져오기
function loadComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = '';  // 기존 댓글 목록 초기화

            data.comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = `${comment.username}: ${comment.content}`;
                commentsList.appendChild(li);
            });
        })
        .catch(error => console.error('댓글 목록 가져오기 실패:', error));
}

// 댓글 저장
document.getElementById('commentForm').addEventListener('submit', (event) => {
    event.preventDefault();  // 폼 제출 시 페이지 리로드 방지

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, content }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === '댓글이 저장되었습니다.') {
            loadComments();  // 댓글 목록 새로고침
            alert('댓글이 저장되었습니다.');
        } else {
            alert('댓글 저장 실패: ' + data.message);
        }
    })
    .catch(error => {
        alert('댓글 저장 중 오류 발생');
        console.error(error);
    });
});

// 페이지 로드 시 댓글 목록 가져오기
window.onload = loadComments;
// 댓글 목록 가져오기
function loadComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = '';  // 기존 댓글 목록 초기화

            data.comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = `${comment.username}: ${comment.content}`;
                commentsList.appendChild(li);
            });
        })
        .catch(error => console.error('댓글 목록 가져오기 실패:', error));
}

// 댓글 저장
document.getElementById('commentForm').addEventListener('submit', (event) => {
    event.preventDefault();  // 폼 제출 시 페이지 리로드 방지

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, content }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === '댓글이 저장되었습니다.') {
            loadComments();  // 댓글 목록 새로고침
            alert('댓글이 저장되었습니다.');
        } else {
            alert('댓글 저장 실패: ' + data.message);
        }
    })
    .catch(error => {
        alert('댓글 저장 중 오류 발생');
        console.error(error);
    });
});

// 페이지 로드 시 댓글 목록 가져오기
window.onload = loadComments;
