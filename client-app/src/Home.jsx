import { useHistory } from "react-router";
import Header from "./components/Header";
import Main from "./components/Main";
import StyledButton from "./components/StyledButton";
import { useEffect } from "react";
import './css/index.css';

const Home = () => {
    const history = useHistory();
    const questionClasses = "text-purple-300 text-2xl font-bold py-3";

    useEffect(() => {
        document.title = "Music Recommender System";
    }, [])

    return (
        <>
            <Header />
            <Main>
                <div className="flex flex-col justify-center items-center pt-12">
                    <h1 className="text-purple-600 text-6xl font-bold uppercase">Music Recommender System</h1>
                    <div className="text-theme-white text-xl py-5 text-center w-5/12">
                        <p className={questionClasses}>What is this about?</p>
                        <p>A web-app that recommends you songs based on what songs you like.</p>
                        <p className={questionClasses}>How this works?</p>
                        <p>You can start by searching for an artist/song and start liking.</p>
                        <p>Alternatively, you can also like random songs that the server provides you.</p>
                        <p>After liking a number of songs, you can access the recommendations page (by clicking on the "Get Recommendations" button), this page will fetch new songs recommended by the system based on your preferences.</p>
                        <p>Liking more songs will yield better results in the aspect of the accuracy.</p>
                        <p className={questionClasses}>How to create an account?</p>
                        <p>You don't need to create an account!</p>
                        <p>Your progress is saved locally automatically, to clear the history, use "Clear Preferences" button.</p>
                        <p className={`${questionClasses} pb-0`}>Got it, where can I start?</p>
                    </div>
                    <StyledButton
                        text="Get started"
                        onClickEvent={() => history.push('/search')}
                    />
                </div>
            </Main>
        </>
    );
}

export default Home;
