import { useEffect } from "react";
import Main from "./components/Main";
import { Link } from "react-router-dom";

const Error = () => {
    
    useEffect(() => {
        document.title = "Error - Music Recommender System";
    }, []);

    return (
        <Main>
            <h1 className="mx-auto table text-9xl text-theme-white">404</h1>
            <p className="mx-auto table text-xl text-theme-white">ERROR - Page not found!</p>

            <p className="mx-auto table text-2xl text-purple-500 hover:text-purple-800 mt-20">
                <Link to="/">
                    Click here to go back &rsaquo; home
                </Link>
            </p>
        </Main>
    );
}

export default Error;
