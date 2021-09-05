
import numpy, yaml, re, os, json
from typing import Any, Dict, List, Optional
from functools import reduce
import pandas as pd
from pathlib import Path

class Utils:
    @staticmethod
    def convert_to_numpy_array(item: List[float]) -> List[float]:
        return numpy.array(item).astype(numpy.float)

    @staticmethod
    def get_yaml_content(file: str) -> Dict:
        with open(file, "r") as ymlfile:
            fl = yaml.safe_load(ymlfile)
        return fl

    @staticmethod
    def get_curated_name_dataset(artists: str, name: str, year: str='') -> str:
        artists_list = artists.replace('[', '').replace(']', '').replace('\'', '').split(',')
        curated_name = re.sub(r'\([^)]*\)', '', name).rstrip() # remove parantheses & text inside.. e.g. "[SINGLE], [OFFICIAL] etc."
        return f"{reduce(lambda a, b: a.strip() + ', ' + b.strip(), artists_list)} - {curated_name} ({year})"
    
    @staticmethod
    def clean_log(logger_fn: str) -> None:
        open(logger_fn, "w").close()

    @staticmethod
    def normalize(value: float, min_value: float, max_value: float) -> float:
        return (value - min_value) / (max_value - min_value)

    @staticmethod
    def read_csv(filename: str) -> Any:
        with open(f"{filename}.csv", "r", encoding="utf8") as csvfile:
            data = pd.read_csv(csvfile)
        return data

    @staticmethod
    def save_json(data: Dict, path: str, filename: str) -> None:
        json_data = json.dumps(data)
        with open(os.path.join(path, f"{filename}.json"), 'w') as file:
            file.write(json_data)

    @staticmethod
    def read_json(filename: str) -> Optional[Dict]:
        if Path(f"{filename}.json").is_file():
            with open(f"{filename}.json", "r", encoding="utf8") as json_file:
                data = json.load(json_file)
            return data
        
        return None
