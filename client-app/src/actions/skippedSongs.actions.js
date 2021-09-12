import { ADD_SKIPPED, CLEAR_SKIPPED } from '../types/skippedSongs.types';

export const addSkippedSong = (songId) => {
    return {
        type: ADD_SKIPPED,
        payload: songId
    };
};

export const clearSkippedSongsList = () => {
    return {
       type: CLEAR_SKIPPED
    };
};