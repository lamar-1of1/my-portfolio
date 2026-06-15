"use client";

import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRef, useState, type FormEvent, type PointerEvent } from "react";
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
    Download,
    GraduationCap,
    LayoutGrid,
    MessageSquare,
    Palette,
    UserRoundCheck,
    Wind,
    Zap,
} from "lucide-react";
import { GithubIcon, Linkedin02Icon, NewTwitterIcon } from "hugeicons-react";

import { cardData } from "@/lib/content/projects";

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];
const hCaptchaSiteKey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
// Block links, scripts, and HTML before sending form content.
const blockedContactContentPattern =
    /(<\s*\/?\s*script\b|<\/?[a-z][\s\S]*>|javascript\s*:|data\s*:|vbscript\s*:|https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,}(?:\/|\b))/i;
const blockedEmailContentPattern =
    /(<\s*\/?\s*script\b|<\/?[a-z][\s\S]*>|javascript\s*:|data\s*:|vbscript\s*:|https?:\/\/|www\.)/i;
const validNamePattern = /^[\p{L}\s-]*$/u;

type ContactFormField = "name" | "email" | "message";

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
    liveUrl: `/projects/${project.slug}`,
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
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "new") {
        return "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";
    }

    if (normalizedStatus.includes("progress")) {
        return "border-amber-400/25 bg-amber-400/10 text-amber-200";
    }

    return "border-white/10 bg-white/[0.035] text-zinc-300";
}

