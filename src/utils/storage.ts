/**
 * Local storage utilities for persisting kanban board data
 */

import type { Task } from '../types';

const STORAGE_KEY = 'kanban-tasks';

/**
 * Saves tasks to localStorage
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

/**
 * Loads tasks from localStorage
 */
export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored);
    // Convert date strings back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
};

/**
 * Clears all tasks from localStorage
 */
export const clearTasks = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error);
  }
};