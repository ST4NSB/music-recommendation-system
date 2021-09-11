import random
from typing import Dict
from elasticsearch.client import Elasticsearch

class ESContext:
    def __init__(self, host: str):
        self.es = Elasticsearch(host)

    def configure(self, songs_dataset: Dict, delete_docs=False) -> None:
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
            for key, value in songs_dataset.items():
                body.append({'index': {'_id': key}})
                info_body = {
                    'name': value['name'],
                    'artists': value['artists']
                }
                body.append(info_body)
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