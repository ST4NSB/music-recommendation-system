
from typing import Dict, List
import numpy
import yaml

class Utils:
    @staticmethod
    def convert_to_numpy(item) -> List[float]:
        return numpy.array(item).astype(numpy.float)

    @staticmethod
    def get_config_settings() -> Dict:
        with open("config.yml", "r") as ymlfile:
            cfg = yaml.safe_load(ymlfile)
        return cfg
