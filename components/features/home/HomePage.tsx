"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    Disc3,
    LayoutGrid,
    Layers3,
    Music2,
    PenTool,
    Radio,
    Sparkles,
    TerminalSquare,
    UserRoundCheck,
} from "lucide-react";
import { GithubIcon } from "hugeicons-react";

import { aboutCopy, aboutStats } from "@/lib/content/about";
import { cardData } from "@/lib/content/projects";
import { workExperience } from "@/lib/content/workExperience";
import Beams from "@/components/visual/Beams";

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
        skills: ["Node.js", "API routes", "Auth flows", "Database modeling", "Performance"],
    },
    {
        title: "Design",
        icon: PenTool,
        skills: ["Figma", "Design systems", "Interaction design", "Prototyping", "Visual polish"],
    },
];

const musicNotes = [
    "Soca and dancehall energy",
    "R&B details and atmosphere",
    "Afrobeats rhythm",
    "Lo-fi focus sessions",
];

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
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
                <p className="font-inter mb-4 inline-flex items-center ga/p-2 border-b-2 border-emerald-800 p/x-3 py-1.5 text-md font-medium text-emerald-300">
                    {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> */}
                    {kicker}
                </p>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                    {title}
                </h2>
            </div>
            {summary ? (
                <p className="max-w-md text-sm leading-6 text-zinc-400 md:text-base">
                    {summary}
                </p>
            ) : null}
        </div>
    );
}

