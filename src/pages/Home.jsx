import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../index.css'
import Header from "../components/Header/Header";
import Aside from "../components/Aside/Aside";
import Main from "../components/Main/Main";

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
                <div className="header-home-container">
                <Header />
                </div>
                <div className="aside-main-home-container">
                    <div className="aside-home-container">
                    <Aside />
                    </div>
                    <div className="main-home-container">
                    <Main />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home