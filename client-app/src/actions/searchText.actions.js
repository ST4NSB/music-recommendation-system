import CHANGE from '../types/searchText.types';

export const changeSearchText = (text) => {
    return {
        type: CHANGE,
        payload: text
    };
};