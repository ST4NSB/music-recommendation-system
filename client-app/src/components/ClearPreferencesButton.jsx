import { useDispatch, useSelector } from "react-redux";
import { clearLikedSongsList } from '../actions/likedSongs.actions'
import { clearSkippedSongsList } from "../actions/skippedSongs.actions";
import { useHistory } from "react-router-dom";

const ClearPreferencesButton  = () => {
    const { likedSongs, skippedSongs } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    if (likedSongs.length > 0 || skippedSongs.length > 0) {
        return (
            <button 
                className="clear fixed" 
                onClick={() => {
                    dispatch(clearLikedSongsList());
                    dispatch(clearSkippedSongsList());
                    history.push("/search");
                }}>
                    Clear Preferences
            </button>
        );
    }
    else return (
        <></>
    );
}

export default ClearPreferencesButton;
