import { changeSearchText } from "../actions/searchText.actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

export const SearchBar = ({layoutClasses, action, inputValue}) => {
    const searchText = useSelector(state => state.searchText);
    const dispatch = useDispatch();

    return (
        <div className={layoutClasses}>
            <input type="search" 
                   name="nav_search"
                   value={inputValue}
                   className="focus:outline-none w-full rounded p-2 my-1"
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
                    className="bg-white border-l-2 w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
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