

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../UsersAside/UsersAside.css";
import { userStore } from "../../stores/UserStore";

function UsersAside() {
    const { users } = userStore(); // Obtém a lista de usuários
    const navigate = useNavigate();

    return (
        <div>
            <div className="aside-usersAside">
                <div className="buttons-top">
                {/* Botão para adicionar tarefa que leva à página Add user */}
                <Link to="/add-user">
                    <button className="aside-button">Add User</button>
                </Link>
                <Link to="/users-deleted">
                    <button className="aside-button" id="deleted-users-button">Deleted Users</button>
                </Link>
                </div>
                {/* Dropdown menu para alterar role do user */}
                <label className="dropdown-label">Change user role</label>
                <div className="dropdown">
                    <select className="dropdown-select" onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">Choose user</option>
                        {users && users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    <select className="dropdown-select role-select" onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Choose role</option>
                        <option value="100">Developer</option>
                        <option value="200">Scrum Master</option>
                        <option value="300">Product Owner</option>
                    </select>
                    <div>
                        <button className="filter-button" onClick={handleFilterByUser}>Change role</button>
                    </div>
                    {/* Botão para deletar todas as tarefas do usuário selecionado */}
                </div>
            </div>
        </div>
    );
}

export default UsersAside;