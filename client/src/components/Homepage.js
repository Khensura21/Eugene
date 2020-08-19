import React from "react";
import { Link } from "react-router-dom";
import TransactionList from "./TransactionList";

const Homepage = ({ currentUser }) => {
    if (currentUser.isAuthenticated === false) {
        return (
            <div className="home-hero">
                <h1> What's Up! </h1>
                <h4>New to Eugene?</h4>
                <Link to="/signup" className="btn btn-primary" >
                    Sign up here
                </Link>
            </div>
        );
    }
    return (
        <div>
              <TransactionList />
        </div>
    )
};

export default Homepage;