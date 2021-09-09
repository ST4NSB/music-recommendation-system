from typing import Dict
from pymongo import MongoClient

class DBContext:
    def __init__(self, name: str, passw: str, cluster: str):
        connection_string = f"mongodb+srv://{name}:{passw}@{cluster}.qxsgc.mongodb.net/music_recommender?retryWrites=true&w=majority"
        client = MongoClient(connection_string)
        self.db = client['music_recommender']

    def user_has_songs(self, user_id: str) -> bool:
        user_recs = self.db['user_recommended_songs']
        if user_recs.find_one({'user_id': user_id}):
            return True
        return False
    
    def insert_user_songs(self, songs: Dict) -> None:
        user_recs = self.db['user_recommended_songs']
        user_recs.insert_one(songs)

    def update_user_songs(self, user_id: str, songs: Dict, liked_songs: int) -> None:
        user_recs = self.db['user_recommended_songs']
        user_recs.update_one({"user_id": user_id}, { "$set": {"songs": songs, "liked_songs": liked_songs} }, upsert=True)
        
    def get_user_songs(self, user_id: str) -> Dict:
        user_recs = self.db['user_recommended_songs']
        return dict(user_recs.find_one({"user_id": user_id}, {"_id": 0, 'user_id': 0, 'liked_songs': 0})['songs'])

    def get_liked_nr_songs(self, user_id: str) -> int:
        user_recs = self.db['user_recommended_songs']
        return int(user_recs.find_one({'user_id': user_id}, {"_id": 0, 'user_id': 0, 'songs': 0})['liked_songs'])