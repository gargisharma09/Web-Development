import React, { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import TaskFilter from "./components/TaskFilter";
import "./style.css";
import './App.css';



export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks on first render
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks every time tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add
  const addTask = () => {
    if (!newTask || newTask.trim() === "") return;
    setTasks(prev => [...prev, { text: newTask.trim(), completed: false }]);
    setNewTask("");
  };

  // Toggle complete
  const toggleTask = (index) => {
    setTasks(prev => {
      const copy = [...prev];
      copy[index].completed = !copy[index].completed;
      return copy;
    });
  };

  // Delete
  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  // Edit
  const editTask = (index, newText) => {
    if (!newText || newText.trim() === "") return;
    setTasks(prev => {
      const copy = [...prev];
      copy[index].text = newText.trim();
      return copy;
    });
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Simple task counter (human touch)
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyTasks</h1>
        <p className="tagline">Plan your day — one step at a time</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="meta-row">
        <TaskFilter filter={filter} setFilter={setFilter} />
        <div className="counter">{pendingCount} pending</div>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-text">No tasks to show — add one above.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        )}
      </ul>

      {tasks.length > 0 && (
        <div className="bottom-row">
          <button
            className="clear-btn"
            onClick={() => {
              if (confirm("Clear all tasks?")) setTasks([]);
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
