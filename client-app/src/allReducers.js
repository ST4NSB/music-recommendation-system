import { combineReducers } from 'redux';
import userIdReducer from './reducers/userId.reducer';
import likedSongsReducer from './reducers/likedSongs.reducer'
import skippedSongsReducer from './reducers/skippedSongs.reducer'

const allReducers = combineReducers({
    userId: userIdReducer,
    likedSongs: likedSongsReducer,
    skippedSongs: skippedSongsReducer,
});

export default allReducers;