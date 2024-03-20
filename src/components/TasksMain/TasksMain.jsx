import React from "react";
import { useState, useEffect } from "react";
import "../TasksMain/TasksMain.css";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";

function TasksMain() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                
                const response = await fetch("http://localhost:8080/project_backend/rest/users/tasks/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: userStore((state) => state.token),                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                    // Adiciona as tarefas à store
                    data.forEach(task => taskStore.getState().addTask(task));
                } else {
                    console.error("Failed to fetch tasks:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="tasks-users-list" id="tasks-users-list-outer-container">
            <div className="page-wrap" id="tasks-users-list-page-wrap">
                <div className="titulo-main">
                    <h2 className="main-home">To do</h2>
                    <div className="panel" id="todo">
                        {tasks.filter(task => task.stateId === "TODO").map(task => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                    </div>
                </div>
                <div className="titulo-main">
                    <h2 className="main-home">Doing</h2>
                    <div className="panel" id="doing">
                        {tasks.filter(task => task.stateId === "DOING").map(task => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                    </div>
                </div>
                <div className="titulo-main">
                    <h2 className="main-home">Done</h2>
                    <div className="panel" id="done">
                        {tasks.filter(task => task.stateId === "DONE").map(task => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksMain;