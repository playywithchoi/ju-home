from flask import Flask, request, jsonify

app = Flask(__name__)

comments = []

@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():
    if request.method == 'GET':
        return jsonify(comments)
    elif request.method == 'POST':
        data = request.get_json()
        comments.append(data)  # 댓글 추가
        return jsonify({"message": "댓글이 성공적으로 추가되었습니다."}), 201

if __name__ == '__main__':
    app.run(debug=True)
