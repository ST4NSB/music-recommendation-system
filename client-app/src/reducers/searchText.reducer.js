import CHANGE from '../types/searchText.types'

const reducer = (state = '', action) => {
    switch (action.type) {
        case CHANGE: return action.payload;
        default: return state;
    }
};

export default reducer;