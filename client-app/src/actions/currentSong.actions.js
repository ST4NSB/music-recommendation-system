import { GET_NEXT_RECOMMENDED_SONG, LIKE_SONG } from '../types/currentSong.types';

export const getNextSong = (song) => {
    return {
        type: GET_NEXT_RECOMMENDED_SONG,
        payload: song
    };
};

export const likeCurrentSong = () => {
    return {
        type: LIKE_SONG
    };
};