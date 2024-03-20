/* Add task - aside button
Filter tasks by user - aside dropdown
Filter tasks by category - aside dropdown */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TasksAside.css";
import { userStore } from "../../stores/UserStore";
import { categoryStore } from "../../stores/CategoryStore";

function TasksAside() {
    const { users } = userStore(); // Obtém a lista de usuários
    const { categories } = categoryStore(); // Obtém a lista de categorias
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const deleteAllUserTasks = userStore((state) => state.deleteAllUserTasks);
    const filterTasksByUser = userStore((state) => state.filterTasksByUser);
    const filterTasksByCategory = userStore((state) => state.filterTasksByCategory);



    const handleFilterByUser = async (event) => {
        event.preventDefault();

        const username = selectedUser;
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/${username}/tasks` , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: userStore((state) => state.token),
                },
            });
            if (response.ok) {
                const tasks = await response.json();
                filterTasksByUser(tasks);
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error filtering tasks by user:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error filtering tasks by user:", error);
        }
    };


    const handleFilterByCategory  = async (event) => {
        event.preventDefault();

        const category = selectedCategory;
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/tasks/${category}` , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: userStore((state) => state.token),
                },
            });
            if (response.ok) {
                const tasks = await response.json();
                filterTasksByCategory(tasks);
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error filtering tasks by category:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error filtering tasks by category:", error);
        }
    }

    const handleDeleteAllUserTasks = async (event) => {
        event.preventDefault();

        const username = selectedUser;
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/eraseAllTasks/${username}` , {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: userStore((state) => state.token),
                },
            });
            if (response.ok) {
                const tasks = await response.json();
                deleteAllUserTasks(tasks);
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error deleting all user tasks:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error deleting all user tasks:", error);
        }
    }

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
                        <option value="">Choose user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    {/* Botão para filtrar tarefas pelo usuário selecionado */}
                    {selectedUser && (
                        <button className="filter-button" onClick={handleFilterByUser}>Filter</button>
                    )}
                    {/* Botão para deletar todas as tarefas do usuário selecionado */}
                    {selectedUser && (
                        <button className="delete-all-user-tasks" onClick={handleDeleteAllUserTasks}>Delete All Tasks</button>
                    )}
                </div>
                {/* Dropdown menu para filtrar tarefas por categoria */}
                <div className="dropdown">
                    <select className="dropdown-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Choose category</option>
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