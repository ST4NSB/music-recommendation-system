import { Link } from "react-router-dom";
import ClearPreferencesButton from "./components/ClearPreferencesButton";
import Header from "./components/Header";

const Home = () => {
    return (
        <>
            <Header />
            <h1>Music Recommender System</h1>
            <p>Information to be added here ....</p>
            <ClearPreferencesButton />
            <Link to='/search'>Start discovering</Link>
        </>
    );
}

export default Home;
