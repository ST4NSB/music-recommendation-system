import Header from "./components/Header";
import SearchContext from "./components/SearchContext";
import ClearPreferencesButton from "./components/ClearPreferencesButton";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";

const Search = () => {
    return (
        <>
            <Header />
            <Main>
                <ClearPreferencesButton />
                <SearchContext />
            </Main>
        </>
    );
}

export default Search;
