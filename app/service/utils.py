
from collections import namedtuple
from typing import Dict, List
from functools import reduce
import numpy, yaml, re

class Utils:
    @staticmethod
    def convert_to_numpy_array(item) -> List[float]:
        return numpy.array(item).astype(numpy.float)

    @staticmethod
    def get_yaml_content(file) -> Dict:
        with open(file, "r") as ymlfile:
            fl = yaml.safe_load(ymlfile)
        return fl

    @staticmethod
    def get_curated_name_dataset(artists, name, year='') -> str:
        artists_list = artists.replace('[', '').replace(']', '').replace('\'', '').split(',')
        curated_name = re.sub(r'\([^)]*\)', '', name).rstrip() # remove parantheses & text inside.. e.g. "[SINGLE], [OFFICIAL] etc."
        return f"{reduce(lambda a, b: a.strip() + ', ' + b.strip(), artists_list)} - {curated_name} ({year})"
    
    @staticmethod
    def clean_log(logger_fn) -> None:
        open(logger_fn, "w").close()

    @staticmethod
    def normalize(value, min_value, max_value) -> float:
        return (value - min_value) / (max_value - min_value)