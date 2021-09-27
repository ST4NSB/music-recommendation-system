import { SHOW_PORTAL, HIDE_PORTAL } from '../types/portalDisplay.types';

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