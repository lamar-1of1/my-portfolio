/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { GithubIcon } from "hugeicons-react";

import type { ProjectItem } from "@/lib/content/projects";

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
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid gap-5 border-t border-dashed border-white/10 py-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-10">
            <h2 className="text-sm font-semibold tracking-tight text-white">
                {title}
            </h2>

            <div className="max-w-3xl text-sm leading-7 text-zinc-400">
                {children}
            </div>
        </section>
    );
}

export function ProjectDetailPage({
    project,
    otherProjects,
}: {
    project: ProjectItem;
    otherProjects: ProjectItem[];
}) {
    return (
        <div className="mx-auto w-full max-w-6xl px-0 pb-20 pt-24 text-white md:px-8 md:pt-28 lg:px-12">
            <Link
                href="/#featured-projects"
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium uppe/rcase tra/cking-[0.12em] text-zinc-500 transition-colors hover:text-white"
            >
                <MoveLeft size={14} />
                Back to Projects
            </Link>

            <article>
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                    <div className="relative aspect-[16/10] md:aspect-[16/7]">
                        <img
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
                </div>

                <header className="py-7">
                    <p className="mb-3 text-sm font-medium up/percase trackin/g-[0.12em] text-emerald-300">
                        {project.tag}
                    </p>

                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                        <div>
                            <h1 className="max-w-6xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                                {project.title}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base md:leading-7">
                                {project.subtitle}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                            >
                                Start a project
                                <ArrowUpRight size={15} />
                            </Link> */}
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
                </header>

                <DetailRow title="Overview">
                    <p>{project.overview}</p>

                    <dl className="mt-8 grid gap-5 text-xs sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Year", project.year],
                            ["Client", project.client],
                            ["Industry", project.industry],
                            ["Timeline", project.timeline],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <dt className="mb-1 font-semibold text-zinc-600">
                                    {label}
                                </dt>
                                <dd className="font-semibold text-white">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.services.map((service) => (
                            <span
                                key={service}
                                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-zinc-300"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </DetailRow>

                <DetailRow title="My Role">
                    <p>{project.myRole}</p>
                </DetailRow>

                <DetailRow title="Problems">
                    <p>{project.problems}</p>
                </DetailRow>

                <DetailRow title="Solutions">
                    <p>{project.solutions}</p>
                </DetailRow>

                <DetailRow title="Outcome">
                    <p>{project.outcome}</p>
                </DetailRow>
            </article>

            <section className="border-t border-dashed border-white/10 pt-9">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold tracking-tight text-white">
                        Other Projects
                    </h2>
                    <Link
                        href="/#featured-projects"
                        className="text-sm font-semibold uppe/rcase tra/cking-[0.12em] text-zinc-500 transition-colors hover:text-white"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {otherProjects.map((otherProject) => (
                        <Link
                            key={otherProject.slug}
                            href={`/projects/${otherProject.slug}`}
                            className="group overflow-hidden rounded-lg border border-white/10 bg-zinc-950/60 transition-colors hover:border-emerald-500/35 hover:bg-zinc-900/70"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                                <img
                                    src={otherProject.image}
                                    alt={otherProject.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-zinc-950">
                                    {otherProject.tag}
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {otherProject.techStack.slice(0, 2).map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[0.68rem] font-semibold text-zinc-400"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-base font-semibold tracking-tight text-white">
                                    {otherProject.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
