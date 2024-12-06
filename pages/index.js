async function submitComment(username, content) {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, content }),
  });

  const data = await response.json();
  if (response.ok) {
    console.log(data.message);
  } else {
    console.error(data.error);
  }
}
