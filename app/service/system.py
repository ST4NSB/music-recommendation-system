
import csv
from typing import Dict, List, Tuple

import requests, os
import pandas as pd
from app.service.distance import Distance
from app.service.utils import Utils
from collections import defaultdict, namedtuple

class RecommendationSystem:

    def __init__(self) -> None:
        self.cfg = Utils.get_yaml_content('config.yml')
        # self.__songs_dataset = {
        #     'id1': ('CHVRCHES - Death Stranding (Audio)', [7.0, 6.0, 5.0]),
        #     'id2': ('Phoebe Bridgers - Full Performance', [9.0, 4.0, 5.0]),
        #     'id3': ('test', [6.0, 5.0, 5.0]),
        #     'id4': ('f', [6.0, 5.0, 5.0]),
        #     'id5': ('hello', [7.0, 6.0, 5.0]),
        #     'id6': ('z', [111.0, 24.0, 5.0]),
        # }

        self.__songs_dataset = self.__get_processed_dataset()
        print(self.__songs_dataset['6KbQ3uYMLKb5jDxLF7wYDD']['feature_array'])

    def __get_processed_dataset(self) -> None:
        with open(self.cfg['dataset'], "r", encoding="utf8") as csvfile:
            df = pd.read_csv(csvfile)

        songs = {}
        
        
        for _, row in df.iterrows():
            songs[row['id']] = {
                'name': Utils.get_cleaned_name_dataset(row['artists'], row['name'], row['year']),
                'feature_array': [
                    row['acousticness'] * self.cfg['weights']['acousticness'],
                    row['danceability'] * self.cfg['weights']['danceability'],
                    row['energy'] * self.cfg['weights']['energy'],
                    row['instrumentalness'] * self.cfg['weights']['instrumentalness'],
                    row['valence'] * self.cfg['weights']['valence'],
                    row['tempo'] * self.cfg['weights']['tempo'],
                    row['liveness'] * self.cfg['weights']['liveness'],
                    row['loudness'] * self.cfg['weights']['loudness'],
                    row['speechiness'] * self.cfg['weights']['speechiness'],
                    row['mode'] * self.cfg['weights']['mode'],
                    row['popularity'] * self.cfg['weights']['popularity']
                ]
            }

        return songs

    def get_next_song(self, processed_songs) -> float:

        calculated = False
        songs_number = 10

        res, distances = self.__get_closest_song_by_distances(
            processed_songs, 
            distance_formula=eval(self.cfg['distance_algorithm']['algorithm']), 
            eval_func=eval(self.cfg['distance_algorithm']['eval_func'])
        )
        
        res['youtubeId'] = self.__get_youtube_videoId(song_name=res['name'])
        return res

    def __get_closest_song_by_distances(self, processed_songs, distance_formula, eval_func) -> Tuple:
        distances, liked_songs = defaultdict(lambda: {'name': '', 'feature_array': 0}), []

        for song in processed_songs['liked']:
            liked_songs.append(self.__songs_dataset[song]['feature_array'])

        for id, details in self.__songs_dataset.items(): 
            if id in processed_songs['skipped']:
                continue

            for liked_song in liked_songs:
                dataset_feature = Utils.convert_to_numpy_array(details['feature_array'])
                liked_feature = Utils.convert_to_numpy_array(liked_song)

                feature_sum = distance_formula(liked_feature, dataset_feature)
                distances[id] = { 
                    'name': details['name'],
                    'feature_array': distances[id]['feature_array'] + feature_sum 
                }

        best_match = eval_func(distances.items(), key=lambda x: x[1]['feature_array'])
        return ({
            "id": best_match[0], 
            "name": best_match[1]['name']
        }, dict(distances))
    
    def __get_youtube_videoId(self, song_name) -> str:
        API_KEY = os.getenv('API_KEY')
        url = f"https://youtube.googleapis.com/youtube/v3/search?maxResults=1&key={API_KEY}&type=video&q={song_name}"
        
        data = requests.get(url).json()
        return data['items'][0]['id']['videoId']