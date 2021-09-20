import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { useSelector } from "react-redux";
import ClearPreferencesButton from "./ClearPreferencesButton";
import logo from "../images/logo.png";

const Header = () => {
    const { searchText, likedSongs } = useSelector(state => state);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const navButtonStyle = "mx-6 p-3 text-theme-gray hover:text-theme-white whitespace-nowrap";
    const navButtonActive = " bg-theme-black rounded-md text-theme-white";

    const getResultItems = async () => {
        const res = await getSongsApi(searchText);
        dispatch(getSearchResults(res));
    }

    const showSearchBar = () => {
        if (location.pathname !== '/search') {
            return ( <SearchBar 
                        layoutClasses="shadow p-0 m-0 md:w-7/12 md:float-right sm:w-full" 
                        inputWidthClass="w-full"
                        buttonPosition="left-1 top-1"
                        action={async () => {
                                if (searchText.trim().length !== 0) {
                                    history.push('/search'); 
                                    await getResultItems();
                            }
                        }} />);
        }
    }

    const showAnimation = () => {
        if (likedSongs.length >= 3)
            return (
                <span class="h-3 w-3 relative bottom-7 left-1">
                    <span class="animate-ping absolute top-3 inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
                    <span class=" inline-flex absolute top-3 rounded-full h-3 w-3 bg-purple-500"></span>
                </span> 
            );
    }

    return (
        <header className="font-sans sticky top-0 z-50 bg-theme-dark-xm md:flex md:items-center p-4 pb-0 shadow-lg md:pb-4 mobile:pb-5">
            <div className="mb-4 md:mb-0">
                    <a className="no-underline text-grey-darkest" href="/">
                        <img src=""
                             className="h-22 w-32 text-white"
                             alt="header logo" />
                    </a>
            </div>

            <nav className="w-full">
                <button className={`align-middle ${navButtonStyle}`}><a href='https://github.com/ST4NSB/music-recommendation-system'><img className="h-6 w-6" alt="github logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" /></a></button>
                <Link className={(location.pathname === '/search') ? navButtonStyle + navButtonActive : navButtonStyle } to='/search'>Browse</Link>
                <ClearPreferencesButton buttonStyle={navButtonStyle} />
                <Link className={(location.pathname === '/recommendations') ? navButtonStyle + navButtonActive : navButtonStyle } to='/recommendations'>
                    Get Recommendations  
                    {showAnimation()}
                </Link>
            </nav>
         
            <div className="w-full">
                {showSearchBar()}
            </div>
        </header>
    );
}

export default Header; 
