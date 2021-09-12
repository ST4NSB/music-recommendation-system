import { ADD_LIKED, CLEAR_LIKED } from '../types/likedSongs.types';

export const addLikedSong = (songId) => {
    return {
        type: ADD_LIKED,
        payload: songId
    };
};

export const clearLikedSongsList = () => {
    return {
       type: CLEAR_LIKED
    };
};