export function HomePage() {
    const currentRole = workExperience[0];

    return (
        <div className="relative overflow-hidden bg-black text-white selection:bg-white selection:text-black pt-24 md:pt-28">
            <section className="relative z-[45] -mx-8 -mt-24 min-h-dvh overflow-hidden bg-black md:-mt-28">
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />
                    {/* <div className="absolute left-1/2 top-0 h-[520px] w-[140vw] -translate-x-1/2 overflow-hidden opacity-30 md:hidden">
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
                    </div> */}
                    <div className="absolute left-1/2 top-0 hidden h-[600px] w-[100vw] -translate-x-1/2 overflow-hidden opacity-45 md:block">
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
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),#000_82%)]" />
                </div>

                <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-8 pb-12 pt-20 md:px-12 md:pb-16 md:pt-40 lg:px-16">

                    <div className="border-b border-white/10 pb-10">
                        <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur-md">
                            <span className="relative grid h-2 w-2 shrink-0 place-items-center">
                                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span>Open to Remote Contracts</span>
                        </div>
                        {/* <h1 className="text-4xl font-extrabold up/percase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-6xl">
                            Lamar // Dev
                        </h1> */}
                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {/* <div className="flex flex-col justify-between py-2">
                            <p className="text-lg leading-relaxed text-zinc-400">
                                I deliver architectural engineering and interface solutions. Balancing high performance metrics with sharp visual design guidelines.
                            </p>
                            <div className="mt-8 flex items-center gap-3">
                                <Link href="/projects" className="h-11 rounded-lg bg-white px-5 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-zinc-200 transition-colors">
                                    Browse Core Stack
                                </Link>
                            </div>
                        </div> */}

                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">Volume</span>
                                <LayoutGrid size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight">50+ Projects</div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Shipped globally across enterprise platforms, custom APIs, and standalone web products.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">Retention</span>
                                <UserRoundCheck size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight flex items-baseline gap-2">
                                    100% <span className="text-xs font-mono text-emerald-500 bg-emerald-950/50 border border-emerald-900/60 px-1.5 py-0.5 rounded">PASSED</span>
                                </div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Maintained perfect client assessment outcomes backed by fluid, clear production support workflows.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 font-semibold">Volume</span>
                                <LayoutGrid size={16} className="text-zinc-500" />
                            </div>
                            <div className="mt-6">
                                <div className="text-4xl font-light text-white tracking-tight">50+ Projects</div>
                                <p className="mt-2 text-xs text-zinc-500 leading-normal">
                                    Shipped globally across enterprise platforms, custom APIs, and standalone web products.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* <section className="relative overflow-hidden border-b border-dashed border-white/10 pt-24 md:pt-28">
                <div className="absolute inset-0 opacity-35">
                    <img
                        src="/assets/brand-social-preview.jpg"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,199,44,0.20),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.96),rgba(0,0,0,0.74),rgba(0,0,0,0.92))]" />
                </div>

                <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-7 px-0 pb-12 md:grid-cols-[minmax(0,1.05fr)_360px] md:items-end md:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl"
                    >
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 text-sm font-semibold text-emerald-300">
                                <Sparkles size={15} />
                                Available for focused builds
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffc72c]/25 bg-[#ffc72c]/10 px-3.5 py-2 text-sm font-semibold text-[#ffc72c]">
                                Barbados based
                            </span>
                        </div>

                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 md:text-sm">
                            Lamar / Product designer and developer
                        </p>
                        <h1 className="max-w-4xl text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            I build sharp digital experiences with rhythm,
                            clarity, and motion.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
                            I design and develop modern web interfaces that feel
                            polished, fast, and intentional from the first scroll to
                            the final interaction.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-100"
                            >
                                <span>View featured work</span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight size={16} />
                                </span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/[0.08]"
                            >
                                Start a conversation
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.aside
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-1 overflow-hidden rounded-xl border border-dashed border-white/15 bg-zinc-950/70 backdrop-blur-xl"
                    >
                        <div className="border-b border-dashed border-white/10 p-4">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-900">
                                <img
                                    src={featuredProjects[0].image}
                                    alt={featuredProjects[0].title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                                Latest direction
                            </p>
                            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-white">
                                {featuredProjects[0].title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                {featuredProjects[0].outcome}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {featuredProjects[0].techStack.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-semibold text-zinc-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </section> */}

            <section id="featured-projects" className="mx-auto max-w-7xl px-0 py-18 md:px-8 md:py-24 lg:px-12">
                <SectionHeading
                    kicker="Featured Projects"
                    title="A few pieces of work with a clear job to do."
                    summary="Each project balances visual direction, usable structure, and implementation details that help the experience hold together."
                />

                <div className="grid gap-8 md:grid-cols-2">
                    {featuredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className="group overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#343434]/15 transition-colors duration-300 hover:bg-[#343434]/25 cursor-default"
                        >
                            <div className="relative aspect-[16/8] overflow-hidden bg-zinc-900 md:aspect-[16/7]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 h-full w-full object-cover sm:grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold tracking-normal text-[#262626] backdrop-blur-3xl">
                                    {(index + 1).toString().padStart(2, "0")} / {project.tag}
                                </span>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                    <span>{project.year}</span>
                                    <span>{project.projectStatus}</span>
                                </div>
                                <h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    {project.title}
                                </h3>
                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
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
                                        Live preview
                                        <ArrowUpRight size={15} />
                                    </Link>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.07]"
                                    >
                                        <GithubIcon size={15} />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="border-y border-dashed border-white/10 bg-[#343434]/10">
                <div className="mx-auto grid max-w-7xl gap-10 px-0 py-18 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24 lg:px-12">
                    <div>
                        <SectionHeading
                            kicker="About"
                            title="A designer-developer with a product eye and a frontend spine."
                        />
                        <div className="grid grid-cols-3 gap-3">
                            {aboutStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-dashed border-white/10 bg-black/35 p-4"
                                >
                                    <p className="text-2xl font-black text-white md:text-3xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-end">
                        <p className="text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                            {aboutCopy.titleLead}{" "}
                            <span className="text-zinc-500">{aboutCopy.titleEmphasis}</span>
                        </p>
                        <div className="mt-7 grid gap-5 text-base leading-7 text-zinc-400 md:grid-cols-2">
                            <p>{aboutCopy.paragraphOne}</p>
                            <p>{aboutCopy.paragraphTwo}</p>
                        </div>
                        <div className="mt-8 grid gap-3 md:grid-cols-3">
                            {["Interfaces with personality", "Clean component architecture", "Motion that supports the story"].map((strength) => (
                                <div
                                    key={strength}
                                    className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-zinc-300"
                                >
                                    {strength}
                                </div>
                            ))}
                        </div>
                        <p className="mt-7 rounded-xl border border-[#ffc72c]/20 bg-[#ffc72c]/10 p-5 text-sm leading-6 text-[#ffe08a]">
                            Currently working on polished portfolio systems,
                            full-stack product flows, and interaction details that
                            make websites feel more alive.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-0 py-18 md:px-8 md:py-24 lg:px-12">
                <SectionHeading
                    kicker="Experience"
                    title="Work shaped around thoughtful product design and reliable delivery."
                />

                {currentRole ? (
                    <article className="grid gap-6 border-y border-dashed border-white/10 py-8 md:grid-cols-[0.8fr_1.2fr] md:py-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">
                                {currentRole.startDate} - {currentRole.endDate}
                            </p>
                            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                                {currentRole.role}
                            </h3>
                            <p className="mt-2 text-zinc-400">
                                {currentRole.company} / {currentRole.location}
                            </p>
                        </div>
                        <div>
                            <p className="text-base leading-7 text-zinc-300">
                                {currentRole.description}
                            </p>
                            <div className="mt-6 grid gap-3">
                                {currentRole.achievements.map((achievement) => (
                                    <div
                                        key={achievement}
                                        className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-zinc-400"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                        <span>{achievement}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {currentRole.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs font-semibold text-zinc-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ) : null}
            </section>

            <section className="border-y border-dashed border-white/10 bg-[#343434]/10">
                <div className="mx-auto max-w-7xl px-0 py-18 md:px-8 md:py-24 lg:px-12">
                    <SectionHeading
                        kicker="Skills and tools"
                        title="The stack I reach for when a product needs to feel finished."
                    />

                    <div className="grid gap-4 md:grid-cols-3">
                        {skillGroups.map((group) => {
                            const Icon = group.icon;

                            return (
                                <article
                                    key={group.title}
                                    className="rounded-xl border border-dashed border-white/10 bg-black/35 p-5"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300">
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-white">
                                        {group.title}
                                    </h3>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-white/[0.055] px-3 py-1.5 text-sm font-medium text-zinc-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-0 py-18 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-24 lg:px-12">
                <div>
                    <SectionHeading
                        kicker="Music interest"
                        title="Music keeps the work moving."
                    />
                    <p className="max-w-xl text-base leading-7 text-zinc-400">
                        I like interfaces with timing, groove, and contrast. Music is
                        part of that process: a way to find momentum, shape pacing,
                        and stay close to the feeling behind the work.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {musicNotes.map((note, index) => {
                        const icons = [Radio, Music2, Disc3, Sparkles];
                        const Icon = icons[index];

                        return (
                            <div
                                key={note}
                                className="flex min-h-36 flex-col justify-between rounded-xl border border-dashed border-white/10 bg-[#343434]/15 p-5"
                            >
                                <Icon className="text-[#ffc72c]" size={24} />
                                <p className="mt-8 text-xl font-extrabold tracking-tight text-white">
                                    {note}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
