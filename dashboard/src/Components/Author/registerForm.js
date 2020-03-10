import React, { Component } from "react";
import { client } from "../../App";
import { SIGNIN_ } from "../../Db/Author/Mutation/signIn";
import '../../Style/register.css'
import dash from '../../front/icon-dashboard.png';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.formStyle = {
            display: "flex",
            flexDirection: "column",
        };
        this.state = {
            firstName: "",
            lastName: "",
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
        e.target.name === "firstName" && (tmp.firstName = e.target.value);
        e.target.name === "lastName" && (tmp.lastName = e.target.value);
        e.target.name === "email" && (tmp.email = e.target.value);
        e.target.name === "password" && (tmp.password = e.target.value);
        tmp.valid = !!(tmp.email.length && tmp.password.length);
        this.setState(tmp);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.valid) {
            client.mutate({
                mutation: SIGNIN_,
                variables: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            }).then((res) => {
                res.data && res.data.login && window.localStorage.setItem("token", res.data.login.token);
                console.log("register ok")
                window.location.href = "/HomePage";
            });
        }
        else
            this.setState({ error: "Informations incomplètes" });
    }
    handleLogin(e) {
        e.preventDefault();
        window.location.href = "/";
    }
    render() {
        return (
            <form className="Box" style={formStyle}>
                <img src={dash} alt="dashboard-icon" className="Icon"></img>
                <label className="" htmlFor="firstName">FirstName</label>
                    <input className="Input" onChange={this.handleChange} type="firstName" id="firstName" name="firstName"/>
                <label className="" htmlFor="lastName">LastName</label>
                    <input className="Input" onChange={this.handleChange} type="lastName" id="lastName" name="lastName"/>
                <label className="" htmlFor="email">Email:</label>
                    <input className="Input" onChange={this.handleChange} type="email" id="email" name="email"/>
                <label className="" htmlFor="password">Password:</label>
                    <input className="Input" onChange={this.handleChange} type="password" id="password" name="password"/>
                <div style={{marginTop: 6, marginBottom: 12}} className="button5" onClick={this.handleSubmit}>Submit</div>
                <div className="Separator" />
                <div className="button5" onClick={this.handleLogin}>Log in</div>
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

export default RegisterForm