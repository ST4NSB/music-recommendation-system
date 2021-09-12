
import { getUserId } from "../utils/storage";

const reducer = (state = getUserId(), action) => {
    switch (action.type) {
        default: return state;
    }
};

export default reducer;