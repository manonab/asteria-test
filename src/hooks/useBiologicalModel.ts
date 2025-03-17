import {useEffect, useState} from "react";
import { Project } from "@/types/schema";
import { useInitialPositions } from "@/hooks/useInitialPositions";

export const useBiologicalModel = (data: Project | null) => {
    const [projectData, setProjectData] = useState<Project | undefined>(data);
    const [positions, setPositions] = useInitialPositions(data || undefined);
    const updateProjectData = (updateFn: (data: Project) => Project) => {
        setProjectData((prevData) => (prevData ? updateFn(prevData) : undefined));
    };

    useEffect(() => {
        if (data) {
            setProjectData(data);
        }
    }, [data]);

    const addOrUpdateModel = (challengeId: number, modelId: number | null, newName: string | null) => {
        updateProjectData((prevData) => {
            return {
                ...prevData,
                technicalChallenges: prevData.technicalChallenges.map((challenge) =>
                    challenge.id === challengeId
                        ? {
                            ...challenge,
                            biologicalModels: modelId
                                ? challenge.biologicalModels.map((model) =>
                                    model.id === modelId ? { ...model, name: newName! } : model
                                )
                                : [...challenge.biologicalModels, { id: Date.now(), name: "Edit Biological Model" }],
                        }
                        : challenge
                ),
            };
        });

        if (!modelId) {
            setPositions((prevPositions) => {
                const challengePosition = prevPositions[`challenge-${challengeId}`] || { x: 600, y: 500 };
                const existingModels = Object.keys(prevPositions).filter((key) =>
                    key.startsWith(`model-`) && prevPositions[key].x === challengePosition.x
                ).length;
                const newY = challengePosition.y + 150 + existingModels * 120;

                return {
                    ...prevPositions,
                    [`model-${Date.now()}`]: { x: challengePosition.x, y: newY },
                };
            });
        }
    };

    return {
        projectData,
        setProjectData,
        positions,
        setPositions,
        addOrUpdateModel,
    };
};
