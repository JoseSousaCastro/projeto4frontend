import React, { useEffect } from "react";
import { useState } from "react";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import { categoryStore } from "../../stores/CategoryStore";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

function AddTask() {
    const navigate = useNavigate();
    const [priority, setPriority] = useState("");
    const [categories, setCategories] = useState([]);
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: "",
        category: "",
    });

    useEffect(() => {
        // Aqui você deve buscar as categorias da CategoryStore
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:8080/project_backend/rest/users/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: userStore((state) => state.token),
                    },
                });
                if (response.ok) {
                    const categoriesData = await response.json();
                    setCategories(categoriesData);
                } else {
                    console.error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []); // Este efeito só deve executar uma vez, então deixamos o array de dependências vazio



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handlePriorityClick = (priority) => {
        setPriority(priority);
    };

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setTaskDetails({ ...taskDetails, [name]: value });
        
        // Verifica se a data final é posterior à data inicial
        if (name === "startDate" && taskDetails.endDate && value > taskDetails.endDate) {
            setTaskDetails({ ...taskDetails, endDate: value });
        } else if (name === "endDate" && taskDetails.startDate && value < taskDetails.startDate) {
            setTaskDetails({ ...taskDetails, startDate: value });
        }
    };

    const handleSaveTask = async (event) => {
        event.preventDefault();
        const username = userStore((state) => state.username);
        const newTask = {
            title: taskDetails.title,
            description: taskDetails.description,
            priority: taskDetails.priority,
            startDate: taskDetails.startDate,
            endDate: taskDetails.endDate,
            category: taskDetails.category,
        };

        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/${username}/addTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: userStore((state) => state.token),
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const task = await response.json();
                taskStore.getState().addTask(task);
                navigate("/home");
            } else {
                const responseBody = await response.text();
                console.error("Error adding task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="add-task">
            <div className="detalhes-task">
                <div>
                    <label htmlFor="titulo-task">Title</label>
                    <input
                        type="text"
                        id="titulo-task"
                        name="title"
                        value={taskDetails.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="descricao-task">Description</label>
                    <textarea
                        className="text-task"
                        id="descricao-task"
                        name="description"
                        value={taskDetails.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="task-save">
                    <button
                        className="save-button"
                        id="save-button"
                        onClick={handleSaveTask}
                    >
                        Save
                    </button>
                    <button
                        className="cancel-button"
                        id="cancel-button"
                        onClick={() => navigate("/home")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="task-buttons">
                <div className="status-and-priority">
                    <div className="task-priority">
                        <h4 className="taskH4">priority</h4>
                        <div className="priority-buttons">
                            <button
                                className={`priority-button low ${priority === "Low" ? "selected" : ""}`}
                                id="low-button"
                                onClick={() => handlePriorityClick("Low")}
                            >
                                Low
                            </button>
                            <button
                                className={`priority-button medium ${priority === "Medium" ? "selected" : ""}`}
                                id="medium-button"
                                onClick={() => handlePriorityClick("Medium")}
                            >
                                Medium
                            </button>
                            <button
                                className={`priority-button high ${priority === "High" ? "selected" : ""}`}
                                id="high-button"
                                onClick={() => handlePriorityClick("High")}
                            >
                                High
                            </button>
                        </div>
                    </div>
                    <div className="dates">
                        <h4 className="taskH4">Dates</h4>
                        <div className="startDateDiv">
                            <label
                                htmlFor="startDate-editTask"
                                className="label-start-date"
                            >
                                Start date:
                            </label>
                            <input
                                type="date"
                                id="startDate-editTask"
                                name="startDate"
                                value={taskDetails.startDate}
                                onChange={handleDateChange}
                            />
                            <label htmlFor="endDate-editTask">End date:</label>
                            <input
                                type="date"
                                id="endDate-editTask"
                                name="endDate"
                                value={taskDetails.endDate}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className="category">
                        <h4 className="taskH4">Category</h4>
                        <div id="div-dropdown">
                            <select
                                id="task-category-edit"
                                name="category"
                                value={taskDetails.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>
                                    Category
                                </option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
