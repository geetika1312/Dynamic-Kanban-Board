/**
 * KanbanBoard component - Main board containing all columns
 */

import React from 'react';
import type { Task, TaskStatus, Column as ColumnType } from '../types';
import Column from './Column';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (taskId: string, title: string, description: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove, onTaskDelete, onTaskEdit }) => {
  // Column configuration
  const columns: ColumnType[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-100 text-gray-700',
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100 text-green-700',
    },
  ];

  // Group tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={tasksByStatus[column.id] || []}
          onTaskMove={onTaskMove}
          onTaskDelete={onTaskDelete}
          onTaskEdit={onTaskEdit}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;