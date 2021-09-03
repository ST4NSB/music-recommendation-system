
from typing import Dict, List, Tuple

import requests, os
import pandas as pd
from app.service.distance import Distance
from app.service.utils import Utils
from collections import defaultdict, namedtuple

class RecommendationSystem:

    def __init__(self, logger, cfg) -> None:
        self.logger = logger
        self.cfg = cfg

        # example
        # self.__songs_dataset = {
        #     'id1': { 'name': 'CHVRCHES - Death Stranding (Audio)', 'feature_array': [7.0, 6.0, 5.0],},
        #     'id2': { 'name': 'Phoebe Bridgers - Full Performance', 'feature_array': [9.0, 4.0, 5.0], },
        #     'id3': { 'name': 'test', 'feature_array': [6.0, 5.0, 5.0] },
        #     'id4': { 'name': 'f', 'feature_array': [6.0, 5.0, 5.0] },
        #     'id5': { 'name': 'hello', 'feature_array': [7.0, 6.0, 5.0] },
        #     'id6': { 'name': 'z', 'feature_array': [111.0, 24.0, 5.0] }
        # }

        self.__songs_dataset = self.__get_processed_dataset()
        self.logger.info(f" * Number of songs: {len(self.__songs_dataset)}")
        self.logger.info(
            f" * First 10 songs from dataset: { list(self.__songs_dataset.items())[0:10] }"
        )

    def __get_processed_dataset(self) -> None:
        with open(self.cfg['dataset'], "r", encoding="utf8") as csvfile:
            df = pd.read_csv(csvfile)

        songs = {}        
        for _, row in df.iterrows():
            if row['year'] < self.cfg['distance_algorithm']['song_cutoff_year']:
                continue

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
        self.logger.info(f" * [GetNextSong]Result: {res}, type: {type(res)}")
        return res

    def __get_closest_song_by_distances(self, processed_songs, distance_formula, eval_func) -> Tuple:
        distances, liked_songs = defaultdict(lambda: {'name': '', 'distance_value': 0}), []

        for song in processed_songs['liked']:
            liked_songs.append(self.__songs_dataset[song]['feature_array'])

        for id, details in self.__songs_dataset.items(): 
            if id in processed_songs['skipped'] or id in processed_songs['liked']:
                continue

            for liked_song in liked_songs:
                dataset_feature = Utils.convert_to_numpy_array(details['feature_array'])
                liked_feature = Utils.convert_to_numpy_array(liked_song)

                feature_sum = distance_formula(liked_feature, dataset_feature)
                distances[id] = { 
                    'name': details['name'],
                    'distance_value': distances[id]['distance_value'] + feature_sum 
                }

        best_match = eval_func(distances.items(), key=lambda x: x[1]['distance_value'])
        self.logger.info(f" * [GetNextSong]Best song match: {best_match}")
        
        return {
            "id": best_match[0], 
            "name": best_match[1]['name']
        }, dict(distances)
    
    def __get_youtube_videoId(self, song_name) -> str:
        API_KEY = os.getenv('API_KEY')

        url = f"https://youtube.googleapis.com/youtube/v3/search?maxResults=1&key={API_KEY}&type=video&q={song_name}"
        data = requests.get(url).json()
        
        if 'items' not in data or not data['items']:
            return None
        
        return data['items'][0]['id']['videoId']

