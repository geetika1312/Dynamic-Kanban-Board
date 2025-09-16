/**
 * Individual task card component
 * Displays task information and handles drag events
 */

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical } from "lucide-react"
import { handleDragStart, handleDragEnd } from "@/lib/drag-drop"

export function TaskCard({ task, onDeleteTask }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task.id)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card
      className="mb-3 cursor-move transition-all duration-200 hover:shadow-md border-border bg-card"
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <CardTitle className="text-sm font-semibold text-gray-900 line-clamp-2">{task.title}</CardTitle>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>⏰</span>
              {formatDate(task.createdAt)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 line-clamp-3">{task.description}</p>
        </CardContent>
      )}
    </Card>
  )
}
