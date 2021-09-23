from typing import Any, Dict
from flask import jsonify, make_response, request, abort
from flask.helpers import make_response
from flask_restful import Resource
from werkzeug.exceptions import HTTPException
from werkzeug.wrappers import Response

class DeleteUser(Resource):
    def __init__(self, rs: Any, api_key: str):
        self.rs = rs
        self.api_key = api_key

    def delete(self, userId: str) -> Response:
        try:
            key = request.headers.get('API-Key')
            if key != self.api_key:
                abort(401, "Wrong API-KEY for your request!")

            self.rs.delete_user(userId)
            response = make_response('', 204)
            response.headers["Content-Type"] = "application/json"
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response
        except Exception as e:
            if isinstance(e, HTTPException):
                abort(e.code, e.description)
            else:
                abort(500, f"Something went wrong with the system! ({e})")
          
        