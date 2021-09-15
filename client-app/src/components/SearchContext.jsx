import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import ResultItem from "./ResultItem";
import { getRandomSongsApi, getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { addSkippedSongs, removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";

const SearchContext = () => {
    const { searchText, searchResults } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(async () => {
        if (searchText.trim().length === 0) {
            console.log("effect");
            await getRandomItems();
        }
    }, [searchText])

    const getRandomItems = async () => {
        const res = await getRandomSongsApi();
        dispatch(getSearchResults(res));
        dispatch(addSkippedSongs(res.map(x => x.id)));
    }

    const getResultItems = async () => {
        const res = await getSongsApi(searchText);
        dispatch(getSearchResults(res));
    }

    const addLikedItem = (id) => {
        dispatch(addLikedSong(id));
        dispatch(removeSkippedSongFromList(id));
    }

    return (
        <>
            <SearchBar layoutClasses="shadow flex my-5 mx-16 bg-white" 
                       action={getResultItems}
                       inputValue={searchText} />
            
            <div className="">
                {searchResults.map(x => 
                    <ResultItem id={x.id} 
                                name={x.name} 
                                youtubeId={x.youtubeId}
                                likeClick={addLikedItem} />)}
            </div>

            <button onClick={getRandomItems}>Get next random songs</button>
        </>
    );
}

export default SearchContext;
