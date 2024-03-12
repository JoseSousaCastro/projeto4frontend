import React from "react";
//import Sidebar from "../components/navbar/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css'
import { userStore } from "../stores/UserStore.jsx";

function Register() {
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
        <div className="Register" id="register-outer-container">
        <div className="page-wrap" id="register-page-wrap">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
        <label>Enter your username:
            <input type="text" name="username" defaultValue={inputs.username || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your password:
            <input type="text" name="password" defaultValue={inputs.password || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Confirm your password:
            <input type="text" name="passwordConfirm" defaultValue={inputs.passwordConfirm || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your email:
            <input type="text" name="email" defaultValue={inputs.email || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your first name:
            <input type="text" name="firstName" defaultValue={inputs.firstName || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your last name:
            <input type="text" name="lastName" defaultValue={inputs.lastName || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your phone number:
            <input type="text" name="phone" defaultValue={inputs.phone || ""} onChange={handleChange} />
        </label>
        <br />
        <label>Enter your photo URL:
            <input type="text" name="photoUrl" defaultValue={inputs.photoUrl || ""} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="Register" />
        </form>
        </div>
        </div>
    );
}

export default Register;