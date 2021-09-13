import { useSelector, useDispatch } from "react-redux";
import { changeSearchText } from "../actions/searchText.actions"

const SearchContent = () => {
    const searchText = useSelector(state => state.searchText);
    const dispatch = useDispatch();

    return (
        <input  type="text"
                placeholder="Search your favorite song or artist here.."
                value={searchText}
                onChange={(e) => {
                    dispatch(changeSearchText(e.target.value));
                }}
        />
    );
}

export default SearchContent;
