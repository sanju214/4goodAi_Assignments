import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            onSubmit(task);
            setTask(''); // Clear the input field
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 flex-grow"
            />
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
                Save
            </button>
        </form>
    );
}
