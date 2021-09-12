import { useDispatch } from "react-redux";
import { clearLikedSongsList } from '../actions/likedSongs.actions'
import { clearSkippedSongsList } from "../actions/skippedSongs.actions";
import { useHistory } from "react-router-dom";

const ClearPreferences  = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <button className="clear" onClick={() => {
            dispatch(clearLikedSongsList());
            dispatch(clearSkippedSongsList());
            history.push("/search");
        }}>Clear Preferences</button>
    );
}

export default ClearPreferences;
