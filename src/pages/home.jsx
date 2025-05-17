const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">New Task</h1>        
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            name="task"
            id="task"
            placeholder="Add a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 cursor-pointer">
            Add Task
          </button>
        </div>        
        <ul className="space-y-3">
        </ul>
      </div>
    </div>
  );
}

export default Home;