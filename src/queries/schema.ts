import { z } from "zod";

export const BiologicalModelSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const TechnicalChallengeSchema = z.object({
    id: z.number(),
    name: z.string(),
    biologicalModels: z.array(BiologicalModelSchema),
});

export const ProjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    technicalChallenges: z.array(TechnicalChallengeSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
export type TechnicalChallenge = z.infer<typeof TechnicalChallengeSchema>;
export type BiologicalModel = z.infer<typeof BiologicalModelSchema>;
