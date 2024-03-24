import React, { useEffect, useState } from "react";
import "../UsersMain/UsersMain.css";
import { userStore } from "../../stores/UserStore";
import UserCard from "../UserCard/UserCard";

function UsersMain() {
    const { users } = userStore();


    return (
        <div className="users-users-list" id="users-users-list-outer-container">
            <div className="page-wrap-user-list" id="users-users-list-page-wrap">
                <div className="user-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Developer</h2>
                    </div>
                    <div className="panel" id="todo">
                        {users.map(user => (
                            <div className="user-card-userMain" key={user.id}>
                                <UserCard user={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="user-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Scrum Master</h2>
                    </div>
                    <div className="panel" id="doing">
                        {usersScrumMaster.map(user => (
                            <div className="user-card-userMain" key={user.id}>
                                <userCard user={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="user-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Product Owner</h2>
                    </div>
                    <div className="panel" id="done">
                        {usersProductOwner.map(user => (
                            <div className="user-card-userMain" key={user.id}>
                                <userCard user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersMain;
