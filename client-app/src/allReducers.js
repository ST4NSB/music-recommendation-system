import { combineReducers } from 'redux';
import userIdReducer from './reducers/userId.reducer';
import likedSongsReducer from './reducers/likedSongs.reducer';
import skippedSongsReducer from './reducers/skippedSongs.reducer';
import searchTextReducer from './reducers/searchText.reducer';
import searchResultsReducer from './reducers/searchResults.reducer';
import currentSongReducer from './reducers/currentSong.reducer';
import portalStateReducer from './reducers/portalState.reducer';

const allReducers = combineReducers({
    userId: userIdReducer,
    likedSongs: likedSongsReducer,
    skippedSongs: skippedSongsReducer,
    searchText: searchTextReducer,
    searchResults: searchResultsReducer,
    currentSong: currentSongReducer,
    portalState: portalStateReducer,
});

export default allReducers;