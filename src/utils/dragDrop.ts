/**
 * Drag and drop utility functions
 */

import type { DragData } from '../types';

/**
 * Creates drag data for transfer during drag operations
 */
export const createDragData = (taskId: string, sourceColumn: string): string => {
  const dragData: DragData = { taskId, sourceColumn: sourceColumn as any };
  return JSON.stringify(dragData);
};

/**
 * Parses drag data from drop event
 */
export const parseDragData = (dataTransfer: DataTransfer): DragData | null => {
  try {
    const data = dataTransfer.getData('text/plain');
    return JSON.parse(data) as DragData;
  } catch (error) {
    console.error('Failed to parse drag data:', error);
    return null;
  }
};

/**
 * Generates a unique ID for tasks
 */
export const generateId = (): string => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formats date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};