import React, { Component } from "react";

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
 
    render() {
        const { email, firstName, lastName, password } = this.state;
        const { heading, buttonText } = this.props;
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor="email">Email:</label>
                            <input 
                                className="form-control"
                                type="text" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email}/>
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
            </div>
        )  
    }            
}

export default AuthForm