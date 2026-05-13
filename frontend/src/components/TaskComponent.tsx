import React from 'react';
import type { Task } from '../types';

interface TaskComponentProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskComponent: React.FC<TaskComponentProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`group flex items-center justify-between p-4 mb-3 rounded-2xl border transition-all duration-300 ${
      task.completed 
        ? 'bg-slate-50/50 border-slate-100' 
        : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed 
              ? 'bg-indigo-500 border-indigo-500 text-white' 
              : 'border-slate-300 hover:border-indigo-400'
          }`}
        >
          {task.completed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <span className={`text-lg transition-all duration-300 ${
          task.completed ? 'text-slate-400 line-through' : 'text-slate-700'
        }`}>
          {task.title}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
