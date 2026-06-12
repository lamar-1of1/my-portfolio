"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import {
    ArrowUpRight,
    Atom,
    Award,
    Box,
    Boxes,
    BriefcaseBusiness,
    Braces,
    ChevronLeft,
    ChevronRight,
    Code,
    Copy,
    Download,
    GraduationCap,
    LayoutGrid,
    Palette,
    UserRoundCheck,
    Wind,
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

const aboutToolkit = [
    { label: "Next.js", icon: Box },
    { label: "React", icon: Atom },
    { label: "TypeScript", icon: Braces },
    { label: "Tailwind CSS", icon: Wind },
    { label: "Framer Motion", icon: Boxes },
    { label: "Figma", icon: Palette },
    { label: "Node.js", icon: Code },
    { label: "Design Systems", icon: LayoutGrid },
];

const aboutJourney = [
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

export function HomePage() {
    // const currentRole = workExperience[0];
    const mobilePointerStartX = useRef<number | null>(null);
    const mobilePointerStartY = useRef<number | null>(null);
    const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
    const [mobileDirection, setMobileDirection] = useState(1);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const activeMobileProject = featuredProjects[mobileProjectIndex];
    const activeProject = featuredProjects[activeProjectIndex];
    const activeProjectNumber = (activeProjectIndex + 1)
        .toString()
        .padStart(2, "0");
    const variants = slideUp(direction);

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
    const goToMobileProject = (step: -1 | 1) => {
        setMobileDirection(step);
        setMobileProjectIndex((current) =>
            (current + step + featuredProjects.length) % featuredProjects.length,
        );
    };
    const goToPreviousMobileProject = () => goToMobileProject(-1);
    const goToNextMobileProject = () => goToMobileProject(1);
    const resetMobilePointer = () => {
        mobilePointerStartX.current = null;
        mobilePointerStartY.current = null;
    };
    const handleMobilePointerStart = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        mobilePointerStartX.current = event.clientX;
        mobilePointerStartY.current = event.clientY;
        event.currentTarget.setPointerCapture?.(event.pointerId);
    };
    const handleMobilePointerEnd = (event: PointerEvent<HTMLElement>) => {
        if (
            mobilePointerStartX.current === null ||
            mobilePointerStartY.current === null
        ) {
            return;
        }

        const deltaX = event.clientX - mobilePointerStartX.current;
        const deltaY = event.clientY - mobilePointerStartY.current;
        const isHorizontalSwipe =
            Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

        if (isHorizontalSwipe) {
            goToMobileProject(deltaX < 0 ? 1 : -1);
        }

        resetMobilePointer();
        event.currentTarget.releasePointerCapture?.(event.pointerId);
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

            {/* <div
                aria-hidden="true"
                className="relative -mx-3 overflow-hidden border-y border-dashed border-white/10 bg-black py-3 md:py-4"
            >
                <Scales
                    orientation="diagonal"
                    size={8}
                    className="opacity-35"
                    color="color-mix(in oklab, var(--color-white) 8%, transparent)"
                />
                <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-white/10" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-full border-l border-dashed border-white/10" />
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
            </div> */}

            <section
                id="featured-projects"
                className="featured-projects-section relative z-20 mx-auto max-w-7xl bg-black px-0 py-14 md:px-8 md:py-16 lg:px-12"
            >
                <div className="featured-projects-shell-header mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-28 md:px-6">
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

                <div className="relative md:hidden">
                    <div
                        aria-label="Featured project carousel"
                        className="featured-mobile-carousel scrollbar-hide flex justify-center overflow-hidden px-5 pb-4"
                    >
                        <AnimatePresence mode="wait">
                            <motion.article
                                key={activeMobileProject.id}
                                initial={{ opacity: 0, x: 18 * mobileDirection }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -18 * mobileDirection }}
                                transition={{ duration: 0.3, ease: easeCurve }}
                                onPointerDown={handleMobilePointerStart}
                                onPointerUp={handleMobilePointerEnd}
                                onPointerCancel={resetMobilePointer}
                                className="featured-mobile-card group w-[84vw] max-w-[23rem] shrink-0 snap-center cursor-default touch-pan-y overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-[#1b1b1b]"
                            >
                                <div className="featured-mobile-card-image relative aspect-[16/10] overflow-hidden bg-zinc-900">
                                    <img
                                        src={activeMobileProject.image}
                                        alt={activeMobileProject.title}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                    <div className="absolute left-4 top-4 flex items-center gap-2">
                                        <span className="rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#262626]">
                                            {(mobileProjectIndex + 1).toString().padStart(2, "0")}
                                        </span>

                                        <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                            {activeMobileProject.tag}
                                        </span>
                                    </div>
                                </div>

                                <div className="featured-mobile-card-content p-4">
                                    <div className="featured-mobile-card-meta mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                                        <span>{activeMobileProject.year}</span>

                                        <span
                                            className={`rounded-full border px-2.5 py-1 text-[0.68rem] normal-case tracking-normal ${getProjectStatusClass(
                                                activeMobileProject.projectStatus,
                                            )}`}
                                        >
                                            {activeMobileProject.projectStatus}
                                        </span>
                                    </div>

                                    <h3 className="featured-mobile-card-title text-2xl font-semibold tracking-tight text-white">
                                        {activeMobileProject.title}
                                    </h3>

                                    <p className="featured-mobile-card-outcome mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                                        {activeMobileProject.outcome}
                                    </p>

                                    <div className="featured-mobile-card-stack mt-4 flex flex-wrap gap-2">
                                        {activeMobileProject.techStack.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-zinc-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="featured-mobile-card-links mt-5 grid grid-cols-[1fr_auto] gap-3">
                                        <Link
                                            href={activeMobileProject.liveUrl}
                                            className="featured-mobile-card-link-primary inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                        >
                                            Read more
                                            <ArrowUpRight size={15} />
                                        </Link>

                                        <a
                                            href={activeMobileProject.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="GitHub"
                                            className="featured-mobile-card-link-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            <GithubIcon size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        </AnimatePresence>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-black to-transparent" />

                    <div className="mt-3 flex justify-end gap-2 px-5">
                        <button
                            type="button"
                            onClick={goToPreviousMobileProject}
                            aria-label="Previous project"
                            className="featured-project-nav-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={goToNextMobileProject}
                            aria-label="Next project"
                            className="featured-project-nav-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="featured-projects-desktop relative hidden pt-8 md:block">
                    <div className="featured-card-backdrop pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-[34rem] lg:min-h-[26rem] xl:min-h-[28rem]">
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
                                        className="featured-card-backdrop-card absolute h-full min-h-[34rem] rounded-xl border border-dashed border-white/10 bg-[#141414] shadow-[0_24px_70px_rgba(0,0,0,0.28)] lg:min-h-[26rem] xl:min-h-[28rem]"
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

                    <article className="featured-project-card relative z-10 flex min-h-[34rem] min-w-0 flex-col overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#171717] shadow-[0_24px_80px_rgba(0,0,0,0.32)] lg:h-[26rem] lg:min-h-0 xl:h-[28rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeProject.id}-header`}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.3, ease: easeCurve }}
                                className="featured-project-card-header flex h-14 shrink-0 items-center gap-2 border-b border-dashed border-white/10 bg-[#202020] px-5 text-sm"
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

                        <div className="featured-project-card-body grid min-h-0 min-w-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
                            <aside className="featured-project-card-aside flex min-h-0 min-w-0 flex-col gap-4 border-b border-dashed border-white/10 bg-[#111111] p-4 lg:border-b-0 lg:border-r lg:p-5">
                                <div className="min-w-0">
                                    <div className="featured-project-image-frame relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 md:aspect-[16/7] lg:aspect-[16/10]">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.img
                                                key={activeProject.id}
                                                src={activeProject.image}
                                                alt={activeProject.title}
                                                className="absolute inset-0 h-full w-full object-cover gray/scale transition duration-700 hover:grayscale-0"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 1.04,
                                                    filter: "blur(10px)",
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    filter: "blur(0px)",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 1.02,
                                                    filter: "blur(8px)",
                                                }}
                                                transition={{
                                                    duration: 0.45,
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
                                        className="featured-project-meta grid content-start gap-2 border-t border-dashed border-white/10 pt-4 text-sm lg:mt-auto"
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

                            <div className="featured-project-highlights flex min-h-0 min-w-0 flex-col p-4">
                                <div className="featured-project-highlights-header mb-3 flex items-center justify-between gap-4">
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
                                            className="featured-project-nav-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={goToNextProject}
                                            aria-label="Next project"
                                            className="featured-project-nav-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
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
                                        className="featured-project-detail-grid grid min-h-0 min-w-0 flex-1 content-start gap-3 sm:grid-cols-2 md:grid-cols-[minmax(0,1.15fr)_minmax(12rem,0.85fr)] md:grid-rows-[auto_auto] lg:grid-cols-[minmax(0,1.25fr)_minmax(13rem,0.75fr)] xl:grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)]"
                                    >
                                        <motion.section
                                            variants={variants}
                                            className="featured-project-detail-card featured-project-summary-card flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4 sm:col-span-2 md:col-span-1 md:row-span-2 lg:p-5"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Summary
                                            </p>
                                            <p className="featured-project-summary-text mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                                                {activeProject.subtitle}
                                            </p>
                                        </motion.section>

                                        <motion.section
                                            variants={variants}
                                            className="featured-project-detail-card flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Stack
                                            </p>
                                            <div className="featured-project-stack mt-3 flex flex-wrap gap-2">
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

                                        <section className="featured-project-detail-card flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4">
                                            <p className="text-sm font-semibold text-zinc-500">Links</p>

                                            <div className="featured-project-links mt-4 flex flex-wrap items-center gap-3">
                                                <Link
                                                    href={activeProject.liveUrl}
                                                    className="featured-project-link-primary inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                                >
                                                    Read more
                                                    <ArrowUpRight size={15} />
                                                </Link>

                                                <a
                                                    href={activeProject.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="GitHub"
                                                    className="featured-project-link-icon inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
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

                </div>
            </section>


            {/* About section */}
            <section
                id="about"
                className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden bg-black px-0 py-14 md:px-8 md:py-20 lg:px-12"
            >
                <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-12 md:px-6">
                    <div className="flex min-w-0 items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <p className="text-sm font-medium text-white">
                                About
                            </p>
                            {/* <span className="hidden text-white/25 sm:inline">/</span>
                            <span className="hidden text-sm text-zinc-500 sm:inline">Selected work</span> */}
                        </div>
                        <span className="inline text-zinc-500 shrink-0 text-xs font-semibold uppercase tracking-[0.02em]">Who am I ?</span>
                    </div>
                </div>
                <div className="w-full max-w-full overflow-hidden border-y border-dashed border-white/10">
                    <div className="grid min-w-0 lg:grid-cols-[16.5rem_minmax(0,1fr)]">
                        <aside className="min-w-0 border-b border-dashed border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                            <div className="flex h-full min-w-0 flex-col gap-6">
                                {/* Intro */}
                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold leading-tight text-white">
                                        Designer & Full Stack Developer
                                    </h3>

                                    <p className="mt-2 max-w-full text-sm leading-relaxed text-zinc-400">
                                        Creating thoughtful digital experiences from Barbados.
                                    </p>
                                </div>

                                {/* Meta */}
                                <div className="space-y-3">
                                    {/* <div className="flex items-center gap-3 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-3 py-2">
                                        <span className="h-2 w-2 rounded-full bg-white/30" />
                                        <span className="text-sm font-medium text-zinc-300">
                                            Barbados
                                        </span>
                                    </div> */}

                                    {/* <div className="flex items-center gap-3 rounded-lg border border-dashed border-emerald-500/20 bg-emerald-500/[0.04] px-3 py-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-sm font-medium text-emerald-300">
                                            Available for work
                                        </span>
                                    </div> */}
                                </div>

                                {/* Contact */}
                                <a
                                    href="mailto:coxlamar4@gmail.com"
                                    className="group flex min-w-0 items-center justify-between gap-4 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.03]"
                                >
                                    <span className="truncate">coxlamar4@gmail.com</span>

                                    <Copy
                                        size={15}
                                        className="shrink-0 text-zinc-500 transition-colors duration-300 group-hover:text-emerald-300"
                                    />
                                </a>
                            </div>
                        </aside>

                        <div className="min-w-0 p-5 sm:p-6 lg:p-7">
                            <div className="max-w-4xl space-y-4 break-words text-sm font-normal leading-6 text-zinc-400">
                                <p>
                                    I&apos;m a designer and developer based in Barbados with a passion for creating digital experiences that are clear, functional, and driven by impact. I build polished portfolio systems, product pages, and interactive web experiences that help ideas feel easier to understand.
                                </p>
                                <p>
                                    My work sits between visual design and production frontend. I shape interfaces from structure to launch, moving through user flows, responsive layouts, design systems, and the interaction details that make a page feel considered.
                                </p>
                                <p>
                                    I keep the process direct: understand the goal, design the system, build the experience, then refine until the final result feels calm, fast, and ready to use.
                                </p>
                            </div>

                            {/* <div className="mt-7 grid border-y border-dashed border-white/10 sm:grid-cols-3">
                                {aboutStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="border-b border-dashed border-white/10 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                                    >
                                        <p className="text-3xl font-extrabold tracking-tight text-white">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-zinc-500">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div> */}

                            <div className="pt-6">
                                <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                                    {/* <Music2 size={13} className="text-emerald-300" /> */}
                                    {/* <span className="text-emerald-300">02</span> */}
                                    {/* <span className="text-zinc-500">{"//"}</span> */}
                                    <span className="text-white">Tech Stack</span>
                                </div>
                                <div className="relative max-w-full overflow-hidden py-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black via-black/80 to-transparent" />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black via-black/80 to-transparent" />
                                    <div className="tech-stack-marquee flex w-max gap-2">
                                        {[...aboutToolkit, ...aboutToolkit].map((tool, index) => {
                                            const Icon = tool.icon;

                                            return (
                                                <span
                                                    key={`${tool.label}-${index}`}
                                                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 bg-black/35 px-3.5 text-xs font-bold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                                                    aria-hidden={index >= aboutToolkit.length}
                                                >
                                                    <Icon size={15} className="text-emerald-300" />
                                                    {tool.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7">
                    <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                        {/* <Music2 size={13} className="text-emerald-300" /> */}
                        {/* <span className="text-emerald-300">03</span> */}
                        {/* <span className="text-zinc-500">{"//"}</span> */}
                        <span className="text-white font-inter">My Journey</span>
                    </div>

                    <div className="journey-card-grid grid overflow-hidden rounded-lg border border-dashed border-white/10 bg-[#0f0f0f] md:grid-cols-3">
                        {aboutJourney.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.title}
                                    className="journey-card relative min-h-[11rem] overflow-hidden border-b border-dashed border-white/10 p-5 transition-all duration-500 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                                >
                                    <div className="relative z-10 flex items-center justify-between gap-4">
                                        <span className="journey-card-icon flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/30 text-zinc-400 transition-all duration-500">
                                            <Icon size={15} />
                                        </span>
                                        <span className="text-xs font-bold text-zinc-600">
                                            {item.period}
                                        </span>
                                    </div>
                                    <h3 className="relative z-10 mt-5 text-sm font-medium text-white transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="relative z-10 mt-3 text-sm font-semibold leading-6 text-zinc-500 transition-colors duration-500">
                                        {item.copy}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>



        </div>
    );
}
