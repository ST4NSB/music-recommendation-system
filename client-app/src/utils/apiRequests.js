import axios from "axios";
import { randomSongsPath, getQuerySongsPath, getRecommendedNextSongPath } from "./endpoints";

export const getRandomSongsApi = async () => {
    return JSON.parse("[\n    {\n        \"id\": \"0NbxvadJQOnlwk3cFbhDNV\",\n        \"name\": \"Croosh - Zeus (2016)\",\n        \"youtubeId\": \"mY1Hjaf96pk\"\n    },\n    {\n        \"id\": \"3BGwxsmbbOe2jmZfh5CUAO\",\n        \"name\": \"Led Zeppelin - When the Levee Breaks - 2007 Remaster (2007)\",\n        \"youtubeId\": \"uwiTs60VoTM\"\n    },\n    {\n        \"id\": \"4dzreTCcGVgeF1vCcd22AC\",\n        \"name\": \"S Club 7 - Don't Stop Movin' (2001)\",\n        \"youtubeId\": \"VL-QaX0EJBs\"\n    },\n    {\n        \"id\": \"6FSpunbdocjC4y9cZGPkfA\",\n        \"name\": \"Tom Lehrer - Who's Next? (1965)\",\n        \"youtubeId\": \"oRLON3ddZIw\"\n    },\n    {\n        \"id\": \"0tyR7Bu9P086aWBFZ4QJoo\",\n        \"name\": \"All Time Low, blackbear - Monsters (2020)\",\n        \"youtubeId\": \"NlnwXIigAAs\"\n    },\n    {\n        \"id\": \"3dVvWnj4D8JGkKvo6Hucso\",\n        \"name\": \"6ix9ine, Nicki Minaj - TROLLZ (2020)\",\n        \"youtubeId\": \"oNg3M9IJJlY\"\n    }\n]");

    const url = `${process.env.REACT_APP_HOST}${randomSongsPath}`, headers = {
        'Content-Type': 'application/json'
    };
    await axios.post(url, {headers}).then((response) => {
        return response.data;
    });
}

export const getSongsApi = async (query) => {
    return JSON.parse("[\n    {\n        \"id\": \"1gpF8IwQQj8qOeVjHfIIDU\",\n        \"name\": \"Zedd, Matthew Koma, Miriam Bryant - Find You (2014)\",\n        \"youtubeId\": \"IgGjUjQRAxw\"\n    },\n    {\n        \"id\": \"60wwxj6Dd9NJlirf84wr2c\",\n        \"name\": \"Zedd, Foxes - Clarity (2012)\",\n        \"youtubeId\": \"IxxstCcJlsc\"\n    },\n    {\n        \"id\": \"5aUSEPNd3m5xliFK4pn5mU\",\n        \"name\": \"Zedd, Kehlani - Good Thing (2019)\",\n        \"youtubeId\": \"CMla2ZIz7-4\"\n    },\n    {\n        \"id\": \"0NWQTyapmz4GuDTSN9xTB7\",\n        \"name\": \"Zedd, Aloe Blacc - Candyman (2016)\",\n        \"youtubeId\": \"dvnDMWfko7Q\"\n    },\n    {\n        \"id\": \"2XWjPtKdi5sucFYtVav07d\",\n        \"name\": \"Zedd, Katy Perry - 365 (2019)\",\n        \"youtubeId\": \"YrbgUtCfnC0\"\n    },\n    {\n        \"id\": \"6uBhi9gBXWjanegOb2Phh0\",\n        \"name\": \"Zedd, Alessia Cara - Stay (2017)\",\n        \"youtubeId\": \"h--P8HzYZ74\"\n    }\n]");
}

export const getNextRecommendedSongApi = async (query) => {
    return JSON.parse("{\n        \"id\": \"1gpF8IwQQj8qOeVjHfIIDU\",\n        \"name\": \"Zedd, Matthew Koma, Miriam Bryant - Find You (2014)\",\n        \"youtubeId\": \"IgGjUjQRAxw\"\n    }");
}