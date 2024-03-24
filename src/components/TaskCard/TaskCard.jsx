import React from 'react';
import "../TaskCard/TaskCard.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../stores/UserStore';
import { taskStore } from '../../stores/TaskStore';

export default function TaskCard({ task }) {
    const navigate = useNavigate();
    const { fetchTasks } = taskStore();
    const taskId = task.id;
    const { id, title, description, priority, erased } = task;
    const token = userStore((state) => state.token);

    // Traduzindo a prioridade de int para string
    const translatePriority = (priorityInt) => {
        switch (priorityInt) {
            case 100:
                return "Low";
            case 200:
                return "Medium";
            case 300:
                return "High";
            default:
                return "";
        }
    }

    const priorityString = translatePriority(priority);

    const getPriorityBorderClass = () => {
        switch (priorityString) {
            case "High":
                return "border-red";
            case "Medium":
                return "border-yellow";
            case "Low":
                return "border-green";
            default:
                return "";
        }
    }

    const priorityBorderClass = getPriorityBorderClass();

    const handleEraseTask = async () => {
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
            });

            if (response.ok) {
                fetchTasks();
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error deleting task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/delete/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
            });

            if (response.ok) {
                fetchTasks();
                navigate("/tasks-deleted", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error deleting task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleRestoreTask = async () => {
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
            });

            if (response.ok) {
                fetchTasks();
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error deleting task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className={`task ${priorityBorderClass}`}>
            <Link to={`/edit-task/${id}`} className="task-title-solo">
                {title}
            </Link>
            <div className="task-description-solo">{description}</div>
            {erased ? (
                <div className="task-del-restore">
                    <div className="task-restore">
                        <img src="multimedia/reload1-03.png" alt="Restore" className="restore-icon" onClick={handleRestoreTask} />
                    </div>
                    <div className="task-delete">
                        <img src="multimedia/dark-cross-01.png" alt="Delete" className="delete-icon" onClick={handleDeleteTask} />
                    </div>
                </div>
            ) : (
                <div className="task-erase">
                    <img src="multimedia/dark-cross-01.png" alt="Erase" className="erase-icon" onClick={handleEraseTask} />
                </div>
            )}
        </div>
    );
}