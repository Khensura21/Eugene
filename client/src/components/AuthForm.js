import React, { Component } from "react";
import { removeError } from "../store/actions/errors";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        //may have to change this below to also account for google OAuth button
        const authType = this.props.signUp ? "signup" : "signin";
        this.props
        .onAuth(authType, this.state)
        .then(() => {
            console.log("succesfully, signed in!")
            this.props.history.push("/")
        }).catch(() => {
            return;
        })
    }


    render() {
        const { email, firstName, lastName, password } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;

        history.listen(() => {
            removeError();
        });
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            <label htmlFor="email">Email:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                            {signUp && (
                                <div>
                                    <label htmlFor="firstname">First Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        onChange={this.handleChange}
                                        value={firstName}
                                    />
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        onChange={this.handleChange}
                                        value={lastName}
                                    />
                                </div>
                            )
                            }
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm