import React from 'react';
import "../TaskCard/TaskCard.css";

export default function TaskCard({ task }) {
    const { title, description, priority } = task;

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

    return (
        <div className={`task ${priorityBorderClass}`}>
            <div className="task-title-solo">{title}</div>
            <div className="task-description-solo">{description}</div>
        </div>
    );
}
