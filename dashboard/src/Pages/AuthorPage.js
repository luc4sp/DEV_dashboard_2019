import {Component } from "react";
import React from "react";
import LoginForm from "../Components/Author/loginForm";
import "../Style/login.css"

class AuthorPage extends Component {
    render() {
        return (
            <div className="Background">
                <LoginForm/>
            </div>
        )
    }
}

export default AuthorPage;