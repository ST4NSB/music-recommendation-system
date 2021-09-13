import Header from "./components/Header";
import SearchContent from "./components/SearchContent";
import ClearPreferencesButton from "./components/ClearPreferencesButton";

const Search = () => {
    return (
        <>
            <Header />
            <div>search</div>
            <ClearPreferencesButton />
            <SearchContent />
        </>
    );
}

export default Search;
