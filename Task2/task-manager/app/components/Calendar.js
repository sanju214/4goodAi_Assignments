export default function Calendar() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'long' });

    return (
        <aside className="w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2 text-center">Calendar</h2>
            <h3 className="text-gray-700 font-semibold text-center mb-4">{currentMonth}</h3>
            <div className="grid grid-cols-7 gap-4 place-items-center">
                {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    return (
                        <div
                            key={day}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                day === currentDay
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
