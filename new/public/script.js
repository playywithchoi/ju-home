// 댓글 목록을 화면에 표시하는 함수
function loadComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            const commentList = document.getElementById('commentList');
            commentList.innerHTML = ''; // 기존 목록 초기화

            data.comments.forEach((comment, index) => {
                const li = document.createElement('li');
                li.textContent = `${comment.username}: ${comment.content}`;
                
                // 삭제 버튼 추가
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.onclick = () => deleteComment(index); // 삭제 기능 호출
                
                li.appendChild(deleteButton);
                commentList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('댓글을 불러오는 데 실패했습니다.', error);
        });
}

// 댓글 삭제 함수
function deleteComment(id) {
    fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === '댓글이 삭제되었습니다.') {
            alert('댓글이 삭제되었습니다.');
            loadComments();  // 댓글 목록 새로 고침
        } else {
            alert('댓글 삭제에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('댓글 삭제 중 오류가 발생했습니다.', error);
    });
}

// 댓글 작성 처리
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

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
            loadComments();  // 댓글 목록 새로 고침
        } else {
            alert('댓글 저장 중 오류가 발생했습니다.');
        }
    })
    .catch(error => {
        console.error('댓글 저장 중 오류가 발생했습니다.', error);
    });
});

// 페이지가 로드될 때 댓글 목록 불러오기
loadComments();
