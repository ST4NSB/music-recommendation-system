import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.flaskenv')
load_dotenv(dotenv_path)

DB_USER_NAME = os.environ.get('DB_USER_NAME')
DB_USER_PASS = os.environ.get('DB_USER_PASS')
DB_CLUSTER = os.environ.get('DB_CLUSTER_NAME')
YT_API_KEY = os.environ.get('YT_API_KEY')

assert DB_USER_NAME
assert DB_USER_PASS
assert DB_CLUSTER
assert YT_API_KEY