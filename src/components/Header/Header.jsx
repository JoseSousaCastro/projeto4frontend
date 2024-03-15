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

    return (
        <div className="header" id="header-outer-container">
            <div className="page-wrap" id="header-page-wrap">
                <div className="logo-home-container">
                    <img src="/multimedia/logo-scrum-05.png" id="logo-header" height="50" alt="Agile-Scrum-logo" draggable="false" />
                </div>
                <div className="nav-left-container">
                    <nav className="nav-menu-left">
                        <ul id="menu">
                            <li id="nav-home"><Link to="/home" draggable="false">My Scrum</Link></li>
                            <li id="nav-all-tasks"><Link to="/">All Tasks</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="nav-menu-right">
                    <Link className="link-edit-profile" to="/">
                        <img src={photoURL} id="profile-pic" alt="profile-pic" draggable="false" />
                        <span id="first-name-label" draggable="false">{username}</span>
                    </Link>
                    <button className="logout-button" id="logout-button-header" onClick={handleSubmit}>
                        <img src="/multimedia/logout.png" alt="logout-icon" draggable="false" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;