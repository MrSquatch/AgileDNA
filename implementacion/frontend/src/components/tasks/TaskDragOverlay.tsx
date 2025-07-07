import React from "react";
import { TaskCard } from "./TaskCard";
import type { TaskCardData } from "../../types/task";

interface Task extends TaskCardData {}

interface TaskDragOverlayProps {
  task: Task | null;
}

export const TaskDragOverlay: React.FC<TaskDragOverlayProps> = ({ task }) => {
  if (!task) return null;
  return (
    <TaskCard
      title={task.title}
      description={task.description}
      task={task.task}
      className="h-auto shadow-2xl scale-105 cursor-grabbing border border-zinc-500 opacity-90 transition-all duration-150"
    />
  );
}; 