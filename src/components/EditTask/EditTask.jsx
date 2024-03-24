import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import { categoryStore } from "../../stores/CategoryStore";
import "../EditTask/EditTask.css";

function EditTask() {
    const navigate = useNavigate();
    const { categories } = categoryStore();
    const { taskId } = useParams();
    const token = userStore((state) => state.token);
    const task = taskStore((state) => state.tasks.find(task => task.id === taskId));
    console.log("token:", token);

    console.log("Task no edit task:", task);

    const [taskDetails, setTaskDetails] = useState({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "",
        startDate: task?.startDate || "",
        limitDate: task?.limitDate || "",
        category: task?.category ? task.category.name : "",
    });
    
    
    const [stateId, setStateId] = useState(task?.stateId || "");
    const [priority, setPriority] = useState(task?.priority || "");
   

    useEffect(() => {
        if (task) {
            setTaskDetails({
                title: task.title || "",
                description: task.description || "",
                priority: task.priority || "",
                startDate: task.startDate || "",
                limitDate: task.limitDate || "",
                category: task.category ? task.category.name : "",
            });
            setStateId(task?.stateId || "");
            setPriority(task?.priority || "");
        }
    }, [task]);


    console.log("stateId:", stateId);
    console.log("priority:", priority);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "category") {
            // Verifica se o valor da categoria não é uma string vazia antes de criar o objeto
            const category = value !== "" ? { name: value } : null;
            setTaskDetails({ ...taskDetails, category: category });
        } else {
            setTaskDetails({ ...taskDetails, [name]: value });
        }
    };
    
    
    
    

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        if (name === "startDate" && taskDetails.limitDate && value > taskDetails.limitDate) {
            // Se a nova data de início for posterior à data limite, atualize a data limite também
            setTaskDetails({
                ...taskDetails,
                startDate: value,
                limitDate: value // Define a data limite como a nova data de início
            });
        } else {
            setTaskDetails({ ...taskDetails, [name]: value });
        }
    };
    console.log("category:", taskDetails.category)
    console.log("taskDetails:", taskDetails);
    const handleSaveTask = async () => {
        try {
            // Atualiza a tarefa no backend usando o endpoint correto
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/updatetask/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify(taskDetails),
            });

            if (response.ok) {
                // Se a atualização for bem-sucedida, navega de volta para a página inicial
                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error updating task:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


        // Função para lidar com a alteração do status da tarefa
        const handlestateClick = (stateId) => {
            setStateId(stateId);
        };
    
        // Função para lidar com a alteração da prioridade da tarefa
        const handlePriorityClick = (priority) => {
            setPriority(priority);
        };

    return (
        <div className="edit-task">
            <div className="editTask-title">
                <div className="labels-editTask-top">
                    <label htmlFor="titulo-task">Title</label>
                </div>
                <div className="input-editTask-title">
                    <input type="text" id="titulo-task" name="title" value={taskDetails.title} onChange={handleInputChange} />
                </div>
            </div>
            <div className="editTask-description">
                <div className="labels-editTask-top">
                    <label htmlFor="descricao-task">Description</label>
                </div>
                <div className="input-editTask-description">
                    <textarea id="descricao-task" name="description" value={taskDetails.description} onChange={handleInputChange} />
                </div>
            </div>
            <div className="task-state">
                        <div className="field-titles">
                            <h4 className="taskH4" id="state-h4">Status</h4>
                        </div>
                        <div className="state-buttons">
                            <button className={`state-button todo ${stateId === 100 ? "selected" : ""}`} id="todo-button" onClick={() => handlestateClick(100)} >To Do</button>
                            <button className={`state-button doing ${stateId === 200 ? "selected" : ""}`} id="doing-button" onClick={() => handlestateClick(200)} >Doing</button>
                            <button className={`state-button done ${stateId === 300 ? "selected" : ""}`} id="done-button" onClick={() => handlestateClick(300)} >Done</button>
                        </div>
            </div>
            <div className="task-priority">
                        <div className="field-titles">
                            <h4 className="taskH4" id="priority-h4">Priority</h4>
                        </div>
                        <div className="priority-buttons">
                            <button className={`priority-button low ${priority === 100 ? "selected" : ""}`} id="low-button" onClick={() => handlePriorityClick(100)} >Low</button>
                            <button className={`priority-button medium ${priority === 200 ? "selected" : ""}`} id="medium-button" onClick={() => handlePriorityClick(200)} >Medium</button>
                            <button className={`priority-button high ${priority === 300 ? "selected" : ""}`} id="high-button" onClick={() => handlePriorityClick(300)} >High</button>
                        </div>
            </div>
            <div className="dates">
                        <div className="field-titles">
                            <h4 className="taskH4" id="dates-h4">Dates</h4>
                        </div>
                        <div className="label-dates-edit">
                                <label htmlFor="startDate-editTask" className="label-start-date" >Start date:</label>
                        </div>
                        <div className="input-dates">
                                <input type="date" id="startDate-editTask" name="startDate" value={taskDetails.startDate} onChange={handleDateChange} />
                        </div>
                        <div className="label-dates-edit">
                                <label htmlFor="endDate-editTask">End date:</label>
                        </div>
                        <div className="input-dates">
                                <input type="date" id="endDate-editTask" name="limitDate" value={taskDetails.limitDate} onChange={handleDateChange} />
                        </div>
                    </div>
                    <div className="category">
                        <div className="field-titles">
                            <h4 className="taskH4">Category</h4>
                        </div>
                        <div className="div-dropdown">
                            <select id="task-category-edit" name="category" value={taskDetails.category} onChange={handleInputChange} required >
                                <option value="" disabled>
                                    Choose an option
                                </option>
                                {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="task-save">
                        <button className="save-button" id="save-button" onClick={handleSaveTask} >Edit Task</button>
                        <button className="cancel-button" id="cancel-button" onClick={() => navigate("/home")} >Cancel</button>
                    </div>
                </div>
    );
}

export default EditTask;