"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Link as LinkIcon } from "lucide-react";

import { aboutJourney, aboutToolkit } from "./home-content";

export function AboutSection() {
    const [openJourneyIndexes, setOpenJourneyIndexes] = useState<number[]>([]);

    const toggleJourney = (index: number) => {
        setOpenJourneyIndexes((current) =>
            current.includes(index)
                ? current.filter((openIndex) => openIndex !== index)
                : [...current, index],
        );
    };

    return (
        <section
            id="about"
            className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden bg-black px-0 py-14 md:px-8 md:py-20 lg:px-12"
        >
            <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-12 md:px-6">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <p className="text-sm font-medium text-white">About</p>
                    </div>

                    <span className="inline shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-zinc-500">
                        Who am I?
                    </span>
                </div>
            </div>

            <div className="w-full max-w-full overflow-hidden border-y border-dashed border-white/10">
                <div className="grid min-w-0 lg:grid-cols-[16.5rem_minmax(0,1fr)]">
                    <aside className="min-w-0 border-b border-dashed border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                        <div className="flex h-full min-w-0 flex-col justify-between gap-6">
                            <div className="min-w-0">
                                <h3 className="text-lg font-semibold leading-tight text-white">
                                    Designer & Full Stack Developer
                                </h3>

                                <p className="mt-2 max-w-full text-sm leading-relaxed text-zinc-400">
                                    Creating thoughtful digital experiences from Barbados.
                                </p>
                            </div>

                            {/* <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.025] p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                    Current focus
                                </p>
                                <p className="mt-2 text-sm leading-6 text-zinc-300">
                                    Clean interfaces, responsive systems, and product pages
                                    that feel polished without feeling heavy.
                                </p>
                            </div> */}
                        </div>
                    </aside>

                    <div className="min-w-0 p-5 sm:p-6 lg:p-7">
                        <div className="max-w-4xl space-y-4 break-words text-sm font-normal leading-6 text-zinc-400">
                            <p>
                                I&apos;m a designer and developer based in Barbados with a
                                passion for creating digital experiences that are clear,
                                functional, and driven by impact.
                            </p>

                            <p>
                                I keep the process direct: understand the goal, design the
                                system, build the experience, then refine until the final
                                result feels calm, fast, and ready to use.
                            </p>
                        </div>

                        <div className="pt-6">
                            <div className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide">
                                <span className="text-white">Tech Stack</span>
                            </div>

                            <div className="relative max-w-full overflow-hidden py-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black via-black/80 to-transparent" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black via-black/80 to-transparent" />

                                <div className="tech-stack-marquee flex w-max gap-2">
                                    {[...aboutToolkit, ...aboutToolkit].map(
                                        (tool, index) => {
                                            const Icon = tool.icon;

                                            return (
                                                <span
                                                    key={`${tool.label}-${index}`}
                                                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 bg-black/35 px-3.5 text-xs font-bold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                                                    aria-hidden={
                                                        index >= aboutToolkit.length
                                                    }
                                                >
                                                    <Icon
                                                        size={15}
                                                        className="text-emerald-300"
                                                    />
                                                    {tool.label}
                                                </span>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-7">
                {/* <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                    <span className="text-white">My Journey</span>
                </div> */}

                <div className="overflow-hidden border-b border-dashed border-white/10 bg-[#050505]">
                    <div className="border-b border-dashed border-white/10 px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-white">
                                Experience Timeline
                            </p>
                            {/* <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600">
                                Tap any row to expand
                            </p> */}
                        </div>
                    </div>

                    <div className="min-w-0">
                        {aboutJourney.map((item, index) => {
                            const Icon = item.icon;
                            const isOpen = openJourneyIndexes.includes(index);

                            return (
                                <article
                                    key={item.title}
                                    className={`group relative overflow-hidden border-b border-dashed border-white/10 transition-colors duration-300 last:border-b-0 ${
                                        isOpen
                                            ? "bg-white/[0.025]"
                                            : "hover:bg-white/[0.015]"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => toggleJourney(index)}
                                        className="relative z-10 grid w-full min-w-0 cursor-pointer grid-cols-[4rem_minmax(0,1fr)_1.25rem] gap-x-4 px-5 py-5 text-left sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-6"
                                    >
                                        <span className="col-span-2 col-start-1 row-start-1 flex min-w-0 items-start gap-4 sm:col-span-2 sm:col-start-1 sm:row-start-auto sm:items-center">
                                            <span
                                                aria-hidden="true"
                                                className={`relative flex h-12 w-16 shrink-0 items-center justify-center transition-colors duration-300 sm:h-14 sm:w-20 ${
                                                    isOpen
                                                        ? "text-emerald-300"
                                                        : "text-zinc-500 group-hover:text-zinc-300"
                                                }`}
                                            >
                                                {"logoSrc" in item && item.logoSrc ? (
                                                    <Image
                                                        src={item.logoSrc}
                                                        alt={`${item.company} logo`}
                                                        width={56}
                                                        height={56}
                                                        className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                                                    />
                                                ) : (
                                                    <Icon
                                                        size={30}
                                                        strokeWidth={1.8}
                                                        className="sm:h-[34px] sm:w-[34px]"
                                                    />
                                                )}
                                            </span>

                                            <span className="min-w-0">
                                                {"status" in item && item.status && (
                                                    <span className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                                                        {item.status}
                                                    </span>
                                                )}
                                                {/* <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600">
                                                    <Icon size={13} />
                                                    {item.company}
                                                </span> */}
                                                <span
                                                    className={`block text-lg font-semibold tracking-tight transition-colors duration-300 ${
                                                        isOpen
                                                            ? "text-white"
                                                            : "text-zinc-300 group-hover:text-white"
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>
                                                <span className="mt-1 block text-sm font-medium leading-5 text-zinc-500">
                                                    {item.period}
                                                    <span className="px-1.5 text-zinc-700">
                                                        /
                                                    </span>
                                                    {"location" in item && item.location
                                                        ? item.location
                                                        : "Barbados"}
                                                </span>
                                            </span>
                                        </span>

                                        <ChevronDown
                                            size={18}
                                            className={`col-start-3 row-start-1 mt-1 shrink-0 justify-self-end text-white transition-transform duration-300 sm:col-start-3 sm:row-start-auto sm:mt-0.5 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-5 sm:px-6">
                                                <p className="text-sm font-medium leading-6 text-zinc-500">
                                                    {item.copy}
                                                </p>

                                                {"via" in item && item.via && (
                                                    "href" in item && item.href ? (
                                                        <a
                                                            href={item.href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-emerald-300"
                                                        >
                                                            <LinkIcon size={14} />
                                                            {item.via}
                                                        </a>
                                                    ) : (
                                                        <span className="mt-3 block text-sm font-semibold text-white">
                                                            {item.via}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
