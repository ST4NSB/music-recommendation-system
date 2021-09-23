import { SHOW_PORTAL, HIDE_PORTAL } from '../types/portalState.types';

export const showPortal = (message) => {
    return {
        type: SHOW_PORTAL,
        payload: message
    };
};

export const hidePortal = () => {
    return {
       type: HIDE_PORTAL
    };
};