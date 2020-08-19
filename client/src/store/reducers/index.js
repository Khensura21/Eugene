import  { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import transactions from "./transactions";
import wallet from "./wallet";

const rootReducer = combineReducers({
    currentUser,
    errors,
    transactions,
    wallet
});

export default rootReducer;