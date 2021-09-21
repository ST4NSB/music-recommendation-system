
import { getUserId, resetUserId } from "../utils/storage";
import { RESET_USERID } from "../types/userId.types";

const reducer = (state = getUserId(), action) => {
    switch (action.type) {
        case RESET_USERID: {
            resetUserId(action.payload);
            state = action.payload;
            return state;
        }
        default: return state;
    }
};

export default reducer;