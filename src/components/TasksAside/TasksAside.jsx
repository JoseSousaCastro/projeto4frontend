/* Add task - aside button
Filter tasks by user - aside dropdown
Filter tasks by category - aside dropdown */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TasksAside.css";
import { userStore } from "../../stores/UserStore";
import { categoryStore } from "../../stores/CategoryStore";

function TasksAside() {
    const { users } = userStore(); // Obtém a lista de usuários
    const { categories } = categoryStore(); // Obtém a lista de categorias

    // Estado para o usuário selecionado no filtro
    const [selectedUser, setSelectedUser] = useState("");
    // Estado para a categoria selecionada no filtro
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleFilterByUser = () => {
        // Implemente a lógica para filtrar tarefas pelo usuário selecionado
        console.log("Filtering tasks by user:", selectedUser);
    };

    const handleFilterByCategory = () => {
        // Implemente a lógica para filtrar tarefas pela categoria selecionada
        console.log("Filtering tasks by category:", selectedCategory);
    };

    return (
        <div>
            <div className="aside">
                {/* Botão para adicionar tarefa que leva à página Add Task */}
                <Link to="/add-task">
                    <button className="aside-button">Add Task</button>
                </Link>
                {/* Dropdown menu para filtrar tarefas por usuário */}
                <div className="dropdown">
                    <select className="dropdown-select" onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">All Users</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    {/* Botão para filtrar tarefas pelo usuário selecionado */}
                    {selectedUser && (
                        <button className="filter-button" onClick={handleFilterByUser}>Filter</button>
                    )}
                </div>
                {/* Dropdown menu para filtrar tarefas por categoria */}
                <div className="dropdown">
                    <select className="dropdown-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    {/* Botão para filtrar tarefas pela categoria selecionada */}
                    {selectedCategory && (
                        <button className="filter-button" onClick={handleFilterByCategory}>Filter</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TasksAside;