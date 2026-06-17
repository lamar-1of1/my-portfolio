import {
    Atom,
    Award,
    Box,
    Boxes,
    BriefcaseBusiness,
    Braces,
    Code,
    GraduationCap,
    LayoutGrid,
    Palette,
    Wind,
} from "lucide-react";
import { GithubIcon, Linkedin02Icon, NewTwitterIcon } from "hugeicons-react";

import { cardData } from "@/lib/content/projects";

export const featuredProjects = cardData.slice(0, 4).map((project, index) => ({
    ...project,
    outcome: [
        "Turned a complex product story into a focused digital narrative with clear sections, visual hierarchy, and a stronger conversion path.",
        "Designed a responsive interface system that makes team and service information easier to scan across desktop and mobile.",
        "Built a data-led experience pattern for presenting insights without losing warmth, pace, or editorial polish.",
        "Shaped a client-facing web flow around trust signals, fast discovery, and clean interaction moments.",
    ][index],
    techStack: [
        ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        ["React", "TypeScript", "Design Systems", "Figma"],
        ["Next.js", "Analytics UI", "API Design", "Accessibility"],
        ["React", "Content Strategy", "Responsive UI", "Performance"],
    ][index],
    liveUrl: "/projects/" + project.slug,
    githubUrl: "https://github.com/",
}));

export const aboutToolkit = [
    { label: "Next.js", icon: Box },
    { label: "React", icon: Atom },
    { label: "TypeScript", icon: Braces },
    { label: "Tailwind CSS", icon: Wind },
    { label: "Framer Motion", icon: Boxes },
    { label: "Figma", icon: Palette },
    { label: "Node.js", icon: Code },
    { label: "Design Systems", icon: LayoutGrid },
];

export const aboutJourney = [
    {
        icon: BriefcaseBusiness,
        period: "2023 - Present",
        title: "Product Designer / Frontend Developer",
        copy: "Shaping intuitive digital products from wireframe to launch, with a focus on structure, motion, and responsive craft.",
    },
    {
        icon: GraduationCap,
        period: "2021 - 2024",
        title: "UX/UI Design Foundation",
        copy: "Deepened my foundation in user-centered design, interface systems, and interaction principles.",
    },
    {
        icon: Award,
        period: "2020",
        title: "Graphic Design Graduate",
        copy: "Built an early creative foundation through visual systems, brand work, layout, and digital storytelling.",
    },
];

export const socialLinks = [
    { label: "GitHub", href: "#", icon: GithubIcon },
    { label: "Twitter", href: "#", icon: NewTwitterIcon },
    { label: "LinkedIn", href: "#", icon: Linkedin02Icon },
];
