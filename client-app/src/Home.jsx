import { useHistory } from "react-router";
import Header from "./components/Header";
import Main from "./components/Main";
import StyledButton from "./components/StyledButton";
import { useEffect } from "react";
import './css/index.css';

const Home = () => {
    const history = useHistory();

    useEffect(() => {
        document.title = "Music Recommender System";
    }, [])

    return (
        <>
            <Header />
            <Main>
                <div className="flex flex-col justify-center items-center pt-12">
                    <h1 className="text-purple-600 text-6xl font-bold uppercase text-center tablet:text-5xl mobile:text-3xl">Music Recommender System</h1>
                    <div className="text-theme-white text-xl py-5 text-center w-6/12 tablet:w-8/12 mobile:w-10/12 mobile:text-base">
                        <p className="question">&#10070; What is this about? &#10070;</p>
                        <p>A web-app that recommends you songs based on what songs you like.</p>
                        <p className="question">&#10070; How this works? &#10070;</p>
                        <p>You can start by searching for an artist/song and start liking.</p>
                        <p>Alternatively, you can also like random songs that the server provides you.</p>
                        <p>After liking a number of songs, you can access the recommendations page (by clicking on the "Get Recommendations" button), this page will fetch new songs recommended by the system based on your preferences.</p>
                        <p>Liking more songs will yield better results in the aspect of the accuracy.</p>
                        <p className="question">&#10070; How to create an account? &#10070;</p>
                        <p>You don't need to create an account!</p>
                        <p>Your account is created automatically, the progress is saved both locally and in a mongoDB server.</p>
                        <p>To clear your history, use "Clear Preferences" button.</p>
                        <p className="question pb-5">&#10070; Got it, where can I start? &#10070;</p>
                        <StyledButton
                            text="Get started"
                            onClickEvent={() => history.push('/search')}
                        />
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Home;
