import { useNavigate } from "react-router-dom";
import Input from "./input";
import Select from "./select";
import TextArea from "./text_area";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");  
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_API_URL}`;

  const handleTitle = (e) => { setTitle(e.target.value) }
  const handleDescription = (e) => { setDescription(e.target.value) }
  const handlePriority = (e) => { setPriority(e.target.value) }


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${url}/Priority`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
    fetchOptions();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const addUser = async () => {
      const id = uuidv4();
      if (priority === undefined) {
        alert("Please select a priority");
        return;
      }

      try {
        const response = await fetch(`${url}/Tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            state: "false",
            title,
            description,
            priority,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        alert("Task added successfully");
        navigate("/");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
    addUser();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-gray-500 mb-4">
          create a new task below.
        </p>
        <header className="bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Task</h1>
        </header>
        <main className="bg-white shadow-md rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              onChange={handleTitle}
              value={title}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
              placeholder="Enter title"
            />

            <TextArea
              name="description"
              value={description}
              onChange={handleDescription}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
              placeholder="Enter description"
              rows="4" />

            <Select
              name="priority"
              options={options}
              onChange={handlePriority}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none" />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              Submit
            </button>
          </form>
        </main>
      </div>    
    </>
  );
};

export default Form;