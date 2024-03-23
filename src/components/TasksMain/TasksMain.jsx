import React from "react";
import { useState, useEffect } from "react";
import "../TasksMain/TasksMain.css";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import TaskCard from "../TaskCard/TaskCard";

function TasksMain() {
    const [tasks, setTasks] = useState([]);
    const [tasksDoing, setTasksDoing] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);

    const token = userStore((state) => state.token);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                
                const response = await fetch("http://localhost:8080/project_backend/rest/users/tasks/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data.filter(task => task.stateId === "TODO"));
                    setTasksDoing(data.filter(task => task.stateId === "DOING"));
                    setTasksDone(data.filter(task => task.stateId === "DONE"));
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
    }, [token]);

    return (
        <div className="tasks-users-list" id="tasks-users-list-outer-container">
            <div className="page-wrap-task-list" id="tasks-users-list-page-wrap">
                <div className="task-section">
                    <div className="titulo-main">
                        <h2 className="main-home">To do</h2>
                    </div>
                    <div className="panel" id="todo">
                        {tasks.filter(task => task.stateId === "TODO").map(task => (
                            <div className="task-card-taskMain">
                                <TaskCard task={task} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="task-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Doing</h2>
                    </div>
                    <div className="panel" id="doing">
                        {tasks.filter(task => task.stateId === "DOING").map(task => (
                        <div className="task-card-taskMain">
                            <TaskCard task={task} />
                        </div>
                        ))}
                    </div>
                </div>
                <div className="task-section">
                    <div className="titulo-main">
                        <h2 className="main-home">Done</h2>
                    </div>
                    <div className="panel" id="done">
                        {tasks.filter(task => task.stateId === "DONE").map(task => (
                        <div className="task-card-taskMain">
                            <TaskCard task={task} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksMain;