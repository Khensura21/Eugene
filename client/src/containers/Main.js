// file responsible for our routing logic 

import React from "react"
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import TransactionList from "../components/TransactionList";
import Portfolio from "../components/Portfolio";

const Main = (props) => {
    const { authUser, errors, removeError, currentUser} = props
    return (
    <div className="container">
        <Switch>
            <Route exact path="/" render={ props => <Homepage currentUser={currentUser} {...props} />} />
            <Route 
                exact
                path="/users/:id/transactions/" 
                currentUser={currentUser}
                component={withAuth(TransactionList)} 
                // render={props => {
                //     return (
                //         <TransactionList 
                //             currentUser={currentUser} 
                //             {...props} 
                //         /> 
                //     ) 
                // }}
            />    
            <Route 
                exact 
                path="/signin" 
                render={props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Log in" 
                            heading="Welcome Back" 
                            {...props} 
                        />
                    );
                }}
            />
            <Route 
                exact 
                path="/signup" 
                render={props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser} 
                            signUp
                            buttonText="Sign me up!" 
                            heading="Join Eugene Today" 
                            {...props} 
                        />
                    );
                }}
            />
            <Route 
                path="/users/:id/portfolio/"
                currentUser={currentUser}
                component={withAuth(Portfolio)} 
             />
        </Switch>
    </div>
)};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
     };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));