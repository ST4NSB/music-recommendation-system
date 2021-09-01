from flask import Flask  
from flask_restful import Api
from app.service.system import RecommendationSystem
from app.recommender import Recommender

app = Flask(__name__)  
api = Api(app)
rs = RecommendationSystem()
 
api.add_resource(Recommender, '/api/recommender/', resource_class_kwargs={'rs': rs})

if __name__ =="__main__": 
    app.run(debug = True)