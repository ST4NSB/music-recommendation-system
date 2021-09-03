
from typing import Dict, List
from functools import reduce
import numpy, yaml

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
    def get_cleaned_name_dataset(artists, name, year='') -> str:
        artists_list = artists.replace('[', '').replace(']', '').replace('\'', '').split(',')
        return f"{reduce(lambda a, b: a.strip() + ', ' + b.strip(), artists_list)} - {name} ({year})"
    
    @staticmethod
    def clean_log(logger_fn) -> None:
        open(logger_fn, "w").close()