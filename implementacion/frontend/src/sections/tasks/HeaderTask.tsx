import { PlusIcon } from "../../icons";

export function HeaderTask() {
    return(
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tablero de tareas</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-primary/80 transition-colors">
          <PlusIcon />
          Nueva tarea
        </button>
      </header>
    )
}