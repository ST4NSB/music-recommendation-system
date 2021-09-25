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
import { showPortal } from "../actions/portalState.actions";

const RecommendationContext = () => {
    const { userId, currentSong, likedSongs, skippedSongs } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const minSongs = parseInt(process.env.REACT_APP_MIN_SONGS);

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
        }).catch(err => dispatch(showPortal({message: err.toString(), type:'error'})));
    }

    const addLikedItem = () => {
        dispatch(addLikedSong(currentSong.id));
        dispatch(removeSkippedSongFromList(currentSong.id));
    }

    useEffect(() => {
        document.title = "Music Recommender System";
        if (likedSongs.length >= minSongs) {
            const fetchAsync = async () => await getNextitem();
            fetchAsync(); // eslint-disable-next-line 
        } // eslint-disable-next-line
    }, []); 

    if (likedSongs.length < minSongs) 
        return (
            <div className="flex flex-col justify-center items-center pt-12">
                <p className="text-theme-white text-xl py-4">You need to like at least <span className="text-purple-300">{minSongs}</span> songs before getting recommended songs!</p>
                <StyledButton text="Keep browsing.."
                              onClickEvent={() => history.push('/search')} />
            </div>
        );
    else return (
        <div className="flex flex-col justify-center items-center pt-14">
            <p className="text-theme-white text-xl pt-3 pb-7">System recommended this song, hit <span className="text-purple-300"> Like </span> if you like it or <span className="text-theme-gray"> NEXT </span> if you want another recommendation</p>
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
