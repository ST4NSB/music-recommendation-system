import { useDispatch, useSelector } from "react-redux";
import { clearLikedSongsList } from '../actions/likedSongs.actions'
import { clearSkippedSongsList } from "../actions/skippedSongs.actions";
import { useHistory } from "react-router-dom";

const ClearPreferencesButton  = ({buttonStyle}) => {
    const { likedSongs, skippedSongs } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <button 
            className={(likedSongs.length === 0 && skippedSongs.length === 0) ? 
                buttonStyle + " cursor-not-allowed	" 
                : buttonStyle}
            disabled={likedSongs.length === 0 && skippedSongs.length === 0}
            onClick={() => {
                dispatch(clearLikedSongsList());
                dispatch(clearSkippedSongsList());
            }}>
                Clear Preferences
        </button>
    );
    
}

export default ClearPreferencesButton;
