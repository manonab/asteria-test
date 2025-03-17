import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {useDraggable} from "@dnd-kit/core";
import {cardPropsByType, CardType} from "@/types/Cards";

interface DraggableCardProps {
    id: string;
    children: ReactNode;
    positions: { [key: string]: { x: number; y: number } };
    cardType: CardType;
    editableProps?: { isEditable?: boolean, isChallenge?: boolean, showButton?: boolean };
    onUpdateName?: (newName: string) => void;
    onAddModel?: () => void;
    title?: string;
}

export default function DraggableCard({ id, children, positions, cardType, editableProps = {}, onUpdateName, onAddModel, title
                                      }: DraggableCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        setName(typeof children === "string" ? children : "Edit Biological model");
    }, [children]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            if (onUpdateName) onUpdateName(name);
        }
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        if (onUpdateName) onUpdateName(name);
    };

    const { bgColor } = cardPropsByType[cardType];


    const renderEditableName = isEditing ? (
        <input
            type="text"
            value={name}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            autoFocus
            className="p-1 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    ) : (
        <span
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (editableProps?.isEditable) setIsEditing(true);
            }}
            className="cursor-text select-text block w-full hover:cursor-grab"
            {...listeners}
        >
            {name}
        </span>
    );

    const renderAddModelButton = editableProps?.isChallenge && editableProps.showButton && onAddModel && (
        <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onAddModel}
            className="mt-4 text-blue-800 hover:cursor-pointer"
        >
            +Add Biological Model
        </button>
    );

    return (
        <div
            id={id}
            ref={setNodeRef}
            {...attributes}
            style={{
                position: "absolute",
                left: `${positions[id]?.x || 0}px`,
                top: `${positions[id]?.y || 0}px`,
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
            }}
            className={`p-2 shadow-lg rounded-xl w-64 text-center z-50 text-sm ${bgColor}`}
        >
            <div className="text-center text-md font-semibold text-gray-900">{title}</div>
            {renderEditableName}
            {renderAddModelButton}
        </div>
    );
}
