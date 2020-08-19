import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_TRANSACTIONS }  from "../actionTypes";


export const loadTransactions = transactions => ({
    type: LOAD_TRANSACTIONS,
    transactions
});

//api call to load transactions
export const fetchTransactions = () => {
    return dispatch => {
        return apiCall("get", "/transactions")
            .then(res => dispatch(loadTransactions(res))
            .catch(err => addError(err.message))
        );
    }
}