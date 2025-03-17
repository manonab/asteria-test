"use client";
import { useQuery } from "@tanstack/react-query";
import {Project, ProjectSchema} from "@/types/schema";

const fetchProject = async (): Promise<Project> => {
    const res = await fetch("https://technical-test-866419219838.europe-west3.run.app/projects/1");

    if (!res.ok) {
        throw new Error("Erreur lors du fetch des données");
    }

    const json = await res.json();
    return ProjectSchema.parse(json);
};

export const useProject = () => {
    return useQuery<Project>({
        queryKey: ["project"],
        queryFn: fetchProject,
    });
};