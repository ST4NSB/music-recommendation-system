from typing import Any, List
from numpy import dot
from numpy.linalg import norm

class Distance:
    @staticmethod
    def get_euclidean_distance(x: List[float], y: List[float]) -> float:
        return norm(x - y)

    @staticmethod
    def get_manhattan_distance(x: List[float], y: List[float]) -> float:
        sum_ = 0.0
        for xy in zip(x, y):
            sum_ += abs(xy[0] - xy[1])
        return float(sum_)
    
    @staticmethod
    def get_cosine_similarity(x: List[float], y: List[float]) -> float:
        return dot(x, y)/(norm(x) * norm(y))