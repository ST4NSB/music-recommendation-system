
import { getUserSkippedSongs, setSkippedSongs, clearSkippedSongs } from "../utils/storage";
import { ADD_SKIPPED, CLEAR_SKIPPED } from "../types/skippedSongs.types";

const reducer = (state = getUserSkippedSongs(), action) => {
    switch (action.type) {
        case ADD_SKIPPED: {
            setSkippedSongs(action.payload);
            return [ ...state, action.payload];
        }
        case CLEAR_SKIPPED: {
            clearSkippedSongs();
            return []; 
        }
        default: return state;
    }
};

export default reducer;