from flask import Flask  
from flask_restful import Api
from app.service.system import RecommendationSystem
from app.nextsong import NextSong

app = Flask(__name__)  
api = Api(app)
rs = RecommendationSystem()
basic_error_message = { "error": "Something went wrong with the recommender system."}
 
api.add_resource(NextSong, '/api/recommender/nextsong', resource_class_kwargs={'rs': rs, 'err_msg': basic_error_message})

if __name__ =="__main__": 
    app.run(debug = True)