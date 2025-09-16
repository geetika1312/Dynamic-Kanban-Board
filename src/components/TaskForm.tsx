/**
 * TaskForm component for creating new tasks
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task } from '../types';
import { generateId } from '../utils/dragDrop';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            <textarea
              placeholder="Task description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setDescription('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;