
from app.repository.elasticsearch_context import ESContext
from app.repository.db_context import DBContext
from logging import Logger
from types import FunctionType
from typing import Any, Dict, List, Optional, Tuple
from flask import abort
import requests, random, re
import pandas as pd
from app.service.distance import Distance
from app.service.utils import Utils
from collections import defaultdict, namedtuple
from googlesearch import search
from bs4 import BeautifulSoup
from app.service.central_tendency import CentralTendencies
from elasticsearch import Elasticsearch

class RecommendationSystem:

    def __init__(self, logger: Logger, db: DBContext, es: ESContext, cfg: Dict, rpath: str, yt_api_key: str):
        self.logger = logger
        self.db = db
        self.cfg = cfg
        self.rpath = rpath
        self.yt_api_key = yt_api_key
        self.es = es

        self.__songs_dataset = self.__get_processed_dataset()
        self.es.configure(self.__songs_dataset)
        self.logger.info(f" * Loaded items in Elastic Search")
        
        self.logger.info(f" * Number of songs: {len(self.__songs_dataset)}")
        self.logger.info(
            f" * First 10 songs from dataset: { list(self.__songs_dataset.items())[0:10] }"
        )
      
 
    def __get_processed_dataset(self) -> Dict:
        feature_json = Utils.read_json(filename=self.cfg['dataset']['curated'])
        if feature_json:
            return feature_json

        df = Utils.read_csv(self.cfg['dataset']['original'])

        norm_data = self.__get_minmax_values(df)
        self.logger.info(f"Min max values for normalization: {norm_data}")

        songs, existing_songs = {}, set()    
        for _, row in df.iterrows():
            if row['year'] < self.cfg['distance_algorithm']['threshold_year']:
                continue

            if Utils.get_curated_name_dataset(row['artists'], row['name']) in existing_songs:
                continue

            existing_songs.add(Utils.get_curated_name_dataset(row['artists'], row['name']))
            songs[row['id']] = {
                'name': Utils.get_curated_name_dataset(row['artists'], row['name'], row['year']),
                'artists': Utils.split_artists(row['artists']),
                'feature_array': [
                    self.__compute_feature_value(row['acousticness'], norm_data['acousticness'], self.cfg['weights']['acousticness']),
                    self.__compute_feature_value(row['danceability'], norm_data['danceability'], self.cfg['weights']['danceability']),
                    self.__compute_feature_value(row['energy'], norm_data['energy'], self.cfg['weights']['energy']),
                    self.__compute_feature_value(row['instrumentalness'], norm_data['instrumentalness'], self.cfg['weights']['instrumentalness']),
                    self.__compute_feature_value(row['valence'], norm_data['valence'], self.cfg['weights']['valence']),
                    self.__compute_feature_value(row['tempo'], norm_data['tempo'], self.cfg['weights']['tempo']),
                    self.__compute_feature_value(row['liveness'], norm_data['liveness'], self.cfg['weights']['liveness']),
                    self.__compute_feature_value(row['loudness'], norm_data['loudness'], self.cfg['weights']['loudness']),
                    self.__compute_feature_value(row['speechiness'], norm_data['speechiness'], self.cfg['weights']['speechiness']),
                    self.__compute_feature_value(row['mode'], norm_data['mode'], self.cfg['weights']['mode']),
                    self.__compute_feature_value(row['popularity'], norm_data['popularity'], self.cfg['weights']['popularity']),
                    self.__compute_feature_value(row['year'], norm_data['year'], self.cfg['weights']['year']),
                ]
            }

        Utils.save_json(songs, self.rpath, filename=self.cfg['dataset']['curated'])
        return songs

    def __get_minmax_values(self, df: Any) -> Dict:
        Minmax = namedtuple('Minmax', ('min, max'))
        return {
            'acousticness': Minmax(min=min(df['acousticness']), max=max(df['acousticness'])),
            'danceability': Minmax(min=min(df['danceability']), max=max(df['danceability'])),
            'energy': Minmax(min=min(df['energy']), max=max(df['energy'])),
            'mode': Minmax(min=min(df['mode']), max=max(df['mode'])),
            'tempo': Minmax(min=min(df['tempo']), max=max(df['tempo'])),
            'instrumentalness': Minmax(min=min(df['instrumentalness']), max=max(df['instrumentalness'])),
            'speechiness': Minmax(min=min(df['speechiness']), max=max(df['speechiness'])),
            'loudness': Minmax(min=min(df['loudness']), max=max(df['loudness'])),
            'liveness': Minmax(min=min(df['liveness']), max=max(df['liveness'])),
            'valence': Minmax(min=min(df['valence']), max=max(df['valence'])),
            'popularity': Minmax(min=min(df['popularity']), max=max(df['popularity'])),
            'year': Minmax(min=self.cfg['distance_algorithm']['threshold_year'], max=max(df['year'])),
        }

    def __compute_feature_value(self, row, normalized_data_tuple, weight) -> float:
        normalized_value = Utils.normalize(row, normalized_data_tuple.min, normalized_data_tuple.max)
        return normalized_value * weight

    def get_random_songs(self, processed_songs: Dict) -> List[Dict]:
        search_res = self.es.get_random_items()

        results = []
        for sr in search_res['hits']['hits']:
            if len(results) >= self.cfg['distance_algorithm']['query_songs_limit']:
                break

            if sr['_id'] in processed_songs['liked'] or sr['_id'] in processed_songs['skipped']:
                continue

            if Utils.get_year_from_name(sr['_source']['name']) < 2015:
                if random.uniform(0, 1) < 0.8:
                    continue

            results.append({
                "id": sr['_id'],
                "name": sr['_source']['name'],
                "youtubeId": self.__get_videoId(sr['_source']['name'])
            })
        return results

    def get_song_names(self, search_query: str) -> List[Dict]:
        search_res = self.es.get_item_by_query(search_query, self.cfg['distance_algorithm']['query_songs_limit'])

        if len(search_res) == 0:
            abort(404, f"Couldn't find any songs for '{search_query}'")

        results = []
        for sr in search_res['hits']['hits']:
            results.append({
                "id": sr['_id'],
                "name": sr['_source']['name'],
                "youtubeId": self.__get_videoId(sr['_source']['name'])
            })
        return results

    def get_next_song(self, processed_songs: Dict) -> Dict:
        song_threshold = self.cfg['distance_algorithm']['minimmum_songs']
        if len(processed_songs['liked']) < song_threshold:
            abort(400, f"There are not enough liked songs in the api request, min: {song_threshold} liked songs!")

        user_id = processed_songs['userId']
        if self.db.user_has_songs(user_id) and self.db.get_liked_nr_songs(user_id) == len(processed_songs['liked']):
            next_song = self.__get_song_from_db(processed_songs, user_id)
            if next_song: 
                next_song['youtubeId'] = self.__get_videoId(next_song['name'])
                self.logger.info(f" * [GetNextSong]Next Song: {next_song}, type: {type(next_song)}")
                return next_song

        tmp_dist = self.__get_all_songs_distances(
            processed_songs, 
            distmax=eval(self.cfg['distance_algorithm']['distmax']), 
            distmin=eval(self.cfg['distance_algorithm']['distmin']),
            eval_func=eval(self.cfg['distance_algorithm']['eval_func'])
        )

        if len(tmp_dist) == 0:
            abort(500, "There are no more songs to recommend! Congrats, it's statistically impossible to get here!")

        sorted_distances = dict(sorted(tmp_dist.items(), key=lambda item: item[1]['distance_value'], reverse=True))
        distances = {A:N for (A,N) in [x for x in sorted_distances.items()][:self.cfg['distance_algorithm']['results_count']]}
        self.logger.info(
            f" * [GetNextSong]First {len(distances)} closest songs calculated by feature distance: { [val['name'] for val in distances.values()] }"
        )
        
        if self.db.user_has_songs(user_id):
            self.db.update_user_songs(user_id, distances, len(processed_songs['liked']))
            self.logger.info(" * [GetNextSong]Inserted new distances in db")
        else:
            user_dist = {
                'user_id': user_id,
                'liked_songs': len(processed_songs['liked']),
                'songs': distances
            }
            self.db.insert_user_songs(user_dist)
            self.logger.info(" * [GetNextSong]Updated new distances in db")

        result = [{'id': ID, 'name': NAME['name']} for (ID, NAME) in [x for x in sorted_distances.items()][:1]][0] # !!!! lol
        result['youtubeId'] = self.__get_videoId(result['name'])
        self.logger.info(f" * [GetNextSong]Result: {result}, type: {type(result)}")
        return result

    def __get_song_from_db(self, processed_songs: Dict, user_id: str) -> Optional[Dict]:
        calculated_distances = self.db.get_user_songs(user_id)
        self.logger.info(f" * [GetNextSong]Distances from db: {calculated_distances}")
        
        next_song = None
        for key in calculated_distances:
            if key in processed_songs['liked'] or key in processed_songs['skipped']:
                continue
            else:
                next_song = {
                    'id': key, 
                    'name': calculated_distances[key]['name']
                }
                break
        
        return next_song

    def __get_all_songs_distances(self, processed_songs: Dict, distmax: FunctionType, distmin: FunctionType, eval_func: FunctionType) -> Dict:
        distances, liked_songs = defaultdict(lambda: {'name': '', 'distance_value': 0}), []

        for song in processed_songs['liked']:
            liked_songs.append(self.__songs_dataset[song]['feature_array'])

        middle_feature = eval_func(
            Utils.convert_to_numpy_array(liked_songs)
        )
        self.logger.info(f" * [GetNextSong]Avg. feature values: {middle_feature}")

        for id, details in self.__songs_dataset.items(): 
            if id in processed_songs['skipped'] or id in processed_songs['liked']:
                continue

            dataset_feature = Utils.convert_to_numpy_array(details['feature_array'])
            feature_dist_sum = distmax(middle_feature, dataset_feature) - distmin(middle_feature, dataset_feature)
            distances[id] = { 
                'name': details['name'],
                'distance_value': feature_dist_sum
            }

        return dict(distances)

    def __get_videoId(self, name: str) -> Optional[str]:
        song_name = f"{name} Official video"
        youtube_id = self.__get_videoId_from_api(song_name)
        if not youtube_id:
            youtube_id = self.__get_videoId_from_google(song_name)
        return youtube_id
    
    def __get_videoId_from_api(self, song_name: str) -> Optional[str]:
        url = f"https://youtube.googleapis.com/youtube/v3/search?maxResults=1&regionCode=US&key={self.yt_api_key}&type=video&q={song_name}"
        data = requests.get(url).json()
        
        if 'items' not in data or not data['items']:
            return None
        
        return data['items'][0]['id']['videoId']

    def __get_videoId_from_google(self, song_name: str) -> Optional[str]:
        try:
            search_result_list = list(search(query=song_name, tld="com", num=20, stop=3, pause=1))
            
            video_url = None
            for i in range(len(search_result_list)):
                page = requests.get(search_result_list[i]) 
                url = str(BeautifulSoup(page.url, features="lxml"))
                if '<html><body><p>https://www.youtube.com/watch?v=' in url:
                    video_url = url
                    break
                
            if not video_url:
                return None

            video_id = video_url.replace('<html><body><p>https://www.youtube.com/watch?v=', '').replace('</p></body></html>', '')
            self.logger.info(f" * [GetNextSong]videoId: {video_id}, video url: {video_url}, type: {type(video_url)}")
            return video_id
        except:
            return None