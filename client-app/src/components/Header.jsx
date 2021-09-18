import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { useSelector } from "react-redux";

const Header = () => {
    const { searchText, likedSongs } = useSelector(state => state);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const getResultItems = async () => {
        const res = await getSongsApi(searchText);
        dispatch(getSearchResults(res));
    }

    const showSearchBar = () => {
        if (location.pathname !== '/search') {
            return ( <SearchBar layoutClasses="shadow flex my-5" 
                       action={async () => {
                            if (searchText.trim().length !== 0) {
                                history.push('/search'); 
                                await getResultItems();
                           }
                        }} />);
        }
    }

    const showRecommendedLink = () => {
        if (location.pathname !== '/recommendations')
            return (<Link to='/recommendations'>GET RECOMMENDED SONG</Link>);
    }

    return (
        <header className="bg-milk border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
            <div className="flex items-center justify-between mb-4 md:mb-0">
                <h1 className="leading-none text-xl text-grey-darkest">
                    <a className="no-underline text-grey-darkest hover:text-black" href="#">
                        <img src="" 
                            alt="header logo" />
                    </a>
                </h1>
            </div>
         
            {showRecommendedLink()}
            {showSearchBar()}
         
        </header>
    );
}

export default Header; 
