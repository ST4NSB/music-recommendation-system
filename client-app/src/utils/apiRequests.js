import axios from "axios";
import { randomSongsPath, getQuerySongsPath, getRecommendedNextSongPath, deleteUserPath } from "./endpoints";

export const getRandomSongsApi = async (body) => {
    const url = `${process.env.REACT_APP_HOST}${randomSongsPath}`, headers = {
        'Content-Type': 'application/json',
        'API-Key': process.env.REACT_APP_API_KEY
    };
    return await axios.post(url, body, {headers});
}

export const getSongsApi = async (query) => {
    const url = `${process.env.REACT_APP_HOST}${getQuerySongsPath}/${query}`, headers = {
        'Content-Type': 'application/json',
        'API-Key': process.env.REACT_APP_API_KEY, 
    };
    return await axios.get(url, {headers});
}

export const getNextRecommendedSongApi = async (body) => {
    const url = `${process.env.REACT_APP_HOST}${getRecommendedNextSongPath}`, headers = {
        'Content-Type': 'application/json',
        'API-Key': process.env.REACT_APP_API_KEY
    };
    return await axios.post(url, body, {headers});
}

export const deleteUser = async (userId) => {
    const url = `${process.env.REACT_APP_HOST}${deleteUserPath}/${userId}`, headers = {
        'Content-Type': 'application/json',
        'API-Key': process.env.REACT_APP_API_KEY
    };
    return await axios.delete(url, {headers});
}