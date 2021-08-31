from app import app
from flask import jsonify

@app.route('/')
@app.route('/index')
def index():

    dic = {
        "key": "value"
    }

    return jsonify(dic)