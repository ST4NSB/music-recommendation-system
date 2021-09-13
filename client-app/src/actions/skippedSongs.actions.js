import { ADD_SKIPPED, CLEAR_SKIPPED, REMOVE_SKIPPED } from '../types/skippedSongs.types';

export const addSkippedSongs = (songIds) => {
    return {
        type: ADD_SKIPPED,
        payload: songIds
    };
};

export const clearSkippedSongsList = () => {
    return {
       type: CLEAR_SKIPPED
    };
};

export const removeSkippedSongFromList = (songId) => {
    return {
       type: REMOVE_SKIPPED,
       payload: songId
    };
};