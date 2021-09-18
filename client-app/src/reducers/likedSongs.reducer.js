
import { getUserLikedSongs, setLikedSongs, clearLikedSongs } from "../utils/storage";
import { ADD_LIKED, CLEAR_LIKED } from "../types/likedSongs.types"; 

const reducer = (state = getUserLikedSongs(), action) => {
    switch (action.type) {
        case ADD_LIKED: {
            setLikedSongs(action.payload);
            return state.includes(action.payload) ? state : [ ...state, action.payload];
        }
        case CLEAR_LIKED: {
            clearLikedSongs();
            return []; 
        }
        default: return state;
    }
};

export default reducer;