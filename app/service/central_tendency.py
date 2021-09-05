from typing import List
import numpy as np


class CentralTendencies:
    @staticmethod
    def get_mean(vals: List[List[float]]) -> List[float]:
        return np.mean(vals, axis=0)

    @staticmethod
    def get_median(vals: List[List[float]]) -> List[float]:
        return np.median(vals, axis=0)