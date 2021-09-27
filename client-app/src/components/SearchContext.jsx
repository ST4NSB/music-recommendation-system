import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import ResultItem from "./ResultItem";
import { getRandomSongsApi, getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { addSkippedSongs, removeSkippedSongFromList } from "../actions/skippedSongs.actions";
import { addLikedSong } from "../actions/likedSongs.actions";
import StyledButton from "./StyledButton";
import { useEffect } from "react";
import { showPortal } from "../actions/portalState.actions";
import { getResultsSkeleton } from "../utils/common";
import { useState } from "react";
import { useLocation } from "react-router";

const SearchContext = () => {
    const { userId, likedSongs, skippedSongs, searchResults } = useSelector(state => state);
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchText, setSearchText] = useState(location.state?.searchInput?? '');

    useEffect(() => {
        if (searchText.trim().length === 0) {
            const fetchAsync = async () => await getRandomItems();
            fetchAsync();
        } // eslint-disable-next-line
    }, [])

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
        }).catch(err => dispatch(showPortal({message: err.toString(), type:'error'})));        
    }

    const getResultItems = async (textInput) => {
        setSearchText(textInput);
        dispatch(getSearchResults(getResultsSkeleton('w-1/12 flex-basis-3')));
        await getSongsApi(textInput).then(response => {
            const res = response.data;
            dispatch(getSearchResults(res));
        }).catch(err => dispatch(showPortal({message: err.toString(), type:'error'})));
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
                       inputDefaultValue={searchText} />
            
            <div className="flex flex-col justify-center items-center py-3">
                <StyledButton text="Get random songs"
                              onClickEvent={getRandomItems} />
            </div>

            <div className="flex flex-wrap justify-evenly flex-row py-6">
                { searchResults.map(x => 
                    <ResultItem key={x.id}
                                id={x.id} 
                                name={x.name} 
                                youtubeId={x.youtubeId}
                                emptyItem={x.emptyItem}
                                likeClick={addLikedItem}
                                itemClasses={"w-1/12 flex-basis-3 tablet:min-w-45 mobile:min-w-90"} />)}
            </div>
        </>
    );
}

export default SearchContext;
