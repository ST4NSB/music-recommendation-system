import { GET_NEXT_RECOMMENDED_SONG, LIKE_SONG } from '../types/currentSong.types'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NEXT_RECOMMENDED_SONG: return { ...action.payload, liked: false };
        case LIKE_SONG: return { ...state, liked: true };
        default: return state;
    }
};

export default reducer;