from typing import Any, Dict
from flask import jsonify, make_response, request
from flask.helpers import make_response
from flask_restful import Resource
from werkzeug.wrappers import Response

class RandomSongs(Resource):
    def __init__(self, rs: Any, api_key: str):
        self.rs = rs
        self.api_key = api_key

    def post(self) -> Response:
        try:
            key = request.headers.get('API-Key')
            if key != self.api_key:
                raise Exception("Wrong API-KEY for your request~401")
                
            result = self.rs.get_random_songs(request.json)
            response = make_response(jsonify(result), 200)
            response.headers["Content-Type"] = "application/json"
            return response
        except Exception as e:
            err = str(e).split('~')    
            error = { "errorMessage": f"Something went wrong with the system! (Details: {err[0]})" }
            code = 400
            if len(err) > 1:
                code = err[1]
            response = make_response(jsonify(error), code)
            response.headers["Content-Type"] = "application/json"
            return response
          
        