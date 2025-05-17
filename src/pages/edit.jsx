import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/form/input";
import TextArea from "../components/form/text_area";

const Edit = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleTitle = (e) => { setTitle(e.target.value) }
  const handleDescription = (e) => { setDescription(e.target.value) }
  const handlePriority = (e) => { setPriority(e.target.value) }
  const { id } = useParams();

  useEffect(() => {
    const getTask = async () => {
      const url = `${import.meta.env.VITE_API_URL}/Tasks`;
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTask(data);
        setTitle(data.title);
        setDescription(data.description);
        setPriority(data.priority);        
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }
    getTask();
  }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      const url = `${import.meta.env.VITE_API_URL}/Tasks`;
      const updateTask = async () => {
        try {
          const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              priority,
            }),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          alert("Task updated successfully");
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
      updateTask();
      navigate("/"); 
    }
  return (
    <>
      <Link to="/">
        <button className="bg-blue-500 m-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
          Back to Dashboard
        </button>
      </Link>
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-gray-500 mb-4">
          Edit the task details below. Make sure to save your changes.
        </p>
        <header className="bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
        </header>
        <main className="bg-white shadow-md rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              value={title}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
              onChange={handleTitle}
            />
            <TextArea
              name={"description"}
              value={description}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
              onChange={handleDescription}
              rows={4}
            />
            <Input
              type="text"
              name="priority"
              value={priority}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
              onChange={handlePriority} />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Edit;