import { useDispatch } from "react-redux";
import { clearLikedSongsList } from '../actions/likedSongs.actions'
import { clearSkippedSongsList } from "../actions/skippedSongs.actions";
import { getUIDv4 } from "../utils/common";
import { resetUserId } from "../actions/userId.actions";

const ClearPreferencesButton  = ({buttonStyle}) => {
    const dispatch = useDispatch();

    return (
        <button 
            className={buttonStyle}
            onClick={() => {
                dispatch(resetUserId(getUIDv4()))
                dispatch(clearLikedSongsList());
                dispatch(clearSkippedSongsList());
            }}>
                Clear Preferences
        </button>
    );
    
}

export default ClearPreferencesButton;
