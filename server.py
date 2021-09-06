import os, logging
from app.repository.db_context import DBContext
from flask import Flask  
from flask_restful import Api
from app.service.system import RecommendationSystem
from app.nextsong import NextSong
from app.service.utils import Utils
import env

logger_fn = 'info.log'
cfg = Utils.get_yaml_content('config.yml')

if cfg['clean_log']:
    Utils.clean_log(logger_fn)

app = Flask(__name__)  
api = Api(app)
logging.basicConfig(filename=logger_fn,level=logging.DEBUG)

basic_error_message = { "errorMessage": "Something went wrong with the recommender system."}
mongo_db = DBContext(env.DB_USER_NAME, env.DB_USER_PASS, env.DB_CLUSTER)
rs = RecommendationSystem(logger=app.logger, db=mongo_db, cfg=cfg, rpath=app.root_path, yt_api_key = env.YT_API_KEY)

api.add_resource(NextSong, '/api/recommender/nextsong', resource_class_kwargs={'rs': rs, 'err_msg': basic_error_message})

if __name__ =="__main__": 
    app.run(debug = True)
