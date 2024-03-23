import React from 'react';
import "../TaskCard/TaskCard.css";
import { taskStore } from '../../stores/TaskStore';


export default function TaskCard() {
    const title = taskStore.title;
    const description = taskStore.description;
    const priority = taskStore.priority;

    const getPriorityBorderClass = () => {
        switch (priority) {
            case "High":
                return "task-priority-high";
            case "Medium":
                return "task-priority-medium";
            case "Low":
                return "task-priority-low";
            default:
                return "";
        }
    }

    const priorityBorderClass = getPriorityBorderClass();


    return (
        <div className={`task ${priorityBorderClass}`}>
            <div className="task-title-solo">{title}</div>
            <div className="task-description-solo">{description}</div>
        </div>
    );
}