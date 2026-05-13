import { useState, useEffect } from 'react';
import type{ Task, CreateTaskInput } from './types';
import { getStorageData, isTask } from './types';
import { TaskForm } from './components/TaskForm';
import { TaskComponent } from './components/TaskComponent';

function App() {
  // Initialize state from localStorage with type-safe generic utility
  const [tasks, setTasks] = useState<Task[]>(() => 
    getStorageData<Task[]>('ts_tasks', [])
  );

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ts_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (input: CreateTaskInput) => {
    const newTask: Task = {
      id: Date.now(),
      title: input.title,
      completed: false,
    };
    
    // Demonstrate Type Guard before adding
    if (isTask(newTask)) {
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Task<span className="text-indigo-600">Flow</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Manage your productivity with TypeScript precision.
          </p>
        </header>

        {/* Stats Card */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-slate-800">{tasks.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Completed</p>
            <p className="text-3xl font-bold text-indigo-600">
              {completedCount} <span className="text-slate-300 text-xl">/ {tasks.length}</span>
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <main className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-2xl shadow-indigo-500/10">
          <TaskForm onAdd={addTask} />

          <div className="space-y-1">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskComponent 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask} 
                  onDelete={deleteTask} 
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium italic">No tasks yet. Start by adding one above!</p>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center text-slate-400 text-sm font-medium">
          <p>Built with React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
