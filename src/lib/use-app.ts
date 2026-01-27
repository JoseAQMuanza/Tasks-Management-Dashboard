import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function useApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const url = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const response = await fetch(url + '/Tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  async function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;

    const id = uuidv4();
    const task = {
      id: id,
      title: newTask.trim(),
      state: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(url + '/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      setTasks([task, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error)
    }    
  };

  async function toggleComplete(id) {
    const response = await fetch(url + `/Tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: tasks.find(task => task.id === id).state === "completed" ? "pending" : "completed"
      }),
    });
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, state: task.state === "completed" ? "pending" : "completed" };
      }
      return task;
    }));
  };

  async function deleteTask(id) {
      const confirmDelete = window.confirm("Tem certeza que deseja deletar esta tarefa?");
      if (!confirmDelete) return;
      try {
        const response = await fetch(url + `/Tasks/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`Erro ao deletar tarefa: ${response.status}`);
        }
  
        setTasks(tasks.filter(task => task.id !== id));
  
        alert("Tarefa deletada com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao deletar a tarefa.");
      }
    }
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.state !== "completed";
    if (filter === 'completed') return task.state === "completed";
    return true;
  });

  const pendingCount = tasks.filter(t => t.state !== "completed").length;

  return {
    tasks, setTasks,
    filteredTasks, pendingCount,
    newTask, setNewTask,
    filter, setFilter,
    fetchTasks, addTask,
    deleteTask, toggleComplete,

  }
}