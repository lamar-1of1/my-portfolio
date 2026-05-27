import { describe, expect, test } from "vitest";
import { projects } from "@/app/projects/projects";

describe("projects data", () => {
    test("contains at least one project", () => {
        expect(projects.length).toBeGreaterThan(0);
    });

    test("each project has required fields", () => {
        for (const project of projects) {
            expect(project.title.length).toBeGreaterThan(0);
            expect(project.category.length).toBeGreaterThan(0);
            expect(project.description.length).toBeGreaterThan(0);
            expect(project.techStack.length).toBeGreaterThan(0);
            expect(project.image.startsWith("https://")).toBe(true);
        }
    });
});
