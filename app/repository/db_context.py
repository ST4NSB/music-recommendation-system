import os
import pymongo

class DBContext:
    def __init__(self, name, passw, cluster):
        connection_string = f"mongodb+srv://{name}:{passw}@{cluster}.qxsgc.mongodb.net/music_recommender?retryWrites=true&w=majority"
        client = pymongo.MongoClient(connection_string)
        self.db = client['music_recommender']

    def user_has_songs(self, user_id):
        user_recs = self.db['user_recommended_songs']
        if user_recs.find_one({'user_id': user_id}):
            return True
        return False
    
    def insert_user_songs(self, songs):
        user_recs = self.db['user_recommended_songs']
        user_recs.insert_one(songs)

    def update_user_songs(self, user_id, songs):
        user_recs = self.db['user_recommended_songs']
        user_recs.update_one({"user_id": user_id}, { "$set": {"songs": songs} }, upsert=True)
        