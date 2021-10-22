import random
from typing import Dict
from elasticsearch.client import Elasticsearch
from elasticsearch import RequestsHttpConnection

class ESContext:
    def __init__(self):
        self.es = Elasticsearch(hosts=[{"host": "host.docker.internal", "port": 9200}], 
                                connection_class=RequestsHttpConnection, max_retries=1000,
                                retry_on_timeout=True, request_timeout=30)

    def configure(self, songs_dataset: Dict, delete_docs=False, bulk_limit=1000) -> None:
        if not self.es.indices.exists(index="music"):
            self.es.indices.create(index='music')
        
        if delete_docs:
            self.es.delete_by_query(
                index="music",
                doc_type="songs",
                body={
                    "query": {
                        "match_all" : {}
                    }
                }
            )

        if self.__get_es_size() == 0:
            body = []
            bulk_counter = 0
            for key, value in songs_dataset.items():
                body.append({'index': {'_id': key}})
                info_body = {
                    'name': value['name'],
                    'artists': value['artists']
                }
                body.append(info_body)
                if bulk_counter % bulk_limit == 0 and bulk_counter != 0:
                    self.es.bulk(index='music', doc_type='songs', body=body)
                    body = []
                bulk_counter += 1
            self.es.bulk(index='music', doc_type='songs', body=body)  
    
    def get_random_items(self, size: int=300) -> Dict:
        return self.es.search(
            index="music",
            doc_type="songs",
            body={
                "query": {
                    "function_score": {
                        "functions": [
                            {
                                "random_score": {
                                    "seed": random.randint(0, 999999999)
                                }
                            }
                        ]
                    }
                },
                "size": size
            }
        )

    def get_item_by_query(self, query: str, size: int) -> Dict:
        return self.es.search(
            index="music",
            doc_type="songs",
            body={
                "size": size,
                "query": {
                    "combined_fields": {
                        "query": query,
                        "fields": [ "name", "artists"],
                        "operator": "or"
                    }
                }
            }
        )

    def __get_es_size(self) -> int:
        items = self.es.search(
            index="music",
            doc_type="songs",
            body={
                "query": {
                    "match_all" : {}
                },
                "size": 0
            }
        )

        return items['hits']['total']['value']
