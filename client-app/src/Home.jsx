import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addLikedSong, clearLikedSongsList } from './actions/likedSongs.actions'
import { addSkippedSong, clearSkippedSongsList } from "./actions/skippedSongs.actions";

const Home = () => {
    const userId = useSelector(state => state.userId);
    const likedSongs = useSelector(state => state.likedSongs);
    const skippedSongs = useSelector(state => state.skippedSongs);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Music Recommender System</h1>

            <div>{userId}</div>
            <div>{likedSongs}</div>
            <div>{skippedSongs}</div>

            <button onClick={() => dispatch(addLikedSong('like'))}>inc</button>
            <button onClick={() => dispatch(clearLikedSongsList())}>desc</button>


            <button onClick={() => dispatch(addSkippedSong('skip'))}>inc</button>
            <button onClick={() => dispatch(clearSkippedSongsList())}>desc</button>



            <div>This is home</div>
            <Link to='/search'>go to Search</Link>
            
        </>
    );
}

export default Home;
