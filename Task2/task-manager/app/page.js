'use client';

import { useState } from 'react';
import TaskList from './components/TaskList.js';
import TaskForm from './components/TaskForm.js';
import TaskProgress from './components/TaskProgress.js';
import TaskTimeline from './components/TaskTimeline.js';
import Calendar from './components/Calendar.js';

export default function Home() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Finish project' },
        { id: 2, text: 'Develop react native app' },
    ]);
    const progress = Math.round((tasks.length / 10) * 100);

    const addTask = (text) => {
        setTasks([...tasks, { id: Date.now(), text }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (id) => {
        const newText = prompt('Edit task:', tasks.find((task) => task.id === id).text);
        if (newText) {
            setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
        }
    };

    return (
      <div className="flex">
      <div className="w-1/3 p-4 bg-gray-100">
          <Calendar />
      </div>
      <div className="flex-grow p-4">
          {/* Add Task Section */}
          <div className="mb-4">
              <TaskForm onSubmit={addTask} />
          </div>
          {/* Task List Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2">Today's Tasks</h2>
              <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          </div>
          {/* Task Progress and Timeline Section */}
          <div className="flex justify-between gap-4 mt-4">
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                  <TaskProgress progress={progress} />
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                  <TaskTimeline />
              </div>
          </div>
      </div>
  </div>
  
    );
}
