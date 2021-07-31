from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('mongodb://test:test@localhost', 27017)
# client = MongoClient('localhost', 27017)
db = client.dbindex


## HTML 화면 보여주기
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/my_stock')
def table():
    return render_template('my_stock.html')


# 종목 저장 (POST) API
@app.route('/Stock', methods=['POST'])
def save_stock():
    ticker_receive = request.form['ticker_give']
    price_receive = request.form['price_give']
    quantity_receive = request.form['quantity_give']

    doc ={'ticker':ticker_receive,'price':price_receive,'quantity':quantity_receive, 'total':float(price_receive)*int(quantity_receive)}
    db.stock.insert_one(doc)

    return jsonify({'result': 'success', 'msg': '저장완료!'})


# 목록 보기 및 편집(Read,edit) API
@app.route('/Stock', methods=['GET'])
def view_stock():
    my_stock = list(db.stock.find({}, {'_id': False}).sort('total', -1))
    return jsonify({'result': 'success','view_stock': my_stock})


@app.route('/lists', methods=['GET'])
def stock_list():
    stocks = list(db.stock.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'stock_list': stocks})


@app.route('/Stock/Edit', methods=['POST'])
def edit_stock():
    ticker_receive = request.form['ticker_give']
    quantity_receive = request.form['quantity_give']
    price_receive = request.form['price_give']
    target_stock = db.stock.find_one({'ticker': ticker_receive})
    current_quantity = target_stock['quantity']
    current_price = float(target_stock['price']) * int(current_quantity)
    new_quantity = int(current_quantity) + int(quantity_receive)
    new_price = (float(current_price) + (float(price_receive) * int(quantity_receive))) / int(new_quantity)

    db.stock.update_one({'ticker': ticker_receive}, {'$set': {'quantity': new_quantity, 'price': new_price}})
    return jsonify({'msg': '편집되었습니다!'})


@app.route('/Stock/Delete', methods=['POST'])
def delete_star():
    ticker_receive = request.form['ticker_give']
    db.stock.delete_one({'ticker': ticker_receive})
    return jsonify({'msg': '삭제되었습니다.'})


@app.route('/D_lists', methods=['GET'])
def delete_list():
    delete = list(db.stock.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'Delete_list': delete})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)