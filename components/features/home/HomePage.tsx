"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Disc3,
    Download,
    LayoutGrid,
    Layers3,
    Music2,
    PenTool,
    Radio,
    Sparkles,
    TerminalSquare,
    UserRoundCheck,
} from "lucide-react";
import { GithubIcon, Linkedin02Icon, NewTwitterIcon } from "hugeicons-react";

// import { aboutCopy, aboutStats } from "@/lib/content/about";
import { cardData } from "@/lib/content/projects";
// import { workExperience } from "@/lib/content/workExperience";
import { Scales } from "@/components/visual/Scales";
import Beams from "@/components/visual/Beams";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const contentStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.08,
        },
    },
};

const slideUp = (direction: number): Variants => ({
    hidden: {
        opacity: 0,
        y: 14 * (direction >= 0 ? 1 : -1),
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: easeCurve,
        },
    },
});

const featuredProjects = cardData.slice(0, 4).map((project, index) => ({
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
    liveUrl: "/projects",
    githubUrl: "https://github.com/",
}));

const skillGroups = [
    {
        title: "Frontend",
        icon: Layers3,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend",
        icon: TerminalSquare,
        skills: [
            "Node.js",
            "API routes",
            "Auth flows",
            "Database modeling",
            "Performance",
        ],
    },
    {
        title: "Design",
        icon: PenTool,
        skills: [
            "Figma",
            "Design systems",
            "Interaction design",
            "Prototyping",
            "Visual polish",
        ],
    },
];

const musicNotes = [
    "Soca and dancehall energy",
    "R&B details and atmosphere",
    "Afrobeats rhythm",
    "Lo-fi focus sessions",
];

const socialLinks = [
    { label: "GitHub", href: "#", icon: GithubIcon },
    { label: "Twitter", href: "#", icon: NewTwitterIcon },
    { label: "LinkedIn", href: "#", icon: Linkedin02Icon },
];

function getProjectStatusClass(status: string) {
    if (status.toLowerCase() === "new") {
        return "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";
    }

    if (status.toLowerCase().includes("progress")) {
        return "border-amber-400/25 bg-amber-400/10 text-amber-200";
    }

    return "border-white/10 bg-white/[0.035] text-zinc-300";
}

