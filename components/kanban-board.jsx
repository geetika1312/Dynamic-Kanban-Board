/**
 * Main Kanban board component
 * Orchestrates the entire board functionality and state management
 */

"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "./task-form"
import { KanbanColumn } from "./kanban-column"
import { getTasks, saveTasks, generateId } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Trash2, BarChart3 } from "lucide-react"

export function KanbanBoard() {
  const [tasks, setTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = getTasks()
    setTasks(loadedTasks)
    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks)
    }
  }, [tasks, isLoaded])

  /**
   * Adds a new task to the "To Do" column
   */
  const handleAddTask = (title, description) => {
    const newTask = {
      id: generateId(),
      title,
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  /**
   * Moves a task to a different column
   */
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  /**
   * Deletes a task from the board
   */
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const handleClearAllTasks = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([])
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Filter tasks by status for each column
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Dynamic Kanban Board</h1>
        </div>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Organize your tasks efficiently with drag-and-drop functionality. Create, move, and track your progress across
          different stages.
        </p>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{todoTasks.length}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{doneTasks.length}</div>
            <div className="text-sm text-gray-600">Done</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAllTasks}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Tasks
          </Button>
        </div>
      </div>

      {/* Task Creation Form */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
        <KanbanColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={inProgressTasks}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          title="Done"
          status="done"
          tasks={doneTasks}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  )
}
