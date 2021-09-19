import { useEffect } from "react";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";
import { getNextRecommendedSongApi } from "../utils/apiRequests";
import { useDispatch } from "react-redux";
import { getNextSong, likeCurrentSong } from "../actions/currentSong.actions";
import { addSkippedSongs } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import { removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { Link } from "react-router-dom";

const RecommendationContext = () => {
    const { currentSong, likedSongs } = useSelector(state => state);
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

    if (likedSongs.length < 3) 
        return (
            <div className="flex flex-col justify-center items-center">
                <div>You need to like at least 3 songs!</div>
                <Link to='/search'>Keep browsing..</Link>
            </div>
        );
    else return (
        <div className="flex flex-col justify-center items-center pt-14">
            <p>System recommended this song, hit Like if you like it or next if you want to get next song</p>
            <ResultItem key={currentSong.id}
                        id={currentSong.id}
                        name={currentSong.name}
                        youtubeId={currentSong.youtubeId}
                        likeClick={async () => {
                            dispatch(likeCurrentSong());
                            addLikedItem();
                            await getNextitem();
                        }}
                        itemClasses={'w-4/12'} />

            <button className="px-4 py-2 rounded-md text-sm font-medium border shadow focus:outline-none focus:ring transition text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300"
                    onClick={async () => {
                        if (!currentSong.liked) {
                            dispatch(addSkippedSongs([currentSong.id]));
                        }
                        await getNextitem();
                    }}>NEXT &rsaquo;&rsaquo;</button>
        </div>
    );
};

export default RecommendationContext;
