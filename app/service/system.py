
from typing import List
import numpy
from app.service.distance import Distance


class RecommendationSystem:

    def __init__(self) -> None:
        self._list_of_movies = numpy.array(['id', 1.2,2.2,3.3])

    def convert_movies_numpy(self, movies) -> List[float]:
        return numpy.array(movies)

    def get_next_movie(self, liked_movies) -> float:
        return Distance.get_euclidean_distance(self.convert_movies_numpy(liked_movies), self._list_of_movies)
