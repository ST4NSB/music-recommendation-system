import Header from "./components/Header";
import SearchContext from "./components/SearchContext";
import Main from "./components/Main";

const Search = () => {
    return (
        <>
            <Header />
            <Main>
                <SearchContext />
            </Main>
        </>
    );
}

export default Search;
