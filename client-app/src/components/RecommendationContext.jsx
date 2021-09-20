import { useEffect } from "react";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";
import { useHistory } from "react-router";
import { getNextRecommendedSongApi } from "../utils/apiRequests";
import { useDispatch } from "react-redux";
import { getNextSong, likeCurrentSong } from "../actions/currentSong.actions";
import { addSkippedSongs } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import { removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { Link } from "react-router-dom";
import StyledButton from "./StyledButton";

const RecommendationContext = () => {
    const { currentSong, likedSongs } = useSelector(state => state);
    const history = useHistory();
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
                <StyledButton text="Keep browsing.."
                              onClickEvent={() => history.push('/search')} />
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

            <StyledButton text="NEXT &rsaquo;&rsaquo;"
                          onClickEvent={async () => {
                              if (!currentSong.liked) {
                                  dispatch(addSkippedSongs([currentSong.id]));
                              }
                              await getNextitem();
                          }} />
        </div>
    );
};

export default RecommendationContext;
