import React, { useEffect } from "react";
import { useState } from "react";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import { categoryStore } from "../../stores/CategoryStore";
import { useNavigate } from "react-router-dom";
import "../EditTask/EditTask.css";

function EditTask() {
    const navigate = useNavigate();
    const { categories } = categoryStore(); // Obtém a lista de categorias
    const { task } = taskStore(); // Obtém a tarefa a ser editada
    const token = userStore((state) => state.token);

    const [taskDetails, setTaskDetails] = useState({
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        limitDate: task.limitDate,
        category: task.category.name,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setTaskDetails({ ...taskDetails, [name]: value });

        // Verifica se a data final é posterior à data inicial
        if (name === "startDate" && taskDetails.limitDate && value > taskDetails.limitDate) {
            setTaskDetails({ ...taskDetails, limitDate: value });
        } else if (name === "limitDate" && taskDetails.startDate && value < taskDetails.startDate) {
            setTaskDetails({ ...taskDetails, startDate: value });
        }
    };

    const handleSaveTask = async () => {
        const category = {
            name: taskDetails.category,
        }
        const updatedTask = {
            id: task.id,
            title: taskDetails.title,
            description: taskDetails.description,
            startDate: taskDetails.startDate,
            limitDate: taskDetails.limitDate,
            category: category,
        };

        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error updating task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        setTaskDetails({
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            limitDate: task.limitDate,
            category: task.category.name,
        });
    }
    , [task]);

    return (
        <div className="add-task">
            <div className="addTask-title">
                <div className="labels-addTask-top">
                    <label htmlFor="titulo-task">Title</label>
                </div>
                <div className="input-addTask-title">
                    <input type="text" id="titulo-task" name="title" value={taskDetails.title} onChange={handleInputChange} />
                </div>
            </div>
            <div className="addTask-description">
                <div className="labels-addTask-top">
                    <label htmlFor="descricao-task">Description</label>
                </div>
                <div className="input-addTask-description">
                    <textarea id="descricao-task" name="description" value={taskDetails.description} onChange={handleInputChange} />
                </div>
            </div>
            <div className="addTask-startDate">
                <div className="labels-addTask-top">
                    <label htmlFor="dataInicio-task">Start Date</label>
                </div>
                <div className="input-addTask-startDate">
                    <input type="date" id="dataInicio-task" name="startDate" value={taskDetails.startDate} onChange={handleDateChange} />
                </div>
            </div>
            <div className="addTask-limitDate">
                <div className="labels-addTask-top">
                    <label htmlFor="dataLimite-task">Limit Date</label>
                </div>
                <div className="input-addTask-limitDate">
                    <input type="date" id="dataLimite-task" name="limitDate" value={taskDetails.limitDate} onChange={handleDateChange} />
                </div>
            </div>
            <div className="addTask-category">
                <div className="labels-addTask-top">
                    <label htmlFor="categoria-task">Category</label>
                </div>
                <div className="input-addTask-category">
                    <select id="categoria-task" name="category" value={taskDetails.category} onChange={handleInputChange}>
                        <option value="">Choose category</option>
                        {categories && categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="save-button" onClick={handleSaveTask}>Save</button>
        </div>
    );
}

export default EditTask;