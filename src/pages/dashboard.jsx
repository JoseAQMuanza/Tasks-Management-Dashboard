import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/form/button";
import TodoItem from "../components/todo_item";

const Dashboard = () => {
  const [copyTasks, setCopyTasks] = useState([]);
  const [tasks, setTasks] = useState([])
  const url = "http://localhost:3000/Tasks"

    const filterTasks = (status) => {
      switch (status) {
        case "all":
          setTasks(copyTasks);
          break
        case "true":             
          setTasks(copyTasks.filter((task) => task.state === "true"));          
          break
        case "false":          
          setTasks(copyTasks.filter((task) => task.state === "false"));              
          break;
      }
    };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
        setCopyTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks Management Dashboard</h1>
      </header>

      <main className="bg-white shadow-md rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Tasks</h2>
          <select
            className="border border-gray-300 rounded-md px-3 py-2"
            onChange={(e) => filterTasks(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
          <Link to="/new_user">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              Add Task
            </button>
          </Link>
        </div>

        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left"></th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (<TodoItem key={task.id} task={task} />))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
export default Dashboard;