
import csv
from typing import Dict, List, Tuple

import requests, os
import pandas as pd
from app.service.distance import Distance
from app.service.utils import Utils
from collections import defaultdict

class RecommendationSystem:

    def __init__(self) -> None:        
        self.cfg = Utils.get_config_settings()
        self.__songs_dataset = {
            'id1': ([9.0, 4.5, 4.0], 'fanfarlo'),
            'id2': ([7.0, 6.0, 5.0], 'CHVRCHES - Death Stranding (Audio)'),
            'id9': ([4.0, 5.0, 2.0], 'some stuff'),
            'id3': ([9.0, 4.0, 5.0], 'Phoebe Bridgers - Full Performance'),
            'id4': ([1.5, 2.5, 3.5], 'big thief - little things'),
            'id5': ([3.0, 2.0, 3.0], 'test')
        }

        self.x = self.__get_processed_dataset()

    def __get_processed_dataset(self) -> None:
        with open("data.csv", "r", encoding="utf8") as csvfile:
            df = pd.read_csv(csvfile)
        print(df.to_string()) # TODO delete this 

    def get_next_song(self, processed_songs) -> float:

        calculated = False
        songs_number = 10

        res, distances = self.__get_closest_song_by_distances(
            processed_songs, 
            distance_formula=eval(self.cfg['distance_algorithm']['algorithm']), 
            eval_func=eval(self.cfg['distance_algorithm']['eval_func'])
        )
        
        print(distances) # TODO # DELETE THIS LATER
        
        res['youtubeId'] = self.__get_youtube_videoId(song_name=res['name'])
        return res

    def __get_closest_song_by_distances(self, processed_songs, distance_formula, eval_func) -> Tuple:
        distances, liked_songs = defaultdict(lambda: [0, '']), []

        for song in processed_songs['liked']:
            liked_songs.append(self.__songs_dataset[song][0])

        for id, details in self.__songs_dataset.items(): 
            if id in processed_songs['skipped']:
                continue

            for liked_song in liked_songs:
                dataset_feature = Utils.convert_to_numpy_array(details[0])
                liked_feature = Utils.convert_to_numpy_array(liked_song)

                feature_sum = distance_formula(liked_feature, dataset_feature)
                distances[id] = [distances[id][0] + feature_sum, details[1]]

        best_match = eval_func(distances.items(), key=lambda x: x[1])
        return ({
            "id": best_match[0], 
            "name": best_match[1][1]
        }, distances)
    
    def __get_youtube_videoId(self, song_name) -> str:
        API_KEY = os.getenv('API_KEY')
        url = f"https://youtube.googleapis.com/youtube/v3/search?maxResults=1&key={API_KEY}&type=video&q={song_name}"

        data = requests.get(url).json()
        return data['items'][0]['id']['videoId']