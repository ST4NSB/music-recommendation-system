import { Link } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import './css/index.css';

const Home = () => {
    return (
        <>
            <Header />
            <Main>
                <div className="flex flex-col justify-center items-center">
                    <h1>Music Recommender System</h1>
                    <p>Information to be added here ....</p>
                    <Link className="px-4 py-2 rounded-md text-sm font-medium border shadow focus:outline-none focus:ring transition text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300" 
                            to='/search'>
                            Start discovering
                    </Link>
                </div>
            </Main>
        </>
    );
}

export default Home;
