"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, CornerUpLeft, Link2, Search, X } from "lucide-react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";

import { MotionImage } from "@/components/shared/MotionImage";
import type { ProjectItem } from "@/lib/content/projects";
import {
    contentStagger,
    fadeOnly,
    fadeUp,
    reducedContentStagger,
} from "@/lib/motion";
import { GithubIcon } from "hugeicons-react";

const PROJECT_FILTER_ALL = "All";
const OTHER_PROJECTS_INITIAL_COUNT = 2;
const OTHER_PROJECTS_LOAD_COUNT = 2;

function getProjectStatusClass(status: string) {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "new") {
        return "border-emerald-500/25 bg-emerald-400 text-white";
    }

    if (normalizedStatus.includes("progress")) {
        return "border-amber-400/25 bg-amber-400 text-white";
    }

    return "border-white/10 bg-white/[0.035] text-zinc-300";
}

function DetailRow({
    id,
    title,
    children,
    variants,
}: {
    id: string;
    title: string;
    children: ReactNode;
    variants: Variants;
}) {
    return (
        <motion.section
            id={id}
            variants={variants}
            className="grid scroll-mt-28 gap-5 border-t border-dashed border-white/10 py-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-10"
        >
            <h2 className="text-sm font-semibold tracking-tight text-white">
                {title}
            </h2>

            <div className="max-w-xl text-sm leading-7 text-zinc-400">
                {children}
            </div>
        </motion.section>
    );
}

