import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./form/button";

export default function TodoItem({ task, onDelete, onComplete }) {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_URL}/Tasks`;

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
            <Button text={"Delete"} color="text-red-500" onClick={(taskId) => onDelete(task.id)} />
          </td>
        </tr>
      ) : (
        <tr key={task.index} className="border-t">
          <td className="p-3">{task.title}</td>
          <td className="p-3">{task.description}</td>
          <td className="p-3">{task.priority}</td>
          <td className="p-3">
            <Button text={"Edit"} color="text-blue-500" onClick={(itemId) => submitEdit(task.id)} />
            <Button text={"Complete"} color="text-yellow-500" onClick={(taskId) => onComplete(task.id)} />
            <Button text={"Delete"} color="text-red-500" onClick={(taskId) => onDelete(task.id)} />
          </td>
        </tr>
      )}
    </>
  );
}