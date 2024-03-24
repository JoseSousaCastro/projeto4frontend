import React, { useEffect, useState } from "react";
import "../DeletedUsers/DeletedUsers.css";
import { userStore } from "../../stores/UserStore";
import UserCard from "../UserCard/UserCard";

function DeletedUsers() {
    const { users } = userStore();


    return (
        <div className="users-list" id="users-list-outer-container">
            <div className="page-wrap-user-list" id="users-list-page-wrap">
                <div className="user-section">
                    <div className="titulo-main">
                        <h2 className="main-home">To do</h2>
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
                        <h2 className="main-home">Doing</h2>
                    </div>
                    <div className="panel" id="doing">
                        {usersScrumMaster.map(user => (
                            <div className="user-card-userMain" key={user.id}>
                                <UserCard user={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="user-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Done</h2>
                    </div>
                    <div className="panel" id="done">
                        {usersProductOwner.map(user => (
                            <div className="user-card-userMain" key={user.id}>
                                <UserCard user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletedUsers;
