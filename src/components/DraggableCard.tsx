import {Dispatch, ReactNode, SetStateAction} from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableCardProps {
    id: string;
    children: ReactNode;
    positions: { [key: string]: { x: number; y: number } };
    setPositions: Dispatch<SetStateAction<{ [key: string]: { x: number; y: number } }>>;
}

export default function DraggableCard({ id, children, positions }: DraggableCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    return (
        <div
            id={id}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                position: "absolute",
                left: `${positions[id]?.x || 0}px`,
                top: `${positions[id]?.y || 0}px`,
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
            }}
            className="p-2 bg-white text-sm shadow-lg rounded-xl cursor-grab active:cursor-grabbing w-64 text-center z-50"
        >
            {children}
        </div>
    );
}
