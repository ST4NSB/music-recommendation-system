import { combineReducers } from 'redux';
import userIdReducer from './reducers/userId.reducer';
import likedSongsReducer from './reducers/likedSongs.reducer';
import skippedSongsReducer from './reducers/skippedSongs.reducer';
import searchTextReducer from './reducers/searchText.reducer';

const allReducers = combineReducers({
    userId: userIdReducer,
    likedSongs: likedSongsReducer,
    skippedSongs: skippedSongsReducer,
    searchText: searchTextReducer,
});

export default allReducers;