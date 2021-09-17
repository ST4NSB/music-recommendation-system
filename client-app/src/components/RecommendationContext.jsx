import { useEffect } from "react";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";
import { getNextRecommendedSongApi } from "../utils/apiRequests";
import { useDispatch } from "react-redux";
import { getNextSong, likeCurrentSong } from "../actions/currentSong.actions";
import { addSkippedSongs } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import { removeSkippedSongFromList } from "../actions/skippedSongs.actions";

const RecommendationContext = () => {
    const currentSong = useSelector(state => state.currentSong);
    const dispatch = useDispatch();

    const getNextitem = async () => {
        const res = await getNextRecommendedSongApi();
        dispatch(getNextSong(res));
    }

    const addLikedItem = () => {
        dispatch(addLikedSong(currentSong.id));
        dispatch(removeSkippedSongFromList(currentSong.id));
    }

    useEffect(async () => {
        await getNextitem();
    }, []);

    return (
        <>
            <ResultItem key={currentSong.id}
                        id={currentSong.id}
                        name={currentSong.name}
                        youtubeId={currentSong.youtubeId}
                        likeClick={async () => {
                            dispatch(likeCurrentSong());
                            addLikedItem();
                            await getNextitem();
                        }} />

            <button onClick={async () => {
                if (!currentSong.liked) {
                    dispatch(addSkippedSongs([currentSong.id]));
                }
                await getNextitem();
            }}>NEXT</button>
        </>
    );
};

export default RecommendationContext;
