import { LOAD_USER_WALLET_BALANCE } from "../actionTypes";

const wallet = (state = { }, action) => {
    switch(action.type) {
        case LOAD_USER_WALLET_BALANCE:
            return { wallet: action.amount };
        default:
            return state;
    }
}
export default wallet;