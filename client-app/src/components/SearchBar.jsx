import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

export const SearchBar = ({layoutClasses, inputWidthClass, buttonPosition, action, inputDefaultValue}) => {
    const [inputText, setInputText] = useState(inputDefaultValue?? '');

    return (
        <div className={`flex relative ${layoutClasses}`}>
            <input type="search" 
                   name="nav_search"
                   value={inputText}
                   className={`pl-10 pt-2 pb-2 m-0 focus:outline-none bg-theme-searchbar text-theme-white rounded-md ${inputWidthClass}`}
                   placeholder="Search" 
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyDown={(e) => {
                       if (e.key === 'Enter' && inputText.trim().length !== 0) {
                           action(inputText);
                       }
                   }} />

            <button type="submit" 
                    className={`text-theme-gray absolute w-auto flex justify-end items-center text-darken p-2 hover:text-theme-dark-xm ${buttonPosition}`}
                    onClick={() => {
                        if (inputText.trim().length !== 0) {
                            action(inputText);
                        }
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default SearchBar;
