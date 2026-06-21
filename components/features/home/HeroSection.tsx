import Link from "next/link";
import {
    LayoutGrid,
    UserRoundCheck,
    Zap,
} from "lucide-react";

import { socialLinks } from "./home-content";

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative z-[45] -mx-8 -mt-24 min-h-dvh overflow-hidden bg-black md:-mt-28"
        >
            <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-8 pb-12 pt-28 md:px-12 md:pb-16 md:pt-36 lg:px-16">
                <header className="relative overflow-hidden rounded-none border-y border-dashed border-white/10 bg-zinc-950/40 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex min-h-14 flex-col items-start justify-between gap-5 border-b border-dashed border-white/10 px-4 py-6 text-sm font-medium text-zinc-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-7">
                        <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Available for projects
                        </span>

                        {/* <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600">
                            Barbados / Remote
                        </span> */}
                    </div>

                    <div className="grid min-h-[180px] sm:min-h-[210px] md:grid-cols-[minmax(0,1fr)_14rem] lg:grid-cols-[minmax(0,1fr)_16rem]">
                        <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-4 sm:p-5 md:border-b-0 md:border-r md:p-6">
                            <div>
                                {/* <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                    Who am I?
                                </p> */}

                                <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                                    Product designer and Full-stack Developer.
                                </h1>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                                    Building polished portfolio systems, product pages, and
                                    interactive web experiences with clean structure, motion,
                                    and responsive detail.
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
                                                className="transition-transform duration-300 group-hover/social:-translate-y-0.5"
                                            />
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                    </div>
                </header>

                <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative flex min-h-[9.5rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-h-[10rem] sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-300">
                                    <LayoutGrid size={15} />
                                </span>
                                <span className="text-sm font-semibold text-zinc-400">
                                    Selected Work
                                </span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-end gap-2 tracking-tight text-white">
                                <span className="text-4xl font-semibold leading-none">
                                    01
                                </span>
                                <span className="pb-0.5 text-4xl font-semibold leading-none">
                                    Project
                                </span>
                            </div>
                            <p className="mt-2 text-xs leading-5 text-zinc-500">
                                Product-style builds covering responsive
                                layouts, project detail pages, and polished interaction
                                states.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex min-h-[9.5rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-h-[10rem] sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-300">
                                    <UserRoundCheck size={15} />
                                </span>
                                <span className="text-sm font-semibold text-zinc-400">
                                    Current Role
                                </span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-baseline gap-2 text-3xl font-semibold leading-none tracking-tight text-white">
                                2025 - Present
                                {/* <span className="rounded border border-emerald-900/60 bg-emerald-950/50 px-1.5 py-0.5 font-mono text-xs text-emerald-500">
                                    ACTIVE
                                </span> */}
                            </div>
                            <p className="mt-2 text-xs leading-5 text-zinc-500">
                                Supporting a public-facing DEO website with frontend
                                development, content structure, and production upkeep.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex min-h-[9.5rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-h-[10rem] sm:p-5 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-300">
                                    <Zap size={15} />
                                </span>
                                <span className="text-sm font-semibold text-zinc-400">
                                    Focus
                                </span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="text-3xl font-semibold leading-none tracking-tight text-white">
                                Responsive UI
                            </div>
                            <p className="mt-2 text-xs leading-5 text-zinc-500">
                                Clean layouts, accessible interaction states, mobile-first
                                structure, and performance-conscious frontend work.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
