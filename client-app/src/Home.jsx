import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addLikedSong, clearLikedSongsList } from './actions/likedSongs.actions'
import { addSkippedSong, clearSkippedSongsList } from "./actions/skippedSongs.actions";
import ClearPreferences from "./components/ClearPreferences";

const Home = () => {
    const {userId, likedSongs, skippedSongs} = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Music Recommender System</h1>

            <div>{userId}</div>
            <div>{likedSongs}</div>
            <div>{skippedSongs}</div>

            <button onClick={() => dispatch(addLikedSong('like'))}>add like</button>
            <button onClick={() => dispatch(addSkippedSong('skip'))}>add skip</button>
            <ClearPreferences/>



            <div>This is home</div>
            <Link to='/search'>go to Search</Link>
            
        </>
    );
}

export default Home;
