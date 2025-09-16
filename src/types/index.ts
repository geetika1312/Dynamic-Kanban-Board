/**
 * Type definitions for the Kanban Board application
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export interface DragData {
  taskId: string;
  sourceColumn: TaskStatus;
}