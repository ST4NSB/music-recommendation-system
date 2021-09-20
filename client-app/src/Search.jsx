import Header from "./components/Header";
import SearchContext from "./components/SearchContext";
import Main from "./components/Main";

const Search = () => {
    return (
        <>
            <Header />
            <Main>
                <h1 className="flex flex-col justify-center items-center text-purple-500 font-bold text-3xl pb-5">
                    Search your favorite songs or Get random songs
                </h1>
                <SearchContext />
            </Main>
        </>
    );
}

export default Search;
