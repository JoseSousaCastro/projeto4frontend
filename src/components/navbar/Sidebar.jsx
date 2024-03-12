import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default props => {
    return (
        <Menu>
            <Link id="tasks" className="menu-item" to="/">
                Tasks
            </Link>
            <Link id="users" className="menu-item" to="/users">
                Users
            </Link>
            <Link id="edit-profile" className="menu-item" to="/editProfile">
                My Profile
            </Link>
            <Link id="logout" className="menu-item" to="/login">
                Logout
            </Link>
        </Menu>
    );
}