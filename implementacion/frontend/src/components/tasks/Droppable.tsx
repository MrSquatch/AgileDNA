import { useDroppable } from "@dnd-kit/core"

export function Droppable({children, id}: {children: React.ReactNode, id: string}) {
    const {isOver, setNodeRef} = useDroppable({id})

    const style = { 
        color: isOver ? '' : undefined,
        border: isOver ? '1px solid #323232' : '1px solid transparent'
    }

    return(
        <div ref={setNodeRef} className={`flex flex-col gap-4 ${isOver ? 'bg-primary/10' : ''}`} style={style}>
            {children}
        </div>
    )
}