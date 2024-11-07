import React, { useState, useEffect } from 'react';

const TaskList = ({ tasks, deleteTask, updateTaskTime, editTask }) => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timers, setTimers] = useState({}); // Store time for each task separately
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    let interval;
    if (activeTimer !== null) {
      // Start counting time if a task is being timed
      interval = setInterval(() => {
        setTimers((prevTimers) => ({
          ...prevTimers,
          [activeTimer]: (prevTimers[activeTimer] || 0) + 1,
        }));
      }, 1000);
    } else {
      clearInterval(interval); 
    }
    return () => clearInterval(interval); 
  }, [activeTimer]);

  const handleStartTimer = (taskId) => {
    setActiveTimer(taskId); // Set active task for tracking
  };

  const handleStopTimer = (taskId) => {
    updateTaskTime(taskId, timers[taskId] || 0); // Update the task's time spent
    setActiveTimer(null); 
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task); 
  };

  const handleSaveEdit = () => {
    editTask(editedTask); // Update the task with new details
    setEditingTaskId(null);
    setEditedTask({});
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask({});
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          {editingTaskId === task.id ? (
            <div>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                placeholder="Task Title"
              />
              <input
                type="text"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="text"
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                placeholder="Priority"
              />
              <input
                type="text"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                placeholder="Status"
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Time Spent:</strong> {Math.floor((timers[task.id] || 0) / 60)}:{(timers[task.id] || 0) % 60 < 10 ? `0${(timers[task.id] || 0) % 60}` : (timers[task.id] || 0) % 60}</p>
              <div className="task-time-tracker">
                {activeTimer === task.id ? (
                  <button onClick={() => handleStopTimer(task.id)}>Stop Timer</button>
                ) : (
                  <button onClick={() => handleStartTimer(task.id)}>Start Timer</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                <button onClick={() => handleEditClick(task)}>Edit Task</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
