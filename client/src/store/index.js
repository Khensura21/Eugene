import rootReducer from "./reducers";
import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk"; // allows us to delay the evaluation for some expressions (helpful for async code)

export function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    return store;
}