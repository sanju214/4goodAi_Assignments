export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">TaskMaster</h1>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="bg-gray-700 text-white px-4 py-2 rounded-md"
                />
            </header>
            <main className="flex flex-grow">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2024 TaskMaster. All rights reserved.
            </footer>
        </div>
    );
}
