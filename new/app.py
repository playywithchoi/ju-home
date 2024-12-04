from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    comments = []
    if request.method == 'POST':
        username = request.form['username']
        content = request.form['content']
        
        # 댓글 파일에 저장 (UTF-8로 저장)
        with open('comments.txt', 'a', encoding='utf-8') as file:
            file.write(f"{username}: {content}\n")
    
    try:
        # 저장된 댓글 불러오기 (UTF-8로 읽음)
        with open('comments.txt', 'r', encoding='utf-8') as file:
            comments = file.readlines()
    except FileNotFoundError:
        pass

    return render_template('index.html', comments=comments)

if __name__ == '__main__':
    app.run(debug=True)
