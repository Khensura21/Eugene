import  { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import transactions from "./transactions";

const rootReducer = combineReducers({
    currentUser,
    errors,
    transactions
});

export default rootReducer;