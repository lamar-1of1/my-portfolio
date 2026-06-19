import { Link as LinkIcon } from "lucide-react";

import { aboutJourney, aboutToolkit } from "./home-content";

export function AboutSection() {
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
                            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
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
                <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                    <span className="text-white">My Journey</span>
                </div>

                <div className="grid overflow-hidden rounded-lg border border-dashed border-white/10 bg-[#0f0f0f] md:grid-cols-2">
                    {aboutJourney.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="group relative min-h-[11rem] overflow-hidden border-b border-dashed border-white/10 p-5 transition-all duration-500 last:border-b-0 hover:bg-white/[0.025] md:border-b-0 md:border-r md:last:border-r-0"
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/[0.03] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10 flex items-center justify-between gap-4">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/30 text-zinc-400 transition-all duration-500 group-hover:border-emerald-500/30 group-hover:text-emerald-300">
                                        <Icon size={15} />
                                    </span>

                                    <span className="text-sm font-bold text-zinc-600">
                                        {item.period}
                                    </span>
                                </div>

                                <h3 className="relative z-10 mt-5 text-sm font-medium text-white transition-colors duration-500">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 mt-3 text-sm font-medium leading-6 text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
                                    {item.copy}
                                    {"via" in item && item.via && (
                                        "href" in item && item.href ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-2 inline-flex items-center gap-1.5 text-white transition-colors hover:text-emerald-300"
                                            >
                                                <LinkIcon size={14} />
                                                {item.via}
                                            </a>
                                        ) : (
                                            <span className="mt-2 block text-white">
                                                {item.via}
                                            </span>
                                        )
                                    )}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
