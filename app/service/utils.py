
from typing import List
import numpy

class Utils:
    @staticmethod
    def convert_to_numpy(item) -> List[float]:
        return numpy.array(item).astype(numpy.float)
