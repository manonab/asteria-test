"use client";

import { DndContext } from "@dnd-kit/core";
import { useProject } from "@/queries";
import Xarrow from "react-xarrows";
import DraggableCard from "./DraggableCard";
import {useInitialPositions} from "@/hooks/useInitialPositions";

export default function DraggableTree() {
    const { data, isLoading, error } = useProject();
    const [positions, setPositions] = useInitialPositions(data);

    if (isLoading) return <p className="text-gray-500 text-center text-xl">Chargement...</p>;
    if (error) return <p className="text-red-500 text-center text-xl">Erreur lors du chargement des données.</p>;

    return (
        <DndContext
            onDragEnd={(event) => {
                const { active, delta } = event;
                setPositions((prev) => ({
                    ...prev,
                    [active.id]: {
                        x: (prev[active.id]?.x || 0) + delta.x,
                        y: (prev[active.id]?.y || 0) + delta.y,
                        zIndex: prev[active.id]?.zIndex || 1,
                    },
                }));
            }}
        >
            <div className="w-screen h-screen flex flex-col items-center justify-start overflow-hidden relative p-4">
                <div className="text-center text-xl my-2">PROJECT</div>
                <DraggableCard id="project" positions={positions} setPositions={setPositions}>
                    {data?.name}
                </DraggableCard>

                <div className="flex flex-row justify-between mt-6 gap-12">
                    {data?.technicalChallenges.map((challenge) => (
                        <div key={challenge.id} className="relative flex flex-col">
                            <Xarrow start="project" end={`challenge-${challenge.id}`} curveness={0.8} />
                            <DraggableCard id={`challenge-${challenge.id}`} positions={positions} setPositions={setPositions}>
                                {challenge.name}
                            </DraggableCard>
                            <div className="flex flex-col mt-6 gap-12">
                                {challenge.biologicalModels.map((model) => (
                                    <div key={model.id} className="relative flex flex-col bg-red-200">
                                        <Xarrow start={`challenge-${challenge.id}`} end={`model-${model.id}`} curveness={0.8} />
                                        <DraggableCard id={`model-${model.id}`} positions={positions} setPositions={setPositions}>
                                            {model.name}
                                        </DraggableCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    );
}