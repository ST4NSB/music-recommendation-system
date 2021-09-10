import { Link, Redirect } from "react-router-dom";

const Home = () => {

    return (
        <>
            <h1>Music Recommender System</h1>

            <div>This is home</div>
            <Link to='/search'>go to Search</Link>
            
        </>
    );
}

export default Home;
