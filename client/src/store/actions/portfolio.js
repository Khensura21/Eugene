import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_WALLET_BALANCE }  from "../actionTypes";


export const loadUserWalletBalance = wallet => ({
    type: GET_WALLET_BALANCE,
    wallet
});

//api call to load transactions
export const fetchUserWallet = () => {
    return dispatch => {
        return apiCall("get", "/wallet")
            .then(res => dispatch(loadUserWalletBalance(res))
            .catch(err => addError(err.message))
        );
    }
}