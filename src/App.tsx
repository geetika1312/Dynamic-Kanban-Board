/**
 * Main App component - Dynamic Kanban Board
 * Manages state, persistence, and coordinates all components
 */

import React, { useState, useEffect } from 'react';
import { Trello, RotateCcw } from 'lucide-react';
import type { Task, TaskStatus } from './types';
import { saveTasks, loadTasks, clearTasks } from './utils/storage';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  /**
   * Adds a new task to the board
   */
  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  /**
   * Moves a task to a different status column
   */
  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      )
    );
  };

  /**
   * Deletes a task from the board
   */
  const handleTaskDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  /**
   * Edits an existing task
   */
  const handleTaskEdit = (taskId: string, title: string, description: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, title, description, updatedAt: new Date() }
          : task
      )
    );
  };
  /**
   * Clears all tasks from the board
   */
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      clearTasks();
      setTasks([]);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your kanban board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Trello className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Dynamic Kanban Board
            </h1>
          </div>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Organize your tasks efficiently with drag-and-drop functionality. 
            Create, move, and track your progress across different stages.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{totalTasks}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{todoTasks}</div>
              <div className="text-sm text-gray-600">To Do</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-gray-600">Done</div>
            </div>
          </div>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round((completedTasks / totalTasks) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Actions */}
          {totalTasks > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <RotateCcw size={16} />
              Clear All Tasks
            </button>
          )}
        </header>

        {/* Task Creation Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Kanban Board */}
        <KanbanBoard
          tasks={tasks}
          onTaskMove={handleTaskMove}
          onTaskDelete={handleTaskDelete}
          onTaskEdit={handleTaskEdit}
        />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Drag and drop tasks between columns to update their status. 
            Your progress is automatically saved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;