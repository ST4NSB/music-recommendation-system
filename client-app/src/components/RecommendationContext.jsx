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
import StyledButton from "./StyledButton";
import { getSingleSkeleton } from "../utils/common";

const RecommendationContext = () => {
    const { userId, currentSong, likedSongs, skippedSongs } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();

    const getNextitem = async () => {
        dispatch(getNextSong(getSingleSkeleton('w-4/12')));

        const body = {
            'userId': userId,
            'liked': likedSongs,
            'skipped': skippedSongs
        };

        await getNextRecommendedSongApi(body).then(response => {
            const res = response.data;
            document.title = res.name;
            dispatch(getNextSong(res));
        });
    }

    const addLikedItem = () => {
        dispatch(addLikedSong(currentSong.id));
        dispatch(removeSkippedSongFromList(currentSong.id));
    }

    useEffect(() => {
        const fetchAsync = async () => await getNextitem();
        fetchAsync();
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
                        emptyItem={currentSong.emptyItem}
                        likeClick={async () => {
                            dispatch(likeCurrentSong());
                            addLikedItem();
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
