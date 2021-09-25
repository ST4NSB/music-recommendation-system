import { SHOW_PORTAL, HIDE_PORTAL } from '../types/portalState.types'

const reducer = (state = { show: false, message:'', type: 'error' }, action) => {
    switch (action.type) {
        case SHOW_PORTAL: return { ...action.payload, show: true, message: action.payload.message, type: action.payload.type };
        case HIDE_PORTAL: return { ...state, show: false };
        default: return state;
    }
};

export default reducer;