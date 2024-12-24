export default function TaskList({ tasks, onDelete, onEdit }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2"
                >
                    <span>{task.text}</span>
                    <div>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 mx-1 rounded-lg"
                            onClick={() => onEdit(task.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded-lg"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