export function HomePage() {
    const mobilePointerStartX = useRef<number | null>(null);
    const mobilePointerStartY = useRef<number | null>(null);
    const hCaptchaRef = useRef<HCaptcha>(null);

    const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
    const [mobileDirection, setMobileDirection] = useState(1);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [contactFormStatus, setContactFormStatus] = useState<
        | "idle"
        | "submitting"
        | "success"
        | "error"
        | "captcha"
        | "blocked"
        | "name"
    >("idle");
    const [hCaptchaToken, setHCaptchaToken] = useState("");

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const activeMobileProject = featuredProjects[mobileProjectIndex];
    const activeProject = featuredProjects[activeProjectIndex];

    const activeProjectNumber = (activeProjectIndex + 1)
        .toString()
        .padStart(2, "0");

    const variants = slideUp(direction);

    const hasBlockedContactContent = (
        value: string,
        field: ContactFormField = "message",
    ) =>
        field === "email"
            ? blockedEmailContentPattern.test(value)
            : blockedContactContentPattern.test(value);

    const isValidContactName = (value: string) => validNamePattern.test(value);

    // Reject invalid field content before it reaches form state.
    const updateContactFormField = (
        field: ContactFormField,
        value: string,
    ) => {
        if (field === "name" && !isValidContactName(value)) {
            setContactFormStatus("name");
            return;
        }

        if (hasBlockedContactContent(value, field)) {
            setContactFormStatus("blocked");
            return;
        }

        setContactForm((current) => ({
            ...current,
            [field]: value,
        }));
        setContactFormStatus("idle");
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

    const goToMobileProject = (step: -1 | 1) => {
        setMobileDirection(step);
        setMobileProjectIndex(
            (current) =>
                (current + step + featuredProjects.length) %
                featuredProjects.length,
        );
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

    const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        // Re-check validation before sending anything to Web3Forms.
        const hasInvalidName = !isValidContactName(contactForm.name);
        const hasBlockedContent =
            hasBlockedContactContent(contactForm.name, "name") ||
            hasBlockedContactContent(contactForm.email, "email") ||
            hasBlockedContactContent(contactForm.message, "message");

        if (!accessKey) {
            setContactFormStatus("error");
            return;
        }

        if (hasInvalidName) {
            setContactFormStatus("name");
            return;
        }

        if (hasBlockedContent) {
            setContactFormStatus("blocked");
            return;
        }

        if (!hCaptchaToken) {
            setContactFormStatus("captcha");
            return;
        }

        setContactFormStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `Project inquiry from ${contactForm.name}`,
                    from_name: "Portfolio Contact Form",
                    name: contactForm.name,
                    email: contactForm.email,
                    message: contactForm.message,
                    "h-captcha-response": hCaptchaToken,
                    botcheck: "",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                hCaptchaRef.current?.resetCaptcha();
                setHCaptchaToken("");
                setContactFormStatus("error");
                return;
            }

            hCaptchaRef.current?.resetCaptcha();
            setHCaptchaToken("");
            setContactFormStatus("success");
            setContactForm({
                name: "",
                email: "",
                message: "",
            });
        } catch {
            hCaptchaRef.current?.resetCaptcha();
            setHCaptchaToken("");
            setContactFormStatus("error");
        }
    };

    return (
        <div className="relative overflow-hidden bg-black pt-24 text-white selection:bg-white selection:text-black md:pt-28">
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

            <section
                id="featured-projects"
                className="relative z-20 mx-auto max-w-7xl bg-black px-0 py-14 md:px-8 md:py-16 lg:px-12"
            >
                <div className="mb-16 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-24 md:px-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
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
                        className="flex justify-center overflow-hidden px-5 pb-4"
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
                                className="group w-[84vw] max-w-[23rem] shrink-0 cursor-default touch-pan-y overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-[#1b1b1b]"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                                    <img
                                        src={activeMobileProject.image}
                                        alt={activeMobileProject.title}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                    <div className="absolute left-4 top-4 flex items-center gap-2">
                                        <span className="rounded-full border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#262626]">
                                            {(mobileProjectIndex + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>

                                        <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                            {activeMobileProject.tag}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                                        <span>{activeMobileProject.year}</span>

                                        <span
                                            className={`rounded-full border px-2.5 py-1 text-[0.68rem] normal-case tracking-normal ${getProjectStatusClass(
                                                activeMobileProject.projectStatus,
                                            )}`}
                                        >
                                            {activeMobileProject.projectStatus}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                                        {activeMobileProject.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                                        {activeMobileProject.outcome}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {activeMobileProject.techStack
                                            .slice(0, 3)
                                            .map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-zinc-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>

                                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
                                        <Link
                                            href={activeMobileProject.liveUrl}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                                        >
                                            Read more
                                            <ArrowUpRight size={15} />
                                        </Link>

                                        <a
                                            href={activeMobileProject.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="GitHub"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            <GithubIcon size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        </AnimatePresence>
                    </div>

                    <div className="mt-3 flex justify-end gap-2 px-5">
                        <button
                            type="button"
                            onClick={() => goToMobileProject(-1)}
                            aria-label="Previous project"
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                        >
                            <ChevronLeft size={18} />
                        </button>

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

                <div className="relative hidden pt-8 md:block">
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-[34rem] lg:min-h-[30rem] xl:min-h-[31rem]">
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
                                        transition={{
                                            duration: 0.45,
                                            ease: easeCurve,
                                        }}
                                        className="absolute h-full min-h-[34rem] rounded-xl border border-dashed border-white/10 bg-[#141414] shadow-[0_24px_70px_rgba(0,0,0,0.28)] lg:min-h-[30rem] xl:min-h-[31rem]"
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

                    <article className="relative z-10 flex min-h-[34rem] min-w-0 flex-col overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#171717] shadow-[0_24px_80px_rgba(0,0,0,0.32)] lg:min-h-[30rem] xl:min-h-[31rem]">
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

                        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
                            <aside className="flex min-h-0 min-w-0 flex-col gap-5 border-b border-dashed border-white/10 bg-[#111111] p-4 lg:border-b-0 lg:border-r lg:p-5">
                                <div className="min-w-0">
                                    <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 md:aspect-[16/7] lg:aspect-[16/9] xl:aspect-[16/10]">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.img
                                                key={activeProject.id}
                                                src={activeProject.image}
                                                alt={activeProject.title}
                                                className="absolute inset-0 h-full w-full object-cover"
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
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.18 },
                                            }}
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
                                                className="ma/x-w-xs text-xl font-medium leading-tight tracking-tight text-white/75"
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
                                        className="grid content-start gap-2 border-t border-dashed border-white/10 pt-4 text-sm lg:mt-auto"
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

                            <div className="flex min-h-0 min-w-0 flex-col p-4">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid size={16} className="text-zinc-500" />
                                        <h3 className="text-sm font-medium tracking-tight text-white/75">
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
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.18 },
                                        }}
                                        className="grid min-h-0 min-w-0 flex-1 content-start gap-3 sm:grid-cols-2 md:grid-cols-[minmax(0,1.15fr)_minmax(12rem,0.85fr)] md:grid-rows-[auto_auto] lg:grid-cols-[minmax(0,1.25fr)_minmax(13rem,0.75fr)] xl:grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)]"
                                    >
                                        <motion.section
                                            variants={variants}
                                            className="flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4 sm:col-span-2 md:col-span-1 md:row-span-2 lg:p-5"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Summary
                                            </p>

                                            <p className="mt-4 li/ne-clamp-3 text-sm leading-6 text-zinc-400">
                                                {activeProject.subtitle}
                                            </p>
                                        </motion.section>

                                        <motion.section
                                            variants={variants}
                                            className="flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4"
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

                                        <motion.section
                                            variants={variants}
                                            className="flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-white/10 bg-[#111111] p-4"
                                        >
                                            <p className="text-sm font-semibold text-zinc-500">
                                                Links
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center gap-3">
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
                                        </motion.section>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

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
                                    functional, and driven by impact. I build polished portfolio
                                    systems, product pages, and interactive web experiences that
                                    help ideas feel easier to understand.
                                </p>

                                <p>
                                    My work sits between visual design and production frontend. I
                                    shape interfaces from structure to launch, moving through user
                                    flows, responsive layouts, design systems, and the interaction
                                    details that make a page feel considered.
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

                    <div className="grid overflow-hidden rounded-lg border border-dashed border-white/10 bg-[#0f0f0f] md:grid-cols-3">
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

                                        <span className="text-xs font-bold text-zinc-600">
                                            {item.period}
                                        </span>
                                    </div>

                                    <h3 className="relative z-10 mt-5 text-sm font-medium text-white transition-colors duration-500">
                                        {item.title}
                                    </h3>

                                    <p className="relative z-10 mt-3 text-sm font-semibold leading-6 text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
                                        {item.copy}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                id="contact"
                className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden bg-black px-0 pb-14 pt-4 md:px-8 md:pb-20 lg:px-12"
            >
                <div className="mb-8 border-y border-dashed border-white/10 bg-zinc-950 px-5 py-4 md:mb-12 md:px-6">
                    <div className="flex min-w-0 items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <p className="text-sm font-medium text-white">Contact</p>
                        </div>

                        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.02em] text-zinc-500">
                            Let&apos;s build
                        </span>
                    </div>
                </div>

                <div className="grid overflow-hidden border-y border-dashed border-white/10 lg:grid-cols-[minmax(0,1fr)_24rem]">
                    <aside className="border-b border-dashed border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                                Start a project
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                Have an idea that needs a sharper interface?
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-zinc-400">
                                Send the details and I&apos;ll get your message directly
                                in my inbox.
                            </p>
                        </div>
                    </aside>

                    <aside className="p-5 sm:p-6 lg:p-8">
                        <form onSubmit={handleContactSubmit} className="grid gap-4">
                            <div className="flex items-center gap-3 text-sm font-semibold text-white">
                                <MessageSquare
                                    size={16}
                                    className="text-emerald-300"
                                />
                                Send me a message
                            </div>

                            <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={(event) => {
                                        updateContactFormField(
                                            "name",
                                            event.target.value,
                                        );
                                    }}
                                    required
                                    autoComplete="name"
                                    className="h-12 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={(event) => {
                                        updateContactFormField(
                                            "email",
                                            event.target.value,
                                        );
                                    }}
                                    required
                                    autoComplete="email"
                                    className="h-12 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                What are we building?
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={(event) => {
                                        updateContactFormField(
                                            "message",
                                            event.target.value,
                                        );
                                    }}
                                    required
                                    rows={6}
                                    className="resize-none rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-emerald-400/[0.03]"
                                    placeholder="Share the idea, timeline, or what feels stuck."
                                />
                            </label>

                            <div className="max-w-full overflow-hidden">
                                <HCaptcha
                                    ref={hCaptchaRef}
                                    sitekey={hCaptchaSiteKey}
                                    reCaptchaCompat={false}
                                    theme="dark"
                                    onVerify={(token) => {
                                        setHCaptchaToken(token);
                                        setContactFormStatus("idle");
                                    }}
                                    onExpire={() => {
                                        setHCaptchaToken("");
                                    }}
                                    onError={() => {
                                        setHCaptchaToken("");
                                        setContactFormStatus("error");
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={contactFormStatus === "submitting"}
                                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:text-zinc-200"
                            >
                                {contactFormStatus === "submitting"
                                    ? "Sending..."
                                    : "Send message"}
                                <ArrowUpRight size={15} />
                            </button>

                            {contactFormStatus === "success" && (
                                <p className="text-xs font-medium text-emerald-300">
                                    Message sent. I&apos;ll get back to you soon.
                                </p>
                            )}

                            {contactFormStatus === "error" && (
                                <p className="text-xs font-medium text-red-300">
                                    Something went wrong. Please try again.
                                </p>
                            )}

                            {contactFormStatus === "captcha" && (
                                <p className="text-xs font-medium text-amber-200">
                                    Please complete the captcha before sending.
                                </p>
                            )}

                            {contactFormStatus === "blocked" && (
                                <p className="text-xs font-medium text-amber-200">
                                    Links and scripts are not allowed in this form.
                                </p>
                            )}

                            {contactFormStatus === "name" && (
                                <p className="text-xs font-medium text-amber-200">
                                    Names can only include letters, spaces, and hyphens.
                                </p>
                            )}
                        </form>
                    </aside>
                </div>
            </section>
        </div>
    );
}
