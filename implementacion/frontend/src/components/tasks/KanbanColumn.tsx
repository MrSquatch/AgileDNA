import React from "react";
import { Droppable, Draggable } from "./index";
import { TaskCard } from "./TaskCard";
import type { TaskCardData } from "../../types/task";

interface Task extends TaskCardData {}

interface KanbanColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  activeId: string | number | null;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, columnId, tasks, activeId }) => (
  <div className="flex flex-col bg-zinc-800 rounded-lg p-3 min-h-[300px] h-[80%]">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="h-full overflow-y-scroll overflow-x-hidden">
      <Droppable id={columnId}>
        <div className="flex flex-col gap-2 min-h-[60px]">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-zinc-600 rounded bg-zinc-700/40 text-zinc-400">
              {/* PlusIcon se importa desde el padre para evitar dependencias cruzadas innecesarias */}
              <span className="text-2xl">+</span>
              <span className="text-xs mt-1">Mover aquí</span>
            </div>
          ) : (
            tasks.map((task) => (
              activeId == task.id ? null : (
                <Draggable key={task.id} id={task.id.toString()}>
                  <TaskCard title={task.title} description={task.description} task={task.task} />
                </Draggable>
              )
            ))
          )}
        </div>
      </Droppable>
    </div>
  </div>
); 