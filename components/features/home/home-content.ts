import { Atom, BriefcaseBusiness, GraduationCap } from "lucide-react";
import {
    GithubIcon,
    NewTwitterIcon,
    VisualStudioCodeIcon,
} from "hugeicons-react";

import { cardData } from "@/lib/content/projects";
import {
    FigmaIcon,
    NextJsIcon,
    NodeJsIcon,
    TailwindCssIcon,
    TypeScriptIcon,
} from "./brand-icons";

export const featuredProjects = cardData.slice(0, 4).map((project, index) => ({
    ...project,
    outcome: [
        "Turned a complex product story into a focused digital narrative with clear sections, visual hierarchy, and a stronger conversion path.",
        "Designed a responsive interface system that makes team and service information easier to scan across desktop and mobile.",
        "Built a data-led experience pattern for presenting insights without losing warmth, pace, or editorial polish.",
        "Shaped a client-facing web flow around trust signals, fast discovery, and clean interaction moments.",
    ][index],
    liveUrl: "/projects/" + project.slug,
    githubUrl: "https://github.com/",
}));

export const aboutToolkit = [
    { label: "Next.js", icon: NextJsIcon },
    { label: "React", icon: Atom },
    { label: "TypeScript", icon: TypeScriptIcon },
    { label: "Tailwind CSS", icon: TailwindCssIcon },
    { label: "Figma", icon: FigmaIcon },
    { label: "Node.js", icon: NodeJsIcon },
    { label: "GitHub", icon: GithubIcon },
    { label: "VS Code", icon: VisualStudioCodeIcon },
];

export const aboutJourney = [
    {
        icon: GraduationCap,
        period: "2020 - 2020",
        title: "Web Development Summer Workshop",
        copy: "Gained a practical introduction to frontend development, covering HTML, CSS, JavaScript, and the basics of building and deploying websites.",
        via: "Caribbean Science Foundation (CSF).",
        href: "https://caribbeanscience.org/",
    },
    // {
    //     icon: Award,
    //     period: "2020",
    //     title: "Graphic Design Graduate",
    //     copy: "Built an early creative foundation through visual systems, brand work, layout, and digital storytelling.",
    // },
    {
        icon: BriefcaseBusiness,
        period: "2025 - Present",
        title: "Web Coordinator & Fullstack Developer",
        copy: "Assisted with the design and development of a new public-facing website for the District Emergency Organisation (DEO), focused on community engagement, disaster preparedness, and cultural preservation.",
    },
];

export const socialLinks = [
    { label: "GitHub", href: "#", icon: GithubIcon },
    { label: "Twitter", href: "#", icon: NewTwitterIcon },
    // { label: "LinkedIn", href: "#", icon: Linkedin02Icon },
];
