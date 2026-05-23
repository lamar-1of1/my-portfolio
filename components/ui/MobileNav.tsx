"use client";

import { useEffect, useState } from "react";
import {
    Grip,
    X,
    Home,
    User,
    FolderKanban,
    Mail,
    FileText,
    Command,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { TopBlur } from "@/components/ui/edge-blur";

const navItems = [
    {
        id: "home",
        label: "Home",
        icon: Home,
        keybind: "H",
    },
    {
        id: "about",
        label: "About",
        icon: User,
        keybind: "A",
    },
    {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
        keybind: "P",
    },
    {
        id: "contact",
        label: "Contact",
        icon: Mail,
        keybind: "C",
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

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("home");

    const activeNav =
        navItems.find((item) => item.id === activeItem) || navItems[0];

    const ActiveIcon = activeNav.icon;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedKey = event.key.toLowerCase();

            const matchedItem = navItems.find(
                (item) => item.keybind.toLowerCase() === pressedKey
            );

            if (matchedItem) {
                setActiveItem(matchedItem.id);
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
            <TopBlur height={80} />

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
                    className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#262626] bg-black/45 shadow-2xl backdrop-blur-3xl"
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

                                        return (
                                            <motion.button
                                                key={item.id}
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
                                                onClick={() => {
                                                    setActiveItem(item.id);
                                                    setIsOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                                                    activeItem === item.id
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
                                                <div className="flex items-center gap-1.5">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)]">
                                                        <Command
                                                            size={11}
                                                            className="text-white/45"
                                                        />
                                                    </div>

                                                    <kbd className="flex h-6 min-w-[28px] items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-2 text-[11px] font-medium uppercase tracking-wide text-white/55 shadow-[0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)]">
                                                        {item.keybind}
                                                    </kbd>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Quick Links */}
                                <div className="border-t border-[#262626]/70 p-3">
                                    <p className="mb-3 px-1 text-[11px] uppercase tracking-[0.2em] text-white/35">
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
                                        key={activeItem}
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
                                            size={15}
                                            className="text-white/80"
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
