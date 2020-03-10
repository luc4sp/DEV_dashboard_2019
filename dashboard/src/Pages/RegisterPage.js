import {Component } from "react";
import React from "react";
import RegisterForm from "../Components/Author/registerForm"
import '../Style/register.css'

class RegisterPage extends Component {
    render() {
        return (
            <div className="Background">
                <RegisterForm/>
            </div>
        )
    }
}

export default RegisterPage;