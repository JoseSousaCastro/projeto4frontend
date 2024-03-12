import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../index.css'
import Login from "./Login";

function Home() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        navigate('/home', {replace: true});
    }

    return (
        <div className="Home" id="home-outer-container">
            <div className="page-wrap" id="home-page-wrap">
                <h1>Home</h1>
                <br />
                <Link to="/login">Sign in</Link>
                <br />
                <Link to="/register">Sign up</Link>
            </div>
        </div>
    );
}

export default Home