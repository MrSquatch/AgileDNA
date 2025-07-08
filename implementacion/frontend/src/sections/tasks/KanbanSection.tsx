import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from "react"
import { KanbanColumn } from "../../components/tasks/KanbanColumn"
import { TaskDragOverlay } from "../../components/tasks/TaskDragOverlay"
import { tasks as exampleTasks, developers } from "./data"
import type { Task } from "../../services"

type ColumnKey = "backlog" | "todo" | "inprogress" | "done"

// Inicializa todas las tareas en backlog
const initialTasks: Record<ColumnKey, Task[]> = {
  backlog: [...exampleTasks],
  todo: [],
  inprogress: [],
  done: [],
}

const columns: { key: ColumnKey; label: string }[] = [
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "Todo" },
  { key: "inprogress", label: "In Progress" },
  { key: "done", label: "Done" },
]

export function KanbanSection() {
    const [tasks, setTasks] = useState<Record<ColumnKey, Task[]>>(initialTasks)
    const [activeId, setActiveId] = useState<string | null>(null)

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id.toString())
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        setActiveId(null)
        if (!over || !active) return
        if (active.id === over.id) return

        let fromCol: ColumnKey | null = null, toCol: ColumnKey | null = null, task: Task | null = null
        for (const col of columns) {
            if (tasks[col.key].find((t: Task) => t.id.toString() === active.id.toString())) {
                fromCol = col.key
                task = tasks[col.key].find((t: Task) => t.id.toString() === active.id.toString()) || null
            }
            if (col.key === over.id) {
                toCol = col.key
            }
        }
        if (!fromCol || !toCol || !task) return
        if (fromCol === toCol) return

        setTasks((prev) => {
            const newFrom = prev[fromCol!].filter((t: Task) => t.id.toString() !== active.id.toString())
            const newTo = [...prev[toCol!], task!]
            return { ...prev, [fromCol!]: newFrom, [toCol!]: newTo }
        })
    }

    const activeTask = activeId ? Object.values(tasks).flat().find((t) => t.id.toString() === activeId) || null : null
    return(
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[90%]">
          {columns.map((col) => (
            <KanbanColumn
              key={col.key}
              title={col.label}
              columnId={col.key}
              tasks={tasks[col.key].map(t => ({
                ...t,
                id: t.id.toString(),
                title: t.name,
                description: `Esfuerzo: ${t.effort ?? "N/A"} | Prioridad: ${t.priority}`,
                task: t
              }))}
              activeId={activeId}
            />
          ))}
        </div>
        <DragOverlay>
          <TaskDragOverlay task={activeTask ? { ...activeTask, id: activeTask.id.toString(), title: activeTask.name, description: `Esfuerzo: ${activeTask.effort ?? "N/A"} | Prioridad: ${activeTask.priority}`, task: activeTask } : null} />
        </DragOverlay>
      </DndContext>
    )
}