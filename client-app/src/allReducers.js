import { combineReducers } from 'redux';

import counterReducer from './reducers/counter.reducer';

const allReducers = combineReducers({
    counter: counterReducer,
});

export default allReducers;