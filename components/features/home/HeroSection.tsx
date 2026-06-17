import Link from "next/link";
import { LayoutGrid, UserRoundCheck, Zap } from "lucide-react";

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
                                    Product designer and frontend developer.
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
        
                        {/* <div className="flex flex-col justify-between p-4 sm:p-5 md:p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
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
                        </div> */}
                    </div>
                </header>
        
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex min-h-[12rem] flex-col justify-between rounded-xl border border-white/10 bg-zinc-950/55 p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-zinc-500">
                                Volume
                            </span>
                            <LayoutGrid size={16} className="text-zinc-500" />
                        </div>
        
                        <div className="mt-6">
                            <div className="text-4xl font-light tracking-tight text-white">
                                50+ Projects
                            </div>
                            <p className="mt-2 text-xs leading-normal text-zinc-500">
                                Shipped across product pages, portfolio systems, custom
                                interfaces, and standalone web builds.
                            </p>
                        </div>
                    </div>
        
                    <div className="flex min-h-[12rem] flex-col justify-between rounded-xl border border-white/10 bg-zinc-950/55 p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-zinc-500">
                                Retention
                            </span>
                            <UserRoundCheck size={16} className="text-zinc-500" />
                        </div>
        
                        <div className="mt-6">
                            <div className="flex items-baseline gap-2 text-4xl font-light tracking-tight text-white">
                                100%
                                <span className="rounded border border-emerald-900/60 bg-emerald-950/50 px-1.5 py-0.5 font-mono text-xs text-emerald-500">
                                    PASSED
                                </span>
                            </div>
                            <p className="mt-2 text-xs leading-normal text-zinc-500">
                                Clear client handoff, responsive polish, and detail-focused
                                production support.
                            </p>
                        </div>
                    </div>
        
                    <div className="flex min-h-[12rem] flex-col justify-between rounded-xl border border-white/10 bg-zinc-950/55 p-6 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-zinc-500">
                                Focus
                            </span>
                            <Zap size={16} className="text-zinc-500" />
                        </div>
        
                        <div className="mt-6">
                            <div className="text-4xl font-light tracking-tight text-white">
                                Fast UI
                            </div>
                            <p className="mt-2 text-xs leading-normal text-zinc-500">
                                Interfaces built around speed, hierarchy, accessibility, and
                                clean interaction moments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
