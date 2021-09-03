from flask import Flask  
from flask_restful import Api
from app.service.system import RecommendationSystem
from app.nextsong import NextSong
from app.service.utils import Utils
import logging

logger_fn = 'info.log'
cfg = Utils.get_yaml_content('config.yml')

if cfg['clean_log']:
    Utils.clean_log(logger_fn)

app = Flask(__name__)  
api = Api(app)
logging.basicConfig(filename=logger_fn,level=logging.DEBUG)

rs = RecommendationSystem(logger=app.logger, cfg=cfg)
basic_error_message = { "error": "Something went wrong with the recommender system."}
 
api.add_resource(NextSong, '/api/recommender/nextsong', resource_class_kwargs={'rs': rs, 'err_msg': basic_error_message})

if __name__ =="__main__": 
    app.run(debug = True)