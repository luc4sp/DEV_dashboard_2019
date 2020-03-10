import React, { Component } from "react";
import { client } from "../../App";
import { LOGIN_ } from "../../Db/Author/Mutation/login";
import '../../Style/login.css';
import dash from '../../front/icon-dashboard.png';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.formStyle = {
            display: "flex",
            flexDirection: "column",
        };
        this.state = {
            email: "",
            password: "",
            valid: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        let tmp = this.state;
        e.target.name === "email" && (tmp.email = e.target.value);
        e.target.name === "password" && (tmp.password = e.target.value);
        tmp.valid = !!(tmp.email.length && tmp.password.length);
        this.setState(tmp);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.valid) {
            client.mutate({
                mutation: LOGIN_,
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }
            }).then((res) => {
                res.data && res.data.login && window.localStorage.setItem("token", res.data.login.token);
                console.log("login ok")
                window.location.href = "/HomePage";
            });
        }
        else
            this.setState({ error: "Informations incomplètes" });
    }
    handleRegister(e) {
        e.preventDefault();
        window.location.href = "/register";
    }
    render() {
        return (
            <form className="Box_login" style={formStyle}>
                <img src={dash} alt="dashboard-icon" className="Icon"></img>
                <label className="Input-label" htmlFor="email">Email:</label>
                    <input className="Input" onChange={this.handleChange} type="email" id="email" name="email"/>
                <label className="Input-label" htmlFor="password">Password:</label>
                    <input className="Input" onChange={this.handleChange} type="password" id="password" name="password"/>
                <div style={{marginTop: 6, marginBottom: 12}} className="button5"  onClick={this.handleSubmit}>Submit</div>
                <div className="Separator" />
                <div className="button5" onClick={this.handleRegister}>Register</div>
                {this.state.error.length !== 0 &&
                <p>{this.state.error}</p>}
            </form>
        );
    }
}

const formStyle = {
    display: "flex",
    flexDirection: "column",
};

export default LoginForm