import { DndContext } from "@dnd-kit/core";
import { useProject } from "@/queries";
import Xarrow from "react-xarrows";
import DraggableCard from "./DraggableCard";
import { Project } from "@/types/schema";
import {useBiologicalModel} from "@/hooks/useBiologicalModel";
import {CardType} from "@/types/Cards";

export default function DraggableTree() {
    const { data, isLoading, error } = useProject<Project>();
    const { projectData, positions, addOrUpdateModel, setPositions } = useBiologicalModel(data || undefined || null);

    if (isLoading) return <p className="text-gray-500 text-center text-xl">Chargement...</p>;
    if (error) return <p className="text-red-500 text-center text-xl">Erreur lors du chargement des données.</p>;
    if (!projectData) return <p className="text-gray-500 text-center text-xl">Aucune donnée disponible.</p>;

    return (
        <DndContext
            onDragEnd={(event) => {
                const { active, delta } = event;
                setPositions((prev) => ({
                    ...prev,
                    [active.id]: {
                        x: (prev[active.id]?.x || 0) + delta.x,
                        y: (prev[active.id]?.y || 0) + delta.y,
                    },
                }));
            }}
        >
            <div className="w-screen h-screen flex flex-col items-center justify-start overflow-auto relative p-4">
                <DraggableCard id="project" positions={positions} cardType={CardType.PROJECT} title="Project">
                    {projectData.name}
                </DraggableCard>

                <div className="flex flex-row justify-between mt-6 gap-12">
                    {projectData.technicalChallenges.map((challenge) => (
                        <div key={challenge.id} className="relative flex flex-col items-center">
                            <Xarrow start="project" end={`challenge-${challenge.id}`} curveness={0.8} />
                            <DraggableCard
                                id={`challenge-${challenge.id}`}
                                positions={positions}
                                title="Technical Challenge"
                                cardType={CardType.TECHNICAL_CHALLENGE}
                                editableProps={{ isEditable: false, isChallenge: true, showButton: true }}
                                onUpdateName={(newName) => console.log("Updated name:", newName)}
                                onAddModel={() => addOrUpdateModel(challenge.id, null, null)}
                            >
                                {challenge.name}
                            </DraggableCard>

                            <div className="flex flex-col mt-6 gap-12">
                                {challenge.biologicalModels.map((model) => (
                                    <div key={model.id} className="relative flex flex-col">
                                        <Xarrow start={`challenge-${challenge.id}`} end={`model-${model.id}`} curveness={0.8} />
                                        <DraggableCard
                                            title="Biological Model"
                                            id={`model-${model.id}`}
                                            positions={positions}
                                            cardType={CardType.BIOLOGICAL_MODEL}
                                            editableProps={{
                                                isEditable: true,
                                                isChallenge: false,
                                                showButton: false,
                                            }}
                                            onUpdateName={(newName) => addOrUpdateModel(challenge.id, model.id, newName)}
                                        >
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
