import { Link, Redirect } from "react-router-dom";

const Home = () => {

    return (
        <>
            <Redirect to='/search'></Redirect>
            
            <div>This is home</div>
            <Link to='/search'>go to Search</Link>
            

        </>
    );
}

export default Home;
