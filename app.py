from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbindex


## HTML 화면 보여주기
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/my_stock')
def table():
    return render_template('my_stock.html')

# 주문하기(POST) API
@app.route('/Stock', methods=['POST'])
def save_stock():
    ticker_receive = request.form['ticker_give']
    price_receive = request.form['price_give']
    quantity_receive = request.form['quantity_give']

    doc ={'ticker':ticker_receive,'price':price_receive,'quantity':quantity_receive}
    db.stock.insert_one(doc)

    return jsonify({'result': 'success', 'msg': '저장완료!'})


# 주문 목록보기(Read) API
@app.route('/Stock', methods=['GET'])
def view_stock():
    my_stock= list(db.stock.find({}, {'_id': False}))
    return jsonify({'result': 'success','view_stock': my_stock})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)