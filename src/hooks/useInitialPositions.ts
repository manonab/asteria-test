import { useEffect, useState } from "react";
import {BiologicalModel, Project, TechnicalChallenge} from "@/queries/schema";

interface Position {
    x: number;
    y: number;
    zIndex?: number;
}

interface Positions {
    [key: string]: Position;
}

export const useInitialPositions = (data?: Project) => {
    const [positions, setPositions] = useState<Positions>({});

    useEffect(() => {
        if (!data) return;

        const initialPositions: Positions = {};
        const startY = 100;
        const spacingX = 600;
        const spacingY = 10;

        initialPositions["project"] = { x: 600, y: startY, zIndex: 1 };

        data.technicalChallenges.forEach((challenge: TechnicalChallenge, index) => {
            const challengeX = -100 + (index - (data.technicalChallenges.length - 1) / 2) * spacingX;
            initialPositions[`challenge-${challenge.id}`] = {
                x: challengeX,
                y: startY + spacingY,
                zIndex: 2,
            };

            challenge.biologicalModels.forEach((model: BiologicalModel, subIndex) => {
                initialPositions[`model-${model.id}`] = {
                    x: challengeX + (subIndex - (challenge.biologicalModels.length - 1) / 2) * 300 * 0.6,
                    y: startY + 120 * 2 + subIndex * 60,
                    zIndex: 3,
                };
            });
        });

        setPositions(initialPositions);
    }, [data]);

    return [positions, setPositions] as const;
};
