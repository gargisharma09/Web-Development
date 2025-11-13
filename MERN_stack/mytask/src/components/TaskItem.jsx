import React from "react";

export default function TaskItem({ task, index, toggleTask, deleteTask }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={() => toggleTask(index)}>{task.text}</span>
      <button onClick={() => deleteTask(index)}>❌</button>
    </li>
  );
}
