export default function TaskProgress({ progress }) {
    return (
        <section className="bg-white p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Task Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-2">{progress}% completed</p>
        </section>
    );
}
