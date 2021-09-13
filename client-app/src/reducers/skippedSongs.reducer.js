
import { getUserSkippedSongs, setSkippedSongs, clearSkippedSongs, removeSkippedSong } from "../utils/storage";
import { ADD_SKIPPED, CLEAR_SKIPPED, REMOVE_SKIPPED } from "../types/skippedSongs.types";

const reducer = (state = getUserSkippedSongs(), action) => {
    switch (action.type) {
        case ADD_SKIPPED: {
            setSkippedSongs(action.payload);
            return [ ...state, ...action.payload];
        }
        case CLEAR_SKIPPED: {
            clearSkippedSongs();
            return []; 
        }
        case REMOVE_SKIPPED: {
            removeSkippedSong(action.payload);
            return state.filter(songId => songId !== action.payload);
        }
        default: return state;
    }
};

export default reducer;