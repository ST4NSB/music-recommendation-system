import { changeSearchText } from "../actions/searchText.actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = ({layoutClasses, action, inputValue}) => {
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
                       if (e.key === 'Enter') {
                           action();
                       }
                   }} />

            <button type="submit" 
                    className="bg-white border-l-2 w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
                    onClick={() => {
                            action();
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default SearchBar;
