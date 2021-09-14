import UPDATE_RESULTS from '../types/searchResults.types';

export const getSearchResults = (res) => {
    return {
        type: UPDATE_RESULTS,
        payload: res
    };
};