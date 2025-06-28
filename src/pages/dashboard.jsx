import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoItem from "../components/todo_item";
import Modal from "../components/modal";

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [modifiedTasks, setModifiedTasks] = useState([]);
  const [status, setStatus] = useState('all')
  const [showModal, setShowModal] = useState("");  
  const [deleteId, setDeleteId] = useState();
  const [completedTask, setCompletedTask] = useState();
  const url = `${import.meta.env.VITE_API_URL}/Tasks`;
  const filterTasks = (newStatus) => {
    setStatus(newStatus)
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
        setModifiedTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const myTasks = [...tasks];
    const filteredTask = myTasks.filter((task) => {
      if (status === "all") {
        return true;
      } else if (status === "true") {
        return task.state === "true";
      } else if (status === "false") {
        return task.state === "false";
      }
    });
    setModifiedTasks(filteredTask);
  }, [status]);

  const onComplete = (id) => {        
    setShowModal("complete");    
    setCompletedTask(id);
  }

  const onDelete = (id) => {
    setShowModal("delete");
    setDeleteId(id);    
  }

    const handleComplete = (taskId) => {
      
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: "true" }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Task completed successfully");
        setShowModal("")
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
    fetchData();
  }

  const handleDelete = (taskId) => {    
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${taskId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Task deleted successfully");
        setShowModal("");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
    fetchData();
  }


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
            {modifiedTasks.map((task) => (<TodoItem 
              key={task.id} 
              task={task} 
              onDelete={(id) => onDelete(id)} 
              onComplete={(id) => onComplete(id)} />))}
          </tbody>
        </table>

        {showModal === "complete" && 
        <Modal
          onConfirm={() => handleComplete(completedTask)}
          onCancel={() => setShowModal("")}
        />}

        {showModal === "delete" && (
          <Modal
            onConfirm={() => handleDelete(deleteId)}
            onCancel={() => setShowModal("")}
          />
        )}
      </main>
    </div>
  )
}
export default Dashboard;