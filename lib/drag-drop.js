/**
 * Drag and drop utility functions
 * Handles drag events and data transfer operations
 */

/**
 * Handles drag start event
 * @param {DragEvent} event - Drag event
 * @param {Object} task - Task being dragged
 */
export const handleDragStart = (event, task) => {
  event.dataTransfer.setData("text/plain", JSON.stringify(task))
  event.dataTransfer.effectAllowed = "move"

  // Add visual feedback
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.opacity = "0.5"
  }
}

/**
 * Handles drag end event
 * @param {DragEvent} event - Drag event
 */
export const handleDragEnd = (event) => {
  // Reset visual feedback
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.style.opacity = "1"
  }
}

/**
 * Handles drag over event for drop zones
 * @param {DragEvent} event - Drag event
 */
export const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
}

/**
 * Handles drop event and extracts task data
 * @param {DragEvent} event - Drop event
 * @returns {Object|null} Task object or null if invalid
 */
export const handleDrop = (event) => {
  event.preventDefault()

  try {
    const taskData = event.dataTransfer.getData("text/plain")
    return JSON.parse(taskData)
  } catch (error) {
    console.error("Error parsing dropped task data:", error)
    return null
  }
}
