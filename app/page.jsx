/**
 * Main page component
 * Entry point for the Kanban Board application
 */

import { KanbanBoard } from "@/components/kanban-board"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <KanbanBoard />
    </main>
  )
}
