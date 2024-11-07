// Dashboard.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskChart from './TaskChart';
import TaskForm from './TaskForm';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskTime = (id, newTime) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, timeSpent: newTime } : task
    ));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section task-form">
        <h2>Create New Task</h2>
        <TaskForm addTask={addTask} />
      </div>

      <div className="dashboard-section task-list">
        <h2>Task List</h2>
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          updateTaskTime={updateTaskTime} 
          editTask={editTask} 
        />
      </div>

      <div className="dashboard-section task-chart">
        <h2>Tasks Trend</h2>
        <TaskChart tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
