"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

import { MotionImage } from "@/components/shared/MotionImage";
import { contentStagger, easeCurve, fadeOnly, slideUp } from "@/lib/motion";
import { featuredProjects } from "./home-content";
import { getProjectStatusClass } from "./project-status";

export function FeaturedProjectsSection() {
    const shouldReduceMotion = useReducedMotion();
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
    const activeMobileProjectNumber = (mobileProjectIndex + 1)
        .toString()
        .padStart(2, "0");
    const variants = shouldReduceMotion ? fadeOnly : slideUp(direction);

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

    const goToProjectIndex = (index: number) => {
        if (index === activeProjectIndex) return;

        setDirection(index > activeProjectIndex ? 1 : -1);
        setActiveProjectIndex(index);
    };

    const goToMobileProject = (step: -1 | 1) => {
        setMobileDirection(step);
        setMobileProjectIndex(
            (current) =>
                (current + step + featuredProjects.length) %
                featuredProjects.length,
        );
    };

    const goToMobileProjectIndex = (index: number) => {
        if (index === mobileProjectIndex) return;

        setMobileDirection(index > mobileProjectIndex ? 1 : -1);
        setMobileProjectIndex(index);
    };

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
        <section
            id="featured-projects"
            className="featured-projects-section relative z-20 mx-auto max-w-7xl bg-black px-0 py-14 md:px-8 md:py-16 lg:px-12"
        >
            <div className="featured-projects-shell-header mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-24 md:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] text-xs font-semibold text-emerald-300">
                            2
                        </span>
                        <p className="text-sm font-medium text-white">
                            Featured Projects
                        </p>
                    </div>

                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-white">
                        {featuredProjects.length.toString().padStart(2, "0")}
                        <span className="text-zinc-500"> projects</span>
                    </span>
                </div>
            </div>

            <div className="relative md:hidden">
                <div
                    aria-label="Featured project carousel"
                    className="featured-mobile-carousel flex justify-center overflow-hidden px-0 pb-3"
                >
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={activeMobileProject.id}
                            initial={{
                                opacity: 0,
                                x: shouldReduceMotion ? 0 : 18 * mobileDirection,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                                opacity: 0,
                                x: shouldReduceMotion ? 0 : -18 * mobileDirection,
                            }}
                            transition={{
                                duration: shouldReduceMotion ? 0.18 : 0.3,
                                ease: easeCurve,
                            }}
                            onPointerDown={handleMobilePointerStart}
                            onPointerUp={handleMobilePointerEnd}
                            onPointerCancel={resetMobilePointer}
                            className="featured-mobile-card group w-full max-w-none shrink-0 cursor-default touch-pan-y overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-[#1b1b1b]"
                        >
                            <div className="featured-mobile-card-image relative aspect-[16/10] overflow-hidden bg-zinc-900">
                                <MotionImage
                                    src={activeMobileProject.image}
                                    alt={activeMobileProject.title}
                                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                <div className="absolute left-4 top-4 flex items-center gap-2">
                                    <span className="rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#262626]">
                                        {(mobileProjectIndex + 1)
                                            .toString()
                                            .padStart(2, "0")}
                                    </span>
                                </div>
                            </div>

                            <div className="featured-mobile-card-content p-3.5">
                                <div className="featured-mobile-card-meta mb-2.5 flex items-center justify-between gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                                    <span>{activeMobileProject.year}</span>

                                    <span
                                        className={`rounded-full border px-2.5 py-0.5 text-[0.68rem] normal-case tracking-normal ${getProjectStatusClass(
                                            activeMobileProject.projectStatus,
                                        )}`}
                                    >
                                        {activeMobileProject.projectStatus}
                                    </span>
                                </div>

                                <h3 className="featured-mobile-card-title text-lg font-semibold leading-tight tracking-tight text-white">
                                    {activeMobileProject.title}
                                </h3>

                                <p className="featured-mobile-card-copy mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
                                    {activeMobileProject.subtitle}
                                </p>

                                <div className="mt-3 grid gap-3 border-t border-dashed border-white/10 pt-3 text-sm sm:grid-cols-2">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-zinc-600">
                                            Client
                                        </p>
                                        <p className="mt-1 line-clamp-2 font-semibold leading-5 text-white">
                                            {activeMobileProject.client}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-zinc-600">
                                            Role
                                        </p>
                                        <p className="mt-1 font-semibold leading-5 text-white">
                                            {activeMobileProject.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="featured-mobile-card-links mt-4 grid grid-cols-[1fr_auto] gap-3">
                                    <Link
                                        href={activeMobileProject.liveUrl}
                                        className="featured-mobile-card-link-primary inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                    >
                                        Read more
                                        <ArrowUpRight size={15} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    </AnimatePresence>
                </div>

                <div className="mt-3 flex items-center justify-center gap-3 px-0">
                    <span aria-live="polite" className="sr-only">
                        Project {activeMobileProjectNumber} of{" "}
                        {featuredProjects.length.toString().padStart(2, "0")}
                    </span>

                    <button
                        type="button"
                        onClick={() => goToMobileProject(-1)}
                        aria-label="Previous project"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div
                        aria-label="Choose featured project"
                        className="flex min-w-16 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                        {featuredProjects.map((project, index) => {
                            const isActive = index === mobileProjectIndex;

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => goToMobileProjectIndex(index)}
                                    aria-label={`Show project ${index + 1}`}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${isActive
                                        ? "w-5 bg-white"
                                        : "w-1.5 bg-white/25 hover:bg-white/50"
                                        }`}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={() => goToMobileProject(1)}
                        aria-label="Next project"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="featured-projects-desktop hidden pt-8 md:block">
                <div className="relative">
                    <div className="featured-card-backdrop pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-[33rem] lg:min-h-[29rem] xl:min-h-[30rem]">
                        <AnimatePresence initial={false} mode="popLayout">
                            {featuredProjects.map((project, index) => {
                                const offset =
                                    (index -
                                        activeProjectIndex +
                                        featuredProjects.length) %
                                    featuredProjects.length;

                                const isVisibleBackCard =
                                    offset > 0 && offset < featuredProjects.length;

                                if (!isVisibleBackCard) return null;

                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            y: shouldReduceMotion ? 0 : 18,
                                            scale: shouldReduceMotion ? 1 : 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            top: `calc(${offset} * var(--featured-stack-y-step, -1.2rem))`,
                                            left: `calc(${offset} * var(--featured-stack-x-step, 1.55rem))`,
                                            right: `calc(${offset} * var(--featured-stack-x-step, 1.55rem))`,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: shouldReduceMotion ? 0 : -18,
                                            scale: shouldReduceMotion ? 1 : 0.96,
                                        }}
                                        transition={{
                                            duration: shouldReduceMotion ? 0.18 : 0.45,
                                            ease: easeCurve,
                                        }}
                                        className="featured-card-backdrop-card absolute h-full min-h-[33rem] rounded-xl border border-dashed border-white/10 bg-[#141414] shadow-[0_24px_70px_rgba(0,0,0,0.28)] lg:min-h-[29rem] xl:min-h-[30rem]"
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

                    <article className="featured-project-card relative z-10 flex min-h-[33rem] min-w-0 flex-col overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#171717] shadow-[0_24px_80px_rgba(0,0,0,0.32)] lg:min-h-[29rem] xl:min-h-[30rem]">
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

                        <div className="featured-project-card-body grid min-h-0 min-w-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(16rem,0.78fr)_minmax(0,1.22fr)] xl:grid-cols-[20rem_minmax(0,1fr)]">
                            <aside className="featured-project-card-aside flex min-h-0 min-w-0 flex-col gap-5 border-b border-dashed border-white/10 bg-[#111111] p-4 lg:border-b-0 lg:border-r lg:p-5">
                                <div className="min-w-0">
                                    <div className="featured-project-image-frame relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 md:aspect-[16/7] lg:aspect-[16/9] xl:aspect-[16/10]">
                                        <MotionImage
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${activeProject.id}-aside-copy`}
                                            variants={contentStagger}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.18 },
                                            }}
                                        >
                                            <motion.p
                                                variants={variants}
                                                className="mb-2 text-sm font-medium text-emerald-300"
                                            >
                                                {activeProjectNumber}
                                                {" • "}
                                                {activeProject.tag}
                                            </motion.p>

                                            <motion.h3
                                                variants={variants}
                                                className="max-w-xs text-xl font-medium leading-tight tracking-tight text-white/75"
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
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.18 },
                                        }}
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
                                                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getProjectStatusClass(
                                                    activeProject.projectStatus,
                                                )}`}
                                            >
                                                {activeProject.projectStatus}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </aside>

                            <div className="featured-project-highlights flex min-h-0 min-w-0 flex-col p-4 lg:p-5">
                                <div className="featured-project-highlights-header mb-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid size={16} className="text-zinc-500" />
                                        <h3 className="text-sm font-medium tracking-tight text-white/75">
                                            Highlights
                                        </h3>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject.id}
                                        variants={contentStagger}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.18 },
                                        }}
                                        className="featured-project-detail-grid flex min-h-0 min-w-0 flex-1"
                                    >
                                        <motion.section
                                            variants={variants}
                                            className="featured-project-detail-card flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4 lg:p-5"
                                        >
                                            <div className="grid min-h-0 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <p className="text-sm font-semibold text-zinc-500">
                                                            Summary
                                                        </p>
                                                    </div>

                                                    <p className="featured-project-summary-text mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
                                                        {activeProject.subtitle}
                                                    </p>
                                                </div>

                                                <div className="min-w-0 lg:border-l lg:border-dashed lg:border-white/10 lg:pl-5">
                                                    <p className="text-sm font-semibold text-zinc-500">
                                                        Project Details
                                                    </p>

                                                    <dl className="mt-4 grid gap-3 text-sm">
                                                        {[
                                                            ["Client", activeProject.client],
                                                            ["Role", activeProject.role],
                                                            ["Industry", activeProject.industry],
                                                        ].map(([label, value]) => (
                                                            <div
                                                                key={label}
                                                                className="grid min-w-0 gap-1 border-b border-dashed border-white/10 pb-3 last:border-b-0 last:pb-0"
                                                            >
                                                                <dt className="text-xs font-semibold text-zinc-600">
                                                                    {label}
                                                                </dt>
                                                                <dd className="line-clamp-3 font-semibold leading-5 text-white">
                                                                    {value}
                                                                </dd>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>

                                            <div className="featured-project-links mt-5 flex flex-wrap items-center gap-3 border-t border-dashed border-white/10 pt-4">
                                                <Link
                                                    href={activeProject.liveUrl}
                                                    className="featured-project-link-primary inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                                >
                                                    Read more
                                                    <ArrowUpRight size={15} />
                                                </Link>
                                            </div>
                                        </motion.section>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="relative z-20 mt-5 flex items-center justify-center gap-3">
                    <span aria-live="polite" className="sr-only">
                        Project {activeProjectNumber} of{" "}
                        {featuredProjects.length.toString().padStart(2, "0")}
                    </span>

                    <button
                        type="button"
                        onClick={goToPreviousProject}
                        aria-label="Previous project"
                        className="featured-project-nav-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div
                        aria-label="Choose featured project"
                        className="flex min-w-16 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                        {featuredProjects.map((project, index) => {
                            const isActive = index === activeProjectIndex;

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => goToProjectIndex(index)}
                                    aria-label={`Show project ${index + 1}`}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${isActive
                                        ? "w-5 bg-white"
                                        : "w-1.5 bg-white/25 hover:bg-white/50"
                                        }`}
                                />
                            );
                        })}
                    </div>

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
        </section>
    );
}
