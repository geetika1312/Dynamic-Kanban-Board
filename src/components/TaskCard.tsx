/**
 * TaskCard component for individual task display and drag functionality
 */

import React from 'react';
import { Clock, GripVertical, Edit2, Save, X } from 'lucide-react';
import type { Task } from '../types';
import { createDragData, formatDate } from '../utils/dragDrop';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, title: string, description: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(task.title);
  const [editDescription, setEditDescription] = React.useState(task.description);

  const handleDragStart = (e: React.DragEvent) => {
    // Prevent drag when editing
    if (isEditing) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.setData('text/plain', createDragData(task.id, task.status));
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    setTimeout(() => {
      (e.target as HTMLElement).classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).classList.remove('opacity-50');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  return (
    <div
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 group ${
        isEditing ? 'cursor-default ring-2 ring-blue-200' : 'cursor-move'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-gray-400 group-hover:text-gray-600 transition-colors duration-200 mt-1 ${
          isEditing ? 'opacity-50' : ''
        }`}>
          <GripVertical size={16} />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full font-medium text-gray-900 mb-2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <h3 className="font-medium text-gray-900 mb-2 break-words">
              {task.title}
            </h3>
          )}
          
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Task description (optional)..."
              rows={2}
              className="w-full text-gray-600 text-sm mb-3 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          ) : (
            task.description && (
              <p className="text-gray-600 text-sm mb-3 break-words">
                {task.description}
              </p>
            )
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(task.createdAt)}
            </div>
            
            <div className="flex items-center gap-1">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={!editTitle.trim()}
                    className="text-green-500 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 p-1"
                    title="Save changes"
                  >
                    <Save size={14} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                    title="Cancel editing"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                    className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 transition-all duration-200 p-1"
                    title="Edit task"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 p-1"
                    title="Delete task"
                  >
                    <X size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;