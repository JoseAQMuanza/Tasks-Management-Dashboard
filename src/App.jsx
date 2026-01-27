import { useState, useEffect } from 'react';

import { CheckCircle, Circle, Trash2, Plus, ListTodo } from 'lucide-react';
import { useApp } from './lib/use-app';

function App() {

  const {
    tasks,
    filteredTasks, pendingCount,
    newTask, setNewTask,
    filter, setFilter,
    fetchTasks, addTask,
    deleteTask, toggleComplete,

  } = useApp();

  useEffect(() => {

    fetchTasks();
  }, []);

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