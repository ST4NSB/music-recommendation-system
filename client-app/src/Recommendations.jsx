import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import ResultItem from "./components/ResultItem";
import { getNextRecommendedSongApi } from "./utils/apiRequests";
import { useDispatch } from "react-redux";
import { getNextSong, likeCurrentSong } from "./actions/currentSong.actions";
import { addSkippedSongs } from "./actions/skippedSongs.actions";
import { addLikedSong } from "./actions/likedSongs.actions";
import { removeSkippedSongFromList } from "./actions/skippedSongs.actions";

const Recommendations = () => {
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
            <Header />
            <Main>
                <div>recommendations</div>

                <ResultItem id={currentSong.id}
                            name={currentSong.name}
                            youtubeId={currentSong.youtubeId}
                            likeClick={() => {
                                dispatch(likeCurrentSong());
                                addLikedItem();
                            }} />

                <button onClick={async () => {
                    if (!currentSong.liked) {
                        dispatch(addSkippedSongs([currentSong.id]));
                    }
                    await getNextitem();
                }}>NEXT</button>
            </Main>
        </>
    );
}

export default Recommendations;
