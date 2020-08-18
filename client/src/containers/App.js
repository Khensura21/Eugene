import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store"
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Navbar from "./Navbar"
import Main from "./Main"
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';


const store = configureStore();
//hydration concept-- if server goes down/redux store gets clear, when the page refresh, we are still able to check & set a token 
// and repopulate state w/ current user/client
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  //prevents someone manually tampering with key of jwToken in localstorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch(e) {
    store.dispatch(setCurrentUser({}))
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
       <Navbar />
       <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
