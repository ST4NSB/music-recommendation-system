from flask import jsonify, make_response, request
from flask.helpers import make_response
from flask_restful import Resource
from werkzeug.wrappers import Response

class Recommender(Resource):
    def __init__(self, rs):
        self.rs = rs

    def post(self) -> Response:
        result = self.rs.get_next_song(request.json)
        response = make_response(jsonify(result), 200)
        response.headers["Content-Type"] = "application/json"
        return response