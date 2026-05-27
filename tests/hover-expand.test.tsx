import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { HoverExpand } from "@/components/features/projects/components/HoverExpand";

describe("HoverExpand", () => {
    test("renders project cards and button role", () => {
        render(
            <HoverExpand
                items={[
                    {
                        label: "Test Project",
                        sublabel: "Testing",
                        description: "Description for test project.",
                        techStack: ["React"],
                        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                    },
                ]}
            />
        );

        expect(screen.getByText("Test Project")).toBeDefined();
        expect(screen.getByRole("button")).toBeDefined();
    });
});
