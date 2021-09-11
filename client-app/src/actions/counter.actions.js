import { INCREMENT, DECREMENT } from '../types/counter.types';

export const increaseCounter = (nr) => {
    return {
        type: INCREMENT,
        payload: nr
    };
};

export const decreaseCounter = () => {
    return {
       type: DECREMENT,
    };
};