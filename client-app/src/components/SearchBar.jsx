import { changeSearchText } from "../actions/searchText.actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

export const SearchBar = ({layoutClasses, action, inputValue}) => {
    const searchText = useSelector(state => state.searchText);
    const dispatch = useDispatch();

    return (
        <div className={`shadow flex ${layoutClasses}`}>
            <input type="search" 
                   name="nav_search"
                   value={inputValue}
                   className="pl-10 pt-2 pb-2 m-0 focus:outline-none bg-theme-searchbar text-theme-gray w-full rounded-md"
                   placeholder="Search" 
                   onChange={(e) => {
                       dispatch(changeSearchText(e.target.value));
                   }}
                   onKeyDown={(e) => {
                       if (e.key === 'Enter' && searchText.trim().length !== 0) {
                           action();
                       }
                   }} />

            <button type="submit" 
                    className="text-theme-gray absolute left-1 top-1 w-auto flex justify-end items-center text-darken p-2 hover:text-theme-dark"
                    onClick={() => {
                        if (searchText.trim().length !== 0) {
                            action();
                        }
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default SearchBar;
