import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, Trash2, Plus, ListTodo } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(url + '/Tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
            <ListTodo size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gerenciador de Tarefas
          </h1>
          <p className="text-gray-600">
            Organize seu dia de forma simples e eficiente
          </p>
        </div>

        <form onSubmit={addTask} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicionar uma nova tarefa..."
              className="flex-1 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
            >
              Concluídas
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {pendingCount} tarefa{pendingCount !== 1 ? 's' : ''} pendente{pendingCount !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
            {tasks.length === 0
              ? 'Nenhuma tarefa ainda. Comece adicionando uma!'
              : 'Nenhuma tarefa corresponde ao filtro selecionado.'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-white p-5 rounded-xl shadow-sm border-l-4 flex items-center justify-between gap-4 transition-all ${task.state === "completed" ? 'border-green-500 opacity-80' : 'border-indigo-500'
                  }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="text-gray-400 hover:text-green-600 transition"
                  >                    
                    {task.state === "completed" ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  <span className={`flex-1 ${task.state === "completed" ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;