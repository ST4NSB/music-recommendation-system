from flask import jsonify, make_response, request
from flask.helpers import make_response
from flask_restful import Resource
from werkzeug.wrappers import Response

class NextSong(Resource):
    def __init__(self, rs, err_msg):
        self.rs = rs
        self.err_msg = err_msg

    def post(self) -> Response:
        try:
            result = self.rs.get_next_song(request.json)
            response = make_response(jsonify(result), 200)
            response.headers["Content-Type"] = "application/json"
            return response
        except Exception as e:
            response = make_response(e, 500) # jsonify(self.err_msg)
            response.headers["Content-Type"] = "application/json"
            return response
            
        