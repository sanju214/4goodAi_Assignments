export default function TaskTimeline() {
    return (
        <section className="bg-white p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Task Timeline</h2>
            <ul>
                <li className="my-2">🟢 Morning: Plan the day</li>
                <li className="my-2">🟠 Afternoon: Work on projects</li>
                <li className="my-2">🔴 Evening: Review tasks</li>
            </ul>
        </section>
    );
}
