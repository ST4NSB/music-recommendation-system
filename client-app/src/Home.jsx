import { useHistory } from "react-router";
import Header from "./components/Header";
import Main from "./components/Main";
import StyledButton from "./components/StyledButton";
import './css/index.css';

const Home = () => {
    const history = useHistory();

    return (
        <>
            <Header />
            <Main>
                <div className="flex flex-col justify-center items-center">
                    <h1>Music Recommender System</h1>
                    <p>Information to be added here ....</p>
                    <StyledButton
                        text="Start discovering"
                        onClickEvent={() => history.push('/search')}
                    />
                </div>
            </Main>
        </>
    );
}

export default Home;
