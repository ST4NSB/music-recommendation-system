import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import ResultItem from "./ResultItem";
import { getRandomSongsApi, getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { addSkippedSongs, removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import StyledButton from "./StyledButton";

const SearchContext = () => {
    const { userId, likedSongs, skippedSongs, searchText, searchResults } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(async () => {
        if (searchText.trim().length === 0) {
            await getRandomItems();
        }
    }, [searchText])

    const getRandomItems = async () => {
        const body = {
            'userId': userId,
            'liked': likedSongs,
            'skipped': skippedSongs
        };

        // del
        const res = await getRandomSongsApi(body);
        dispatch(getSearchResults(res));
        dispatch(addSkippedSongs(res.map(x => x.id)));
        // del

        // await getRandomSongsApi(body).then(response => {
        //     const res = response.data;
        //     dispatch(getSearchResults(res));
        //     dispatch(addSkippedSongs(res.map(x => x.id)));
        // });        
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
            <SearchBar layoutClasses="flex-col justify-center items-center pb-5" 
                       inputWidthClass="w-11/12"
                       buttonPosition="left-4per top-1"
                       action={getResultItems}
                       inputValue={searchText} />
            
            <div className="flex flex-col justify-center items-center">
                <StyledButton text="Get random songs"
                              onClickEvent={getRandomItems} />
            </div>

            <div className="flex flex-wrap justify-evenly flex-row pt-8">
                {searchResults.map(x => 
                    <ResultItem key={x.id}
                                id={x.id} 
                                name={x.name} 
                                youtubeId={x.youtubeId}
                                likeClick={addLikedItem}
                                itemClasses={'w-1/12 flex-basis-3'} />)}
            </div>
        </>
    );
}

export default SearchContext;
