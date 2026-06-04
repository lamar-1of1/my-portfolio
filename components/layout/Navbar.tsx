"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Grip,
    X,
    Home,
    User,
    FolderKanban,
    Mail,
    FileText,
    Command,
    Download,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { TopBlur } from "@/components/shared/TopBlur"

const navItems = [
    {
        id: "home",
        label: "Home",
        icon: Home,
        keybind: "H",
        href: "/",
    },
    {
        id: "about",
        label: "About",
        icon: User,
        keybind: "A",
        href: "/about",
    },
    {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
        keybind: "P",
        href: "/projects",
    },
    {
        id: "contact",
        label: "Contact",
        icon: Mail,
        keybind: "C",
        href: "/contact",
    },
];

const quickLinks = [
    {
        label: "Resume",
        icon: FileText,
        href: "/cv.pdf",
    },
];

const springConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    // Active item based on current route
    const activeNav =
        navItems.find((item) => item.href === pathname) || navItems[0];

    const ActiveIcon = activeNav.icon;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedKey = event.key.toLowerCase();

            const matchedItem = navItems.find(
                (item) => item.keybind.toLowerCase() === pressedKey
            );

            if (matchedItem) {
                window.location.href = matchedItem.href;

                setIsOpen(false);
            }

            if (pressedKey === "m") {
                setIsOpen((prev) => !prev);
            }

            if (pressedKey === "escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <TopBlur height={50} />

            <div className="fixed left-5 right-5 top-4 z-50 hidden justify-center sm:flex">
                <nav className="relative isolate flex w-full max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-[1.35rem] border border-white/10 bg-zinc-950/80 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-[#00267F] via-[#FFC72C] to-[#00267F] opacity-70"
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,199,44,0.07),transparent_24%),radial-gradient(circle_at_88%_0%,rgba(0,38,127,0.16),transparent_28%)]"
                    />

                    <Link
                        href="/"
                        className="group/brand relative z-10 flex min-w-0 items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-black/25 p-1.5 pr-2.5 text-white transition-colors hover:border-white/15 hover:bg-white/[0.04]"
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
                            <img
                                src="/icon-gif.gif"
                                alt="Lamar logo"
                                className="h-6 w-6 shrink-0"
                            />
                        </span>
                        <span className="hidden min-w-0 flex-col leading-none lg:flex">
                            <span className="text-xs font-semibold tracking-wide text-white/90">
                                Lamar
                            </span>
                            <span className="mt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-white/35">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.7)]" />
                                Available
                            </span>
                        </span>
                    </Link>

                    <div className="relative z-10 flex items-center gap-0.5 rounded-2xl border border-dashed border-white/10 bg-black/30 p-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-2.5 py-2 text-sm font-medium transition-colors duration-300 ease-out xl:px-3 ${isActive
                                        ? "text-white"
                                        : "text-white/45 hover:text-white/90"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="desktop-nav-active"
                                            className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                            transition={springConfig}
                                        />
                                    )}
                                    {!isActive && (
                                        <span className="absolute inset-0 rounded-xl bg-white/0 transition-colors duration-300 ease-out group-hover:bg-white/[0.04]" />
                                    )}
                                    <Icon
                                        size={16}
                                        className={`relative z-10 transition-colors duration-300 ease-out ${isActive ? "text-[#FFC72C]" : "text-white/35 group-hover:text-white/70"}`}
                                    />
                                    <span className="relative z-10">{item.label}</span>
                                    <kbd
                                        className={`relative z-10 hidden min-w-5 items-center justify-center rounded-md border px-1.5 py-0.5 font-sans text-[10px] font-semibold leading-none transition-colors lg:inline-flex ${isActive
                                            ? "border-[#FFC72C]/20 bg-[#FFC72C]/[0.06] text-[#FFC72C]/75"
                                            : "border-white/10 bg-white/[0.035] text-white/35 group-hover:border-white/15 group-hover:text-white/60"
                                            }`}
                                    >
                                        {item.keybind}
                                    </kbd>
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 z-10 h-px w-5 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFC72C] to-transparent" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <a
                        href="/cv.pdf"
                        download
                        className="group/resume relative z-10 inline-flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white px-2 py-1.5 pl-3 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        <span className="hidden md:inline">Resume</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-950 text-white transition-transform duration-300 group-hover/resume:translate-y-0.5">
                            <Download size={14} />
                        </span>
                    </a>
                </nav>
            </div>

            {/* Backdrop Blur */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center sm:hidden">
                <motion.div
                    layout
                    transition={springConfig}
                    className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#262626] bg-black/80 shadow-2xl backdrop-blur-3xl"
                >
                    {/* Expanded Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                    transition: {
                                        staggerChildren: 0.04,
                                        delayChildren: 0.08,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                        staggerChildren: 0.02,
                                        staggerDirection: -1,
                                    },
                                }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col gap-1 p-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;

                                        const isActive =
                                            pathname === item.href;

                                        return (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <motion.div
                                                    variants={{
                                                        open: {
                                                            opacity: 1,
                                                            y: 0,
                                                        },
                                                        closed: {
                                                            opacity: 0,
                                                            y: 10,
                                                        },
                                                    }}
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                    transition={springConfig}
                                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${isActive
                                                        ? "border-2 border-[#262626]/70 bg-[#262626]/30 text-white"
                                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                                        }`}
                                                >
                                                    {/* Left */}
                                                    <div className="flex items-center gap-3">
                                                        <Icon size={18} />

                                                        <span className="text-sm tracking-wide">
                                                            {item.label}
                                                        </span>
                                                    </div>

                                                    {/* Keybind */}
                                                    <div className="flex items-center">
                                                        <div className="flex h-6 items-center gap-1.5 rounded-lg border border-[#262626]/90 bg-[#343434]/20 px-2 shadow-[0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)]">
                                                            <Command
                                                                size={13}
                                                                className="text-white/45"
                                                            />

                                                            <kbd className="text-xs font-medium font-sans uppercase tracking-wide text-white/55">
                                                                {item.keybind}
                                                            </kbd>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Quick Links */}
                                <div className="border-t border-[#262626]/70 p-3">
                                    <p className="mb-3 px-1 text-sm font-medium text-white/35">
                                        Quick Links
                                    </p>

                                    <div className="grid grid-cols-1 gap-2">
                                        {quickLinks.map((link) => {
                                            const Icon = link.icon;

                                            return (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group flex items-center gap-3 rounded-2xl border border-[#262626]/70 bg-[#343434]/10 px-3 py-3 transition-all duration-200 hover:bg-white/5"
                                                >
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] transition-transform duration-200 group-hover:scale-105">
                                                        <Icon
                                                            size={18}
                                                            className="text-white/80"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-white/80">
                                                            {link.label}
                                                        </span>

                                                        <span className="text-xs text-white/35">
                                                            Download CV / Resume
                                                        </span>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-3 py-2">
                        {/* Left */}
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src="/icon-gif.gif"
                                alt="Logo"
                                className="h-8 w-8 shrink-0"
                            />

                            <div className="h-6 w-px bg-white/20" />

                            {/* Active Tab */}
                            <div className="flex items-center gap-2 overflow-hidden rounded-2xl border-2 border-[#262626]/70 bg-[#343434]/20 px-3 py-2 text-white">
                                <AnimatePresence
                                    mode="wait"
                                    initial={false}
                                >
                                    <motion.div
                                        key={activeNav.id}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -8,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <ActiveIcon
                                            size={17}
                                            className="text-white"
                                        />

                                        <span className="truncate text-sm capitalize text-white">
                                            {activeNav.label}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="ml-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#262626]/70 bg-[#343434]/20 text-white transition-all duration-200 hover:bg-white/10"
                        >
                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{
                                            rotate: -90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            rotate: 90,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                    >
                                        <X size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{
                                            rotate: 90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            rotate: -90,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                    >
                                        <Grip size={22} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
