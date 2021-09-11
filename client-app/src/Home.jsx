import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/counter.actions'

const Home = () => {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Music Recommender System</h1>

            <span>{counter}</span>

            <button onClick={() => dispatch(increaseCounter(4))}>inc</button>
            <button onClick={() => dispatch(decreaseCounter())}>desc</button>

            <div>This is home</div>
            <Link to='/search'>go to Search</Link>
            
        </>
    );
}

export default Home;
