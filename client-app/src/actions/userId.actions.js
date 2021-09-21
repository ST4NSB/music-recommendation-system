import { RESET_USERID } from '../types/userId.types';

export const resetUserId = (newUID) => {
    return {
        type: RESET_USERID,
        payload: newUID
    };
};