export function ProjectDetailPage({
    project,
    otherProjects,
}: {
    project: ProjectItem;
    otherProjects: ProjectItem[];
}) {
    const shouldReduceMotion = useReducedMotion();
    const itemVariants = shouldReduceMotion ? fadeOnly : fadeUp;
    const staggerVariants = shouldReduceMotion
        ? reducedContentStagger
        : contentStagger;
    const isExternalLiveUrl = /^https?:\/\//.test(project.liveUrl);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const [projectFilter, setProjectFilter] = useState(PROJECT_FILTER_ALL);
    const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
    const [visibleOtherProjectCount, setVisibleOtherProjectCount] = useState(
        OTHER_PROJECTS_INITIAL_COUNT,
    );
    const searchInputRef = useRef<HTMLInputElement>(null);
    const projectFilterOptions = useMemo(
        () => [
            PROJECT_FILTER_ALL,
            ...Array.from(new Set(otherProjects.map((item) => item.tag))).sort(),
        ],
        [otherProjects],
    );
    const normalizedProjectSearch = projectSearchQuery.trim().toLowerCase();
    const hasActiveProjectFilter = projectFilter !== PROJECT_FILTER_ALL;
    const filteredOtherProjects = useMemo(() => {
        return otherProjects.filter((item) => {
            if (hasActiveProjectFilter && item.tag !== projectFilter) {
                return false;
            }

            if (!normalizedProjectSearch) return true;

            const searchableText = [
                item.title,
                item.subtitle,
                item.year,
                item.tag,
                item.projectStatus,
                item.client,
                item.industry,
                item.techStack.join(" "),
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(normalizedProjectSearch);
        });
    }, [
        hasActiveProjectFilter,
        normalizedProjectSearch,
        otherProjects,
        projectFilter,
    ]);
    const visibleOtherProjects = otherProjects.slice(0, visibleOtherProjectCount);
    const hasMoreOtherProjects = visibleOtherProjectCount < otherProjects.length;

    const closeProjectSearch = useCallback(() => {
        setIsSearchOpen(false);
        setProjectSearchQuery("");
        setIsProjectFilterOpen(false);
    }, []);

    const handleLoadMoreProjects = () => {
        setVisibleOtherProjectCount((count) =>
            Math.min(count + OTHER_PROJECTS_LOAD_COUNT, otherProjects.length),
        );
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isSearchShortcut =
                (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

            if (isSearchShortcut) {
                event.preventDefault();
                setIsSearchOpen(true);
                setIsProjectFilterOpen(false);
                window.requestAnimationFrame(() => {
                    searchInputRef.current?.focus();
                });
                return;
            }

            if (event.key === "Escape") {
                closeProjectSearch();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeProjectSearch]);

    useEffect(() => {
        if (!isSearchOpen) return;

        const frame = window.requestAnimationFrame(() => {
            searchInputRef.current?.focus();
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isSearchOpen]);

    return (
        <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-6xl px-0 pb-20 pt-24 text-white md:px-8 md:pt-28 lg:px-12"
        >
            <motion.div variants={itemVariants}>
                <Link
                    href="/#featured-projects"
                    className="mb-5 inline-flex items-center text-sm font-medium text-zinc-500 transition-all  hover:text-white"
                >
                    <CornerUpLeft size={14} />
                    <span className="text-zinc-500 ml-1">Back to</span>{" "}
                    <span className="hover:text-white ml-1">Projects</span>
                </Link>
            </motion.div>

            <article>
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950"
                >
                    <div className="relative aspect-[16/10] md:aspect-[16/7]">
                        <MotionImage
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                        <div className="absolute left-4 top-4 flex items-center gap-2">
                            <span
                                className={`rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${getProjectStatusClass(
                                    project.projectStatus,
                                )}`}
                            >
                                {project.projectStatus}
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.header variants={itemVariants} className="py-7">
                    <p className="mb-3 text-sm font-medium text-emerald-300">
                        {project.tag}
                    </p>

                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                        <div>
                            <h1 className="max-w-6xl font-semibold tracking-tight text-white text-2xl lg:text-4xl">
                                {project.title}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base md:leading-7">
                                {project.subtitle}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={project.liveUrl}
                                target={isExternalLiveUrl ? "_blank" : undefined}
                                rel={isExternalLiveUrl ? "noreferrer" : undefined}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                            >
                                View website
                                <ArrowUpRight size={15} />
                            </Link>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                            >
                                <GithubIcon size={16} />
                            </a>
                        </div>
                    </div>
                </motion.header>

                <div className="relative">
                    <DetailRow
                        id="project-overview"
                        title="Overview"
                        variants={itemVariants}
                    >
                        <p>{project.overview}</p>

                        <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
                            {[
                                ["Year", project.year],
                                ["Client", project.client],
                                ["Industry", project.industry],
                                // ["Timeline", project.timeline],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <dt className="mb-1 font-semibold text-zinc-600">
                                        {label}
                                    </dt>
                                    <dd className="font-medium text-white">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <p className="mt-8 text-sm font-semibold text-zinc-600">
                            Tech Stack
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </DetailRow>

                    <DetailRow
                        id="project-role"
                        title="My Role(s)"
                        variants={itemVariants}
                    >
                        <p>{project.myRole}</p>
                    </DetailRow>

                    <DetailRow
                        id="project-problems"
                        title="Problems"
                        variants={itemVariants}
                    >
                        <p>{project.problems}</p>
                    </DetailRow>

                    <DetailRow
                        id="project-solutions"
                        title="Solutions"
                        variants={itemVariants}
                    >
                        <p>{project.solutions}</p>
                    </DetailRow>

                    <DetailRow
                        id="project-outcome"
                        title="Outcome"
                        variants={itemVariants}
                    >
                        <p>{project.outcome}</p>
                    </DetailRow>

                    <DetailRow
                        id="project-credits"
                        title="Credits"
                        variants={itemVariants}
                    >
                        {project.credits && project.credits.length > 0 ? (
                            <ul className="flex flex-wrap gap-2">
                                {project.credits.map((credit) => (
                                    <li
                                        key={credit.name}
                                        className="inline-flex"
                                    >
                                        {credit.url ? (
                                            <Link
                                                href={credit.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200"
                                            >
                                                {credit.name}
                                                <Link2
                                                    size={12}
                                                    className="shrink-0 text-zinc-500 transition-colors group-hover:text-emerald-200"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        ) : (
                                            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-white">
                                                {credit.name}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-zinc-500">
                                Credits will be added once collaborators are confirmed.
                            </p>
                        )}
                    </DetailRow>
                </div>
            </article>

            <AnimatePresence initial={false}>
                {isSearchOpen ? (
                    <motion.button
                        type="button"
                        aria-label="Close project search"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                        className="fixed inset-0 z-40 cursor-default bg-black/50 backdrop-blur-sm"
                        onClick={closeProjectSearch}
                    />
                ) : null}
            </AnimatePresence>

            <motion.section
                variants={itemVariants}
                className="relative border-t border-dashed border-white/10 pt-9"
            >
                <div className="relative z-50 mb-5">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                        <h2 className="text-sm font-semibold tracking-tight text-white">
                            Other Projects
                        </h2>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen((current) => !current)}
                                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm font-normal text-zinc-500 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200"
                            >
                                <Search size={16} />
                                <span>Search projects</span>
                                <span className="ml-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.68rem] text-zinc-500">
                                    Ctrl K
                                </span>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {isSearchOpen ? (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                                className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#151515] shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                            >
                                <div className="flex cursor-text items-center gap-3 border-b border-white/10 px-4 py-3">
                                    <Search
                                        size={18}
                                        className="shrink-0 text-zinc-500"
                                    />
                                    <input
                                        ref={searchInputRef}
                                        value={projectSearchQuery}
                                        onChange={(event) =>
                                            setProjectSearchQuery(event.target.value)
                                        }
                                        placeholder="Search projects by title, year, type..."
                                        className="min-w-0 flex-1 cursor-text bg-transparent text-sm font-medium text-white outline-none placeholder:text-zinc-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={closeProjectSearch}
                                        aria-label="Close search"
                                        className="hidden h-8 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-2 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-400 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200 sm:inline-flex"
                                    >
                                        Esc
                                    </button>
                                    {projectSearchQuery ? (
                                        <button
                                            type="button"
                                            onClick={() => setProjectSearchQuery("")}
                                            aria-label="Clear search"
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200"
                                        >
                                            <X size={15} />
                                        </button>
                                    ) : null}
                                </div>

                                <div className="project-search-scrollbar max-h-[24rem] overflow-y-auto p-2">
                                    <div className="relative flex items-center gap-2 px-2 pb-2 pt-1 text-sm text-zinc-500">
                                        <span>Filter:</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsProjectFilterOpen(
                                                    (current) => !current,
                                                )
                                            }
                                            aria-label="Filter projects"
                                            aria-expanded={isProjectFilterOpen}
                                            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-white/10 bg-white/[0.035] px-2 py-1 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                                        >
                                            {projectFilter}
                                            <ChevronDown
                                                size={14}
                                                className={`text-zinc-500 transition-transform ${isProjectFilterOpen
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isProjectFilterOpen ? (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{
                                                        duration: shouldReduceMotion
                                                            ? 0
                                                            : 0.14,
                                                    }}
                                                    className="absolute left-14 top-9 z-20 min-w-44 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-1 shadow-[0_14px_35px_rgba(0,0,0,0.45)]"
                                                >
                                                    {projectFilterOptions.map(
                                                        (option) => {
                                                            const isActive =
                                                                option ===
                                                                projectFilter;

                                                            return (
                                                                <button
                                                                    key={option}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setProjectFilter(
                                                                            option,
                                                                        );
                                                                        setIsProjectFilterOpen(
                                                                            false,
                                                                        );
                                                                    }}
                                                                    className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors ${isActive
                                                                            ? "bg-white/[0.09] text-white"
                                                                            : "text-zinc-400 hover:bg-white/[0.055] hover:text-white"
                                                                        }`}
                                                                >
                                                                    {option}
                                                                </button>
                                                            );
                                                        },
                                                    )}
                                                </motion.div>
                                            ) : null}
                                        </AnimatePresence>
                                    </div>

                                    {filteredOtherProjects.length > 0 ? (
                                        <div className="grid gap-2">
                                            {filteredOtherProjects.map((item) => (
                                                <Link
                                                    key={item.slug}
                                                    href={`/projects/${item.slug}`}
                                                    className="group grid cursor-pointer grid-cols-[5.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/[0.04] sm:grid-cols-[7.5rem_minmax(0,1fr)_auto]"
                                                >
                                                    <div className="relative h-16 overflow-hidden rounded-md bg-zinc-900 sm:h-[4.75rem]">
                                                        <MotionImage
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-[12px] font-semibold text-white sm:text-sm">
                                                            {item.title}
                                                        </h3>
                                                        <span className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.68rem] font-semibold text-zinc-400">
                                                            {item.tag}
                                                        </span>
                                                    </div>

                                                    <span className="justify-self-end text-xs font-semibold text-emerald-300">
                                                        {item.year}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-8 text-center text-sm text-zinc-500">
                                            No matching projects.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {visibleOtherProjects.map((otherProject) => (
                        <motion.div key={otherProject.slug} variants={itemVariants}>
                            <Link
                                href={`/projects/${otherProject.slug}`}
                                className="group block overflow-hidden rounded-lg border border-white/10 bg-zinc-950/60 transition-colors hover:border-emerald-500/35 hover:bg-zinc-900/70"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                                    <MotionImage
                                        src={otherProject.image}
                                        alt={otherProject.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    />
                                    <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-zinc-950">
                                        {otherProject.tag}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {otherProject.techStack
                                            .slice(0, 2)
                                            .map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[0.68rem] font-semibold text-zinc-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>

                                    <div className="mb-2 text-xs font-semibold text-emerald-300">
                                        {otherProject.year}
                                    </div>

                                    <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-white">
                                        {otherProject.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                                        {otherProject.subtitle}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {visibleOtherProjects.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-white/10 px-4 py-10 text-center text-sm text-zinc-500">
                        No matching projects.
                    </div>
                ) : null}

                {hasMoreOtherProjects ? (
                    <div className="flex justify-center pt-6">
                        <button
                            type="button"
                            onClick={handleLoadMoreProjects}
                            className="cursor-pointer rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            Load more
                        </button>
                    </div>
                ) : null}
            </motion.section>
        </motion.div>
    );
}
