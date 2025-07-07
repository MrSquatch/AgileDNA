import { useDraggable } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';

export function Draggable({children, id}: {children: React.ReactNode, id: string}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id})

    const style = {
        transform: CSS.Transform.toString(transform),
    }

    return(
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </button>
    )
}