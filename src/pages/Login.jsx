import React from "react";
//import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css'
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
        navigate('/home', {replace: true});
        updateName(inputs.username);
    }

    return (
        <div className="Login" id="login-outer-container">
        <div className="page-wrap" id="login-page-wrap">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
        <label>Enter your username:
            <input type="text" name="username" defaultValue={inputs.username || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your password:
            <input type="text" name="password" defaultValue={inputs.password || ""} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="Login" />
        </form>
        </div>
        </div>
    );
}

export default Login;
