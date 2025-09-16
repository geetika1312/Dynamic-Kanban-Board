/**
 * Kanban column component
 * Represents a single column (To Do, In Progress, Done) with drag-drop functionality
 */

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { handleDragOver, handleDrop } from "@/lib/drag-drop"
import { useState } from "react"
import { FileText, Zap, CheckCircle } from "lucide-react"

export function KanbanColumn({ title, status, tasks, onMoveTask, onDeleteTask }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOverColumn = (e) => {
    handleDragOver(e)
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDropOnColumn = (e) => {
    const droppedTask = handleDrop(e)
    setIsDragOver(false)

    if (droppedTask && droppedTask.status !== status) {
      onMoveTask(droppedTask.id, status)
    }
  }

  // Get status-specific styling
  const getColumnStyles = () => {
    switch (status) {
      case "todo":
        return "border-l-4 border-l-blue-500"
      case "in-progress":
        return "border-l-4 border-l-yellow-500"
      case "done":
        return "border-l-4 border-l-green-500"
      default:
        return ""
    }
  }

  const getColumnIcon = () => {
    switch (status) {
      case "todo":
        return <FileText className="h-5 w-5 text-red-500" />
      case "in-progress":
        return <Zap className="h-5 w-5 text-orange-500" />
      case "done":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const getEmptyMessage = () => {
    if (status === "in-progress") {
      return "Drag tasks here when working on them"
    }
    return "Drag tasks here or create new ones"
  }

  return (
    <div className="flex-1 min-w-0">
      <Card
        className={`h-full ${getColumnStyles()} ${
          isDragOver ? "bg-accent/10 border-accent" : ""
        } transition-colors duration-200`}
        onDragOver={handleDragOverColumn}
        onDragLeave={handleDragLeave}
        onDrop={handleDropOnColumn}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getColumnIcon()}
              {title}
            </div>
            <span className="text-sm font-normal bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{tasks.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-600">{getEmptyMessage()}</p>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />)
          )}
        </CardContent>
      </Card>
    </div>
  )
}
