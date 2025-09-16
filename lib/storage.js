/**
 * Storage utility module for localStorage operations
 * Provides storage wrapper with error handling
 */

const STORAGE_KEY = "kanban-tasks"

/**
 * Retrieves tasks from localStorage
 * @returns Array of tasks or empty array if none found
 */
export const getTasks = () => {
  try {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error retrieving tasks from localStorage:", error)
    return []
  }
}

/**
 * Saves tasks to localStorage
 * @param {Array} tasks - Array of tasks to save
 */
export const saveTasks = (tasks) => {
  try {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

/**
 * Generates a unique ID for new tasks
 * @returns {string} Unique string ID
 */
export const generateId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
