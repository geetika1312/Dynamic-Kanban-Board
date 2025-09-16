/**
 * Column component for kanban board columns
 */

import React from 'react';
import type { Task, TaskStatus, Column as ColumnType } from '../types';
import TaskCard from './TaskCard';
import { parseDragData } from '../utils/dragDrop';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (taskId: string, title: string, description: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onTaskMove, onTaskDelete, onTaskEdit }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set drag over to false if we're leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const dragData = parseDragData(e.dataTransfer);
    if (!dragData) return;

    // Don't move if dropping in the same column
    if (dragData.sourceColumn === column.id) return;

    onTaskMove(dragData.taskId, column.id);
  };

  const getColumnIcon = () => {
    switch (column.id) {
      case 'todo':
        return '📝';
      case 'inprogress':
        return '⚡';
      case 'done':
        return '✅';
      default:
        return '📋';
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`bg-gray-50 rounded-lg p-4 h-full transition-all duration-200 ${
          isDragOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Column Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg">{getColumnIcon()}</span>
          <h2 className="font-semibold text-gray-800">{column.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${column.color}`}>
            {tasks.length}
          </span>
        </div>

        {/* Tasks */}
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onTaskDelete}
              onEdit={onTaskEdit}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-3xl mb-2">
                {column.id === 'todo' ? '👋' : column.id === 'inprogress' ? '🚀' : '🎉'}
              </div>
              <p className="text-sm">
                {column.id === 'todo' && 'Drop tasks here to get started'}
                {column.id === 'inprogress' && 'Drag tasks here when working on them'}
                {column.id === 'done' && 'Completed tasks will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;