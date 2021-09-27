import Header from "./components/Header";
import SearchContext from "./components/SearchContext";
import Main from "./components/Main";
import { useEffect } from "react";

const Search = () => {
    useEffect(() => {
        document.title = "Search - Music Recommender System";
    }, []);

    return (
        <>
            <Header />
            <Main>
                <h1 className="flex flex-col justify-center items-center text-center mobile:text-lg text-theme-white font-bold text-2xl pb-7">
                    Search for your favorite artists/songs or browse random songs
                </h1>
                <SearchContext />
            </Main>
        </>
    );
}

export default Search;
