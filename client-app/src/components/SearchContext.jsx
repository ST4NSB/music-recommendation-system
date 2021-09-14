import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { getSearchResults } from "../actions/searchResults.actions";
import axios from "axios";
import { randomsongs } from "../utils/endpoints";

const SearchContext = () => {
    const { searchText, searchResults } = useSelector(state => state);
    const dispatch = useDispatch();

    const getSearchedItems = () => {
        const url = `${process.env.REACT_APP_HOST}${randomsongs}`, headers = {
            'Content-Type': 'application/json'
        };
        axios.post(url, {headers}).then((response) => {
            dispatch(getSearchResults(response.data));
        });
    }


    return (
        <>
            <SearchBar layoutClasses="shadow flex my-5 mx-16 bg-white" 
                       action={getSearchedItems}
                       inputValue={searchText} />
            
            <div className="">
                {searchResults.map(x => x.name)}
            </div>
        </>
    );
}

export default SearchContext;
