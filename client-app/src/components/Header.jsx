import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { getSongsApi } from "../utils/apiRequests";
import { getSearchResults } from "../actions/searchResults.actions";
import { useSelector } from "react-redux";
import ClearPreferencesButton from "./ClearPreferencesButton";
import { getResultsSkeleton } from "../utils/common";
import { showPortal } from "../actions/portalState.actions";
import logo from "../images/logo.png";

const Header = () => {
    const { likedSongs } = useSelector(state => state);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const minSongs = parseInt(process.env.REACT_APP_MIN_SONGS);

    const navButtonStyle = "mx-6 p-3 text-theme-gray hover:text-theme-white whitespace-nowrap";
    const navButtonActive = " bg-theme-black rounded-md text-theme-white";

    const getResultItems = async (textInput) => {
        dispatch(getSearchResults(getResultsSkeleton('w-1/12 flex-basis-3')));
        await getSongsApi(textInput).then(response => {
            const res = response.data;
            dispatch(getSearchResults(res));
        }).catch(err => dispatch(showPortal({message: err.toString(), type:'error'})));
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
                    { likedSongs.length >= minSongs 
                        && <span className="h-3 w-3 relative bottom-7 left-1">
                                <span className="animate-ping absolute top-3 inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
                                <span className=" inline-flex absolute top-3 rounded-full h-3 w-3 bg-purple-500"></span>
                            </span> 
                    }
                </Link>
            </nav>
             
            { location.pathname !== '/search' 
                &&  <div className="w-full">
                        <SearchBar 
                            layoutClasses="shadow p-0 m-0 md:w-7/12 md:float-right sm:w-full" 
                            inputWidthClass="w-full"
                            buttonPosition="left-1 top-1"
                            action={async (textInput) => {
                                    history.push({pathname: '/search', state: {searchInput: textInput}}); 
                                    await getResultItems(textInput);
                                }
                            }
                            inputDefaultValue={''}
                            />
                    </div>
            }
        </header>
    );
}

export default Header; 
