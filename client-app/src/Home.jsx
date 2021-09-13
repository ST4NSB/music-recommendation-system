import { Link } from "react-router-dom";
import ClearPreferencesButton from "./components/ClearPreferencesButton";
import Header from "./components/Header";
import './css/index.css';

const Home = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-green-600">
                <h1>Music Recommender System</h1>
                <p>Information to be added here ....</p>
                <ClearPreferencesButton />
                <Link   className="px-4 py-2 rounded-md text-sm font-medium border shadow focus:outline-none focus:ring transition text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300" 
                        to='/search'>
                        Start discovering
                </Link>
            </main>
        </>
    );
}

export default Home;
