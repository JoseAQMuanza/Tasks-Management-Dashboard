import { useNavigate } from "react-router-dom";
import Button from "./form/button";

export default function TodoItem({ task }) {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_URL}/Tasks`;
  
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
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
    fetchData();
    navigate("/");
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
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
    fetchData();
    navigate("/");
  }

  const submitEdit = (itemId) => {
    navigate("/edit/" + itemId);    
  }


  return (
    <>
      {task.state === "true" ? (
        <tr key={task.id} className="border-t">
          <td className="p-3">{task.title}</td>
          <td className="p-3">{task.description}</td>
          <td className="p-3">{task.priority}</td>
          <td className="p-3">            
            <Button text="Delete" color="text-red-500" onClick={(taskId) => handleDelete(task.id)} />
          </td>
        </tr>
      ) : (
        <tr key={task.index} className="border-t">
          <td className="p-3">{task.title}</td>
          <td className="p-3">{task.description}</td>
          <td className="p-3">{task.priority}</td>
          <td className="p-3">
            <Button text={"Edit"} color="text-blue-500" onClick={(itemId) => submitEdit(task.id)} />
            <Button text={"Complete"} color="text-yellow-500" onClick={(taskId) => handleComplete(task.id)} />
            <Button text={"Delete"} color="text-red-500" onClick={(taskId) => handleDelete(task.id)} />
          </td>
        </tr>
      )}
    </>
  );
}