import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css"
import { userStore } from "../stores/UserStore.jsx";

function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const updateName = userStore(state => state.updateName);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        navigate('/', {replace: true});
        updateName(inputs.username);
    }

    return (
        <div className="Login" id="login-outer-container">
        <div className="page-wrap" id="login-page-wrap">
           <div className="loginpanel">
                <img src="/multimedia/logo-scrum-01.png" id="logo-login" alt="Agile-Scrum-logo" width="250" />
                <form id="login-form" className="input-login" onSubmit={handleSubmit}>
                <input type="text" id="username" name="username" placeholder="username" onChange={handleChange} required />
                <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} required />
                <button id="loginButton">Sign in</button>
                </form>
                <p>Don't have an account? <Link to="/register" id="register-link">Sign up</Link></p>
            </div>
        </div>
        </div>
    );
}

export default Login;