function SectionHeading({
    kicker,
    title,
    summary,
}: {
    kicker: string;
    title: string;
    summary?: string;
}) {
    return (
        <div className="mb-8 md:mb-10">
            <div className="border-y border-dashed border-white/10 bg-[#111111] px-5 py-4 md:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                        <p className="truncate text-sm font-medium text-white">{kicker}</p>
                    </div>
                    <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:inline">
                        Section
                    </span>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                {summary ? (
                    <p className="max-w-md text-sm leading-6 text-zinc-400 md:text-base">
                        {summary}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export function HomePage() {
    // const currentRole = workExperience[0];
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const activeProject = featuredProjects[activeProjectIndex];
    const activeProjectNumber = (activeProjectIndex + 1)
        .toString()
        .padStart(2, "0");
    const variants = slideUp(direction);

    const goToProject = (nextIndex: number) => {
        setDirection(nextIndex > activeProjectIndex ? 1 : -1);
        setActiveProjectIndex(nextIndex);
    };

    const goToPreviousProject = () => {
        setDirection(-1);
        setActiveProjectIndex((current) =>
            current === 0 ? featuredProjects.length - 1 : current - 1,
        );
    };
    const goToNextProject = () => {
        setDirection(1);
        setActiveProjectIndex((current) =>
            current === featuredProjects.length - 1 ? 0 : current + 1,
        );
    };

    return (
        <div className="relative overflow-hidden bg-black text-white selection:bg-white selection:text-black pt-24 md:pt-28">
            <section className="relative z-[45] -mx-8 -mt-24 min-h-dvh overflow-hidden bg-black md:-mt-28">
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />
                    <div className="absolute inset-x-0 top-0 h-[520px] overflow-hidden md:left-5 md:right-5 md:h-[600px]">
                        <div className="absolute inset-0 opacity-30 md:hidden">
                            <Beams
                                beamWidth={2.5}
                                beamHeight={24}
                                beamNumber={12}
                                lightColor="#ffffff"
                                speed={1.7}
                                noiseIntensity={1.55}
                                scale={0.18}
                                rotation={18}
                            />
                        </div>
                        <div className="absolute inset-0 hidden opacity-45 md:block">
                            <Beams
                                beamWidth={3}
                                beamHeight={30}
                                beamNumber={20}
                                lightColor="#ffffff"
                                speed={2}
                                noiseIntensity={1.75}
                                scale={0.2}
                                rotation={30}
                            />
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),#000_82%)]" />
                </div>

                <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-8 pb-12 pt-28 md:px-12 md:pb-16 md:pt-36 lg:px-16">
                    <header className="relative overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.04)]">
                        {/* <div className="pointer-events-none absolute left-5 top-0 h-full border-l border-dashed border-white/10" /> */}
                        {/* <div className="pointer-events-none absolute right-5 top-0 h-full border-l border-dashed border-white/10" /> */}

                        <div className="relative">
                            <div className="flex min-h-14 flex-col items-start justify-between gap-5 border-b border-dashed border-white/10 px-4 py-6 text-sm font-medium text-zinc-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-7">
                                <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1.5 text-xs font-medium normal-case text-emerald-300">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    Available for projects
                                </span>
                                <div className="flex flex-wrap items-center gap-2 text-zinc-300 sm:gap-3">
                                    {/* <span className="text-white">Lamar</span>
                                    <span className="text-white/25">|</span> */}
                                    <Image
                                        src="/flag_bb.svg.svg"
                                        alt="Barbados flag"
                                        width={32}
                                        height={32}
                                        className="h-4 w-6 border border-white/15 object-cover"
                                    />
                                    <span>Barbados</span>
                                    {/* <span className="hidden text-white/25 sm:inline">/</span> */}
                                    {/* <span className="hidden sm:inline">246</span> */}
                                </div>
                            </div>

                            <div className="relative grid min-h-[180px] sm:min-h-[210px] md:grid-cols-[minmax(0,1fr)_14rem] lg:grid-cols-[minmax(0,1fr)_16rem]">
                                <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-4 sm:p-5 md:border-r md:p-6">
                                    <div>
                                        <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">
                                            Who am I?
                                        </p>
                                        <h1 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
                                            Product designer and frontend developer.
                                        </h1>
                                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                                            Building polished portfolio systems, product pages, and
                                            interactive web experiences.
                                        </p>
                                    </div>
                                    <nav
                                        aria-label="Social links"
                                        className="mt-8 flex items-center gap-3"
                                    >
                                        {socialLinks.map((social) => {
                                            const Icon = social.icon;

                                            return (
                                                <Link
                                                    key={social.label}
                                                    href={social.href}
                                                    aria-label={social.label}
                                                    className="group/social flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                                >
                                                    <Icon
                                                        size={18}
                                                        className="transition-transform duration-300"
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                                {/*
                                <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-5 md:border-b-0 md:border-r md:p-6">
                                    <p className="text-xs font-semibold uppercase text-zinc-500">
                                        Focus
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Next.js", "React", "Motion", "Design Systems"].map((item) => (
                                            <span
                                                key={item}
                                                className="border border-white/10 bg-white/[0.025] px-2.5 py-1 text-xs font-medium text-zinc-300"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div> */}

                                <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-4 sm:p-5 md:p-6">
                                    <p className="text-xs font-semibold uppercase text-zinc-500">
                                        Get in touch
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-start gap-3 md:mt-0 md:flex-col">
                                        <a
                                            href="/cv.pdf"
                                            download
                                            className="inline-flex min-w-[7.75rem] items-center justify-between gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] md:w-full"
                                        >
                                            Resume
                                            <Download size={15} />
                                        </a>
                                        <Link
                                            href="#featured-projects"
                                            className="inline-flex min-w-[8.25rem] items-center justify-between gap-3 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 md:w-full"
                                        >
                                            View work
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">
                                    Volume
                                </span>
                                <LayoutGrid size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight">
                                    50+ Projects
                                </div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Shipped globally across enterprise platforms, custom APIs, and
                                    standalone web products.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">
                                    Retention
                                </span>
                                <UserRoundCheck size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight flex items-baseline gap-2">
                                    100%{" "}
                                    <span className="text-xs font-mono text-emerald-500 bg-emerald-950/50 border border-emerald-900/60 px-1.5 py-0.5 rounded">
                                        PASSED
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Maintained perfect client assessment outcomes backed by fluid,
                                    clear production support workflows.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">
                                    Volume
                                </span>
                                <LayoutGrid size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight">
                                    50+ Projects
                                </div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Shipped globally across enterprise platforms, custom APIs, and
                                    standalone web products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div
                aria-hidden="true"
                className="relative -mx-3 overflow-hidden border-y border-dashed border-white/10 bg-black py-3 md:py-4"
            >
                <Scales
                    orientation="diagonal"
                    size={8}
                    className="opacity-35"
                    color="color-mix(in oklab, var(--color-white) 8%, transparent)"
                />
                {/* <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-white/10" /> */}
                {/* <div className="pointer-events-none absolute left-1/2 top-0 h-full border-l border-dashed border-white/10" /> */}
                <div className="relative left-1/2 flex min-w-full -translate-x-1/2 items-center justify-center gap-2 px-0 md:gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Image
                            key={index}
                            src="/assets/brand-social-preview-Photoroom1.png"
                            alt=""
                            width={320}
                            height={213}
                            className="h-16 w-24 shrink-0 object-contain opa/city-45 grayscale contrast-125 brightness-75 md:h-20 md:w-32"
                        />
                    ))}
                </div>
            </div>

            <section
                id="featured-projects"
                className="relative z-20 mx-auto max-w-7xl bg-black px-0 py-14 md:px-8 md:py-16 lg:px-12"
            >
                <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-28 md:px-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <p className="text-sm font-medium text-white">
                                Featured Projects
                            </p>
                            {/* <span className="hidden text-white/25 sm:inline">/</span>
                            <span className="hidden text-sm text-zinc-500 sm:inline">Selected work</span> */}
                        </div>
                        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-white">
                            {featuredProjects.length.toString().padStart(2, "0")}
                            <span className="inline text-zinc-500"> projects</span>
                        </span>
                    </div>
                </div>

                <div
                    aria-label="Featured project carousel"
                    className="scrollbar-hide -m/x-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden"
                >
                    {featuredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className="group w-[82vw] max-w-[22rem] shrink-0 snap-start cursor-default overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#171717] transition-colors duration-300 hover:bg-[#202020]"
                        >
                            <div className="relative aspect-[16/7] overflow-hidden bg-zinc-900">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 h-full w-full object-cover transition duration-700 md:grayscale group-hover:scale-105 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold tracking-normal text-[#262626] backdrop-blur-3xl">
                                    {(index + 1).toString().padStart(2, "0")} / {project.tag}
                                </span>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                    <span>{project.year}</span>
                                    <span
                                        className={`rounded-full border px-2 py-0.5 ${getProjectStatusClass(project.projectStatus)}`}
                                    >
                                        {project.projectStatus}
                                    </span>
                                </div>
                                <h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    {project.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                                    {project.outcome}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-zinc-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <Link
                                        href={project.liveUrl}
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                    >
                                        Read more
                                        <ArrowUpRight size={15} />
                                    </Link>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="GitHub"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/[0.07]"
                                    >
                                        <GithubIcon size={15} />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="relative hidden pt-8 md:block">
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[26rem] xl:h-[28rem]">
                        <AnimatePresence initial={false} mode="popLayout">
                            {featuredProjects.map((project, index) => {
                                const offset =
                                    (index - activeProjectIndex + featuredProjects.length) %
                                    featuredProjects.length;
                                const isVisibleBackCard =
                                    offset > 0 && offset < featuredProjects.length;

                                if (!isVisibleBackCard) return null;

                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            top: `${offset * -1.2}rem`,
                                            left: `${offset * 1.55}rem`,
                                            right: `${offset * 1.55}rem`,
                                        }}
                                        exit={{ opacity: 0, y: -18, scale: 0.96 }}
                                        transition={{ duration: 0.45, ease: easeCurve }}
                                        className="absolute h-[26rem] rounded-xl border border-dashed border-white/10 bg-[#141414] shadow-[0_24px_70px_rgba(0,0,0,0.28)] xl:h-[28rem]"
                                        style={{
                                            zIndex: featuredProjects.length - offset,
                                        }}
                                        aria-hidden="true"
                                    >
                                        <div className="flex h-12 items-center gap-2 border-b border-dashed border-white/10 px-4 text-xs text-zinc-400">
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-white/25" />
                                            <span className="truncate font-medium text-white">
                                                {project.title}
                                            </span>
                                            <span className="text-white/25">/</span>
                                            <span className="truncate">{project.tag}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    <article className="relative z-10 flex h-[26rem] min-h-0 flex-col overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#171717] shadow-[0_24px_80px_rgba(0,0,0,0.32)] xl:h-[28rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeProject.id}-header`}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.3, ease: easeCurve }}
                                className="flex h-14 shrink-0 items-center gap-2 border-b border-dashed border-white/10 bg-[#202020] px-5 text-sm"
                            >
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                                <span className="truncate font-medium text-white">
                                    {activeProject.title}
                                </span>
                                <span className="text-white/25">/</span>
                                <span className="truncate text-zinc-300">
                                    {activeProject.tag}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        <div className="grid min-h-0 flex-1 grid-cols-[18rem_minmax(0,1fr)] lg:grid-cols-[21rem_minmax(0,1fr)]">
                            <aside className="flex min-h-0 flex-col border-r border-dashed border-white/10 bg-[#111111] p-4 lg:p-5">
                                <div>
                                    <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.img
                                                key={activeProject.id}
                                                src={activeProject.image}
                                                alt={activeProject.title}
                                                className="absolute inset-0 h-full w-full object-cover gray/scale transition duration-700 hover:grayscale-0"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 1.06,
                                                    x: 30 * direction,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    x: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.98,
                                                    x: -30 * direction,
                                                }}
                                                transition={{
                                                    duration: 0.55,
                                                    ease: easeCurve,
                                                }}
                                            />
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${activeProject.id}-aside-copy`}
                                            variants={contentStagger}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, transition: { duration: 0.18 } }}
                                        >
                                            <motion.p
                                                variants={variants}
                                                className="mb-2 text-xs font-semibold uppercase tracking-[0.07em] text-emerald-300"
                                            >
                                                {activeProjectNumber}
                                                {" // "}
                                                {activeProject.tag}
                                            </motion.p>
                                            <motion.h3
                                                variants={variants}
                                                className="max-w-xs text-xl font-medium leading-tight tracking-tight text-white/75 lg:text-xl"
                                            >
                                                {activeProject.title}
                                            </motion.h3>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${activeProject.id}-meta`}
                                        variants={contentStagger}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, transition: { duration: 0.18 } }}
                                        className="mt-auto grid gap-2 border-t border-dashed border-white/10 pt-4 text-sm"
                                    >
                                        <motion.div
                                            variants={variants}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <span className="text-zinc-500">Year</span>
                                            <span className="font-semibold text-white">
                                                {activeProject.year}
                                            </span>
                                        </motion.div>
                                        <motion.div
                                            variants={variants}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <span className="text-zinc-500">Status</span>
                                            <span
                                                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getProjectStatusClass(activeProject.projectStatus)}`}
                                            >
                                                {activeProject.projectStatus}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </aside>

                            <div className="flex min-h-0 flex-col p-4">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid size={16} className="text-zinc-500" />
                                        <h3 className="text-md font-medium tracking-tight text-white/75">
                                            Highlights
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={goToPreviousProject}
                                            aria-label="Previous project"
                                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={goToNextProject}
                                            aria-label="Next project"
                                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject.id}
                                        variants={contentStagger}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, transition: { duration: 0.18 } }}
                                        className="grid min-h-0 flex-1 content-start gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(13rem,0.85fr)] md:grid-rows-[auto_auto] lg:grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)]"
                                    >
                                        <motion.section
                                            variants={variants}
                                            className="flex min-h-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4 md:row-span-2 lg:p-5"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Summary
                                            </p>
                                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                                                {activeProject.subtitle}
                                            </p>
                                        </motion.section>

                                        <motion.section
                                            variants={variants}
                                            className="flex min-h-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Stack
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {activeProject.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-zinc-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.section>

                                        <section className="flex min-h-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4">
                                            <p className="text-sm font-semibold text-zinc-500">Links</p>

                                            <div className="mt-4 flex items-center gap-3">
                                                <Link
                                                    href={activeProject.liveUrl}
                                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                                >
                                                    Read more
                                                    <ArrowUpRight size={15} />
                                                </Link>

                                                <a
                                                    href={activeProject.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="GitHub"
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                                >
                                                    <GithubIcon size={15} />
                                                </a>
                                            </div>
                                        </section>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </article>

                    <div
                        className="mt-5 flex flex-wrap gap-2"
                        role="tablist"
                        aria-label="Select featured project"
                    >
                        {featuredProjects.map((project, index) => (
                            <button
                                key={project.id}
                                type="button"
                                role="tab"
                                aria-selected={index === activeProjectIndex}
                                aria-label={`Project ${index + 1}: ${project.title}`}
                                onClick={() => goToProject(index)}
                                className={`relative flex h-8 w-11 items-center justify-center rounded-full text-xs font-semibold transition-colors cursor-pointer ${index === activeProjectIndex
                                    ? "text-zinc-950"
                                    : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {index === activeProjectIndex && (
                                    <motion.span
                                        layoutId="homepage-project-tab-pill"
                                        className="absolute inset-0 rounded-full bg-white"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 32,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            {/* About section */}
            <section
                id="about"
                className="relative z-20 mx-auto max-w-7xl bg-black px-0 py-14 md:px-8 md:py-22 lg:px-12"
            >
                <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-28 md:px-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <p className="text-sm font-medium text-white">
                                About
                            </p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-white">
                            <span className="inline text-zinc-500">Who am I?</span>
                        </span>
                    </div>
                </div>
            </section>



        </div>
    );
}
