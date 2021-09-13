import { useHistory, useLocation } from "react-router-dom";
import { changeSearchText } from "../actions/searchText.actions";
import { useDispatch } from "react-redux";

const Header = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    if (location.pathname !== '/search') {
        return (
            <nav>
                <img    src="" 
                        alt="header logo" />
                <input  type="text" 
                        placeholder="Search here.." 
                        onChange={(e) => {
                            dispatch(changeSearchText(e.target.value));
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                history.push('/search');
                            }
                        }} />
                <button onClick={() => {
                            history.push('/search');
                        }}>
                        Go
                </button>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <img    src="" 
                        alt="header logo" />
            </nav>
        );
    }
}

export default Header; 
