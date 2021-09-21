import Header from "./components/Header";
import SearchContext from "./components/SearchContext";
import Main from "./components/Main";
import { useEffect } from "react";

const Search = () => {
    useEffect(async () => {
        document.title = "Search - Music Recommender System";
    }, []);

    return (
        <>
            <Header />
            <Main>
                <h1 className="flex flex-col justify-center items-center text-theme-white font-bold text-3xl pb-7">
                    Search your favorite songs or Get random songs
                </h1>
                <SearchContext />
            </Main>
        </>
    );
}

export default Search;
