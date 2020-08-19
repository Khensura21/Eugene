import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions/auth";
import Logo from "../images/eugene-logo.png";


class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        //this.props.history.push("/signin")
        this.props.logout();
    }
    render () {
        return (
            <nav className=" navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} alt="Eugene Home" />
                        </Link>
                </div>
                {this.props.currentUser.isAuthenticated ? (
                    <ul className="nav-navbar-nav navbar-right">
                        <li>
                            <Link to={`/users/${this.props.currentUser.user.id}/portfolio/`}> Buy Stock!</Link>

                        </li>
                        <li>
                        <Link to="/users/:id/transactions/" > Transactions </Link> 
                            
                        </li>
                        <li>
                            <a onClick={this.logout}> Log out </a>
                        </li>
                    </ul>
                )
                : ( 
                    <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup"> Sign up </Link>
                    </li>
                    <li>
                        <Link to="/signin"> Login</Link>
                    </li>
                </ul>
                )}
                </div>
            </nav>
        ); 
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { logout })(Navbar);