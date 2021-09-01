
from typing import List

from numpy.core.fromnumeric import prod
from app.service.distance import Distance
from app.service.utils import Utils
import requests
import os

class RecommendationSystem:

    def __init__(self) -> None:
        self._songs_dataset = {
            'id1': ([1.0, 2.0, 3.0], 'fanfarlo'),
            'id2': ([2.0, 3.0, 4.0], 'CHVRCHES - Death Stranding (Audio)'),
            'id3': ([9.0, 4.0, 5.0], 'lol')
        }

    def get_dataset_list() -> None:
        pass

    def get_next_song(self, processed_songs) -> float:

        calculated = False
        songs_number = 10

        res = self.get_closest_song_by_distance(processed_songs, distance_formula=Distance.get_euclidean_distance)
        youtube_id = self.get_youtube_song_id(song_name=res['name'])
        res['youtube_id'] = youtube_id
        return res
        

    def get_closest_song_by_distance(self, processed_songs, distance_formula):
        distances, liked_songs = {}, []

        for song in processed_songs['liked']:
            liked_songs.append(self._songs_dataset[song][0])

        #print(f'{liked_songs}, {self._songs_dataset}', file=sys.stderr)
        for id, details in self._songs_dataset.items(): 

            if id in processed_songs['seen']:
                continue

            for liked_song in liked_songs:
                dataset_feature = Utils.convert_to_numpy(details[0])
                liked_feature = Utils.convert_to_numpy(liked_song)

                distances[id] = (distance_formula(liked_feature, dataset_feature), details[1])

        print(f"distances: {distances}")
        min_val = min(distances.items(), key=lambda x: x[0])
        return {
            "id": min_val[0], 
            "name": min_val[1][1]
        }
    
    def get_youtube_song_id(self, song_name):
        API_KEY = os.getenv('API_KEY')
        url = f"https://youtube.googleapis.com/youtube/v3/search?maxResults=1&key={API_KEY}&type=video&q={song_name}"

        data = requests.get(url).json()
        return data['items'][0]['id']['videoId']