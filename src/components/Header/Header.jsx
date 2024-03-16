import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Header/Header.css';
import { userStore } from "../../stores/UserStore";



function Header() {
    const navigate = useNavigate();

    const username = userStore(state => state.username);
    const photoURL = userStore(state => state.photoURL);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/', {replace: true});
    }

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/edit-profile');
    }

    return (
        <div className="header" id="header-outer-container">
            <div className="page-wrap" id="header-page-wrap">
                <div className="logo-home-container">
                    <img src="/multimedia/logo-scrum-05.png" id="logo-header" height="50" alt="Agile-Scrum-logo"/>
                </div>
                <div className="nav-left-container">
                    <nav className="nav-menu-left">
                        <ul id="menu">
                            <li id="nav-home"><Link to="/home" >My Scrum</Link></li>
                            <li id="nav-all-tasks"><Link to="/">All Tasks</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="nav-menu-right">
                    <div className="link-edit-profile">
                        <img src={photoURL} id="profile-pic" alt="profile-pic" />
                        <p id="first-name-label" onClick={handleClick}>{username}</p>
                    </div>
                    <button className="logout-button" id="logout-button-header" onClick={handleSubmit}>
                        <img src="/multimedia/logout.png" alt="logout-icon" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;