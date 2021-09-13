import { useHistory, useLocation } from "react-router-dom";
import { changeSearchText } from "../actions/searchText.actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    if (location.pathname !== '/search') {
        return (
            <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
                <div className="flex items-center justify-between mb-4 md:mb-0">
                    <h1 className="leading-none text-xl text-grey-darkest">
                        <a className="no-underline text-grey-darkest hover:text-black" href="#">
                            <img src="" 
                                alt="header logo" />
                        </a>
                    </h1>
                </div>

                <div className="shadow flex my-5">
                    <input  type="search" 
                            name="nav_search"
                            className="focus:outline-none w-full rounded p-2 my-1"
                            placeholder="Search" 
                            onChange={(e) => {
                                dispatch(changeSearchText(e.target.value));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    history.push('/search');
                                }
                            }} />
                
                    <button type="submit" 
                       className="bg-white border-l-2 w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
                       onClick={() => {
                            history.push('/search');
                       }}>
                           <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </header>
        );
    }
    else {
        return (
            <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
                <div className="flex items-center justify-between mb-4 md:mb-0">
                    <h1 className="leading-none text-xl text-grey-darkest">
                        <a className="no-underline text-grey-darkest hover:text-black" href="#">
                            <img src="" 
                                alt="header logo" />
                        </a>
                    </h1>
                </div>
            </header>
        );
    }
}

export default Header; 
