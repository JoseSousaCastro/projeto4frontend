import React from "react";
import { useState } from "react";
import "./TaskCols.css"

export default function TaskCols({ state }) {
    return (
        <div>
        <div>
            <h2>To Do</h2>
            {state.todo.map((task, index) => (
            <div key={index}>
                <p>{task}</p>
            </div>
            ))}
        </div>
        <div>
            <h2>Doing</h2>
            {state.inProgress.map((task, index) => (
            <div key={index}>
                <p>{task}</p>
            </div>
            ))}
        </div>
        <div>
            <h2>Done</h2>
            {state.done.map((task, index) => (
            <div key={index}>
                <p>{task}</p>
            </div>
            ))}
        </div>
        </div>
    );
}