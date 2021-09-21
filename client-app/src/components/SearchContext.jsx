import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import ResultItem from "./ResultItem";
import { getRandomSongsApi, getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { addSkippedSongs, removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import StyledButton from "./StyledButton";
import { getResultsSkeleton } from "../utils/common";

const SearchContext = () => {
    const { userId, likedSongs, skippedSongs, searchText, searchResults } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchText.trim().length === 0) {
            const fetchAsync = async () => await getRandomItems();
            fetchAsync();
        }
    }, [searchText])

    const getRandomItems = async () => {
        dispatch(getSearchResults(getResultsSkeleton('w-1/12 flex-basis-3')));

        const body = {
            'userId': userId,
            'liked': likedSongs,
            'skipped': skippedSongs
        };

        await getRandomSongsApi(body).then(response => {
            const res = response.data;
            dispatch(getSearchResults(res));
            dispatch(addSkippedSongs(res.map(x => x.id)));
        });        
    }

    const getResultItems = async () => {
        dispatch(getSearchResults(getResultsSkeleton('w-1/12 flex-basis-3')));
        await getSongsApi(searchText).then(response => {
            const res = response.data;
            dispatch(getSearchResults(res));
        });
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
            
            <div className="flex flex-col justify-center items-center py-3">
                <StyledButton text="Get random songs"
                              onClickEvent={getRandomItems} />
            </div>

            <div className="flex flex-wrap justify-evenly flex-row py-6">
                {searchResults.map(x => 
                    <ResultItem key={x.id}
                                id={x.id} 
                                name={x.name} 
                                youtubeId={x.youtubeId}
                                emptyItem={x.emptyItem}
                                likeClick={addLikedItem}
                                itemClasses={'w-1/12 flex-basis-3'} />)}
            </div>
        </>
    );
}

export default SearchContext;
