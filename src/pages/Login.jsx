import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css"
import { userStore } from "../stores/UserStore.jsx";

function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const updateUserStore = userStore(state => state);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const login = {
            username: inputs.username,
            password: inputs.password
        };

        try {
            const response = await fetch("http://localhost:8080/project_backend/rest/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            });

            if (response.ok) {
                const user = await response.json();
                updateUserStore.updateUsername(user.username);
                updateUserStore.updateEmail(user.email);
                updateUserStore.updateFirstName(user.firstName);
                updateUserStore.updateLastName(user.lastName);
                updateUserStore.updatePhone(user.phone);
                updateUserStore.updateToken(user.token);
                updateUserStore.updatePhotoURL(user.photoURL);
                updateUserStore.updateTypeOfUser(user.typeOfUser);
                console.log("User:", user);
                console.log("Username:", user.username);
                console.log("Token:", user.token);
                console.log("PhotoURL:", user.photoURL);
                console.log("TypeOfUser:", user.typeOfUser);
                console.log("Email:", user.email);
                console.log("FirstName:", user.firstName);
                console.log("LastName:", user.lastName);
                console.log("Phone:", user.phone);
                

                console.log("Login feito com sucesso!");
                navigate('/home', { replace: true });

                
            } else {
                const responseBody = await response.json();
                console.error("Erro no login:", response.statusText, responseBody);
                // Pode exibir uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error("Erro no login:", error);
            // Pode exibir uma mensagem de erro para o usuário
        }
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
