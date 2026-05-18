"use client";

import { useState } from "react";
import { Grip, X, Home, User, FolderKanban, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBlur } from "@/components/ui/edge-blur";

const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "contact", label: "Contact", icon: Mail },
];

const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 30,
};

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("home");

    const activeNav =
        navItems.find((item) => item.id === activeItem) || navItems[0];

    const ActiveIcon = activeNav.icon;

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

            <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-center">
                <motion.div
                    layout
                    transition={springConfig}
                    className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#262626] bg-black/45 backdrop-blur-3xl shadow-2xl"
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
                                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                                                    activeItem === item.id
                                                        ? "bg-[#262626]/30 border-2 border-[#262626]/70 text-white"
                                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                <Icon size={18} />

                                                <span className="text-sm tracking-wide">
                                                    {item.label}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-3 py-2">
                        {/* Left */}
                        <div className="flex items-center gap-3 min-w-0">
                            <img
                                src="/icon-gif.gif"
                                alt="Logo"
                                className="h-8 w-8 shrink-0"
                            />

                            <div className="h-6 w-px bg-white/20" />

                            {/* Active Tab */}
                            <div className="bg-[#343434]/20 border-2 border-[#262626]/70 text-white rounded-2xl px-3 py-2 flex items-center gap-2 overflow-hidden">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeItem}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
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
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <X size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
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
