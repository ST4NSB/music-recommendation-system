import { useDispatch, useSelector } from "react-redux";
import { clearLikedSongsList } from '../actions/likedSongs.actions'
import { clearSkippedSongsList } from "../actions/skippedSongs.actions";
import { getUIDv4 } from "../utils/common";
import { resetUserId } from "../actions/userId.actions";
import { deleteUser } from "../utils/apiRequests";
import { showPortal } from "../actions/portalState.actions";

const ClearPreferencesButton  = ({buttonStyle}) => {
    const userId = useSelector(state => state.userId);
    const dispatch = useDispatch();

    return (
        <button
            className={buttonStyle}
            onClick={async () => {
                await deleteUser(userId).then(_ => {
                    dispatch(resetUserId(getUIDv4()));
                    dispatch(clearLikedSongsList());
                    dispatch(clearSkippedSongsList());
                    dispatch(showPortal('You cleared your preferences successfully!'));
                }); 
            }}>
                Clear Preferences
        </button>
    );
    
}

export default ClearPreferencesButton;
