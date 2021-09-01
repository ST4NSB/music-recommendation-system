from flask import jsonify, make_response
from flask.helpers import make_response
from flask_restful import Resource
from werkzeug.wrappers import Response

class Recommender(Resource):
    def __init__(self, rs):
        self.rs = rs

    def get(self) -> Response:

        result = self.rs.get_next_movie([1,1,2])
        d = {
            "id": result
        }

        response = make_response(jsonify(d), 200)
        response.headers["Content-Type"] = "application/json"
        return response