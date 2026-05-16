"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Aurora from "./effects/Aurora";

const cardContent = { title: "Hi, I'm Lamar" };
const animatedWords = ["innovative", "precise", "knowledgeable"];

const AnimatedWord = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % animatedWords.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex items-center justify-center overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={animatedWords[current]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-white/90 font-semibold tracking-wide px-2 rounded-md bg-white/10"
                >
                    {animatedWords[current]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const CardBody = ({ className = "p-4" }: { className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("text-start", className)}
    >
        <h3 className="text-3xl font-semibold mb-4 text-white tracking-tight">
            {cardContent.title}
        </h3>
        <p className="text-lg text-zinc-300 max-w-3xl leading-9">
            I’m an <AnimatedWord /> developer and designer crafting exceptional digital experiences.
        </p>
    </motion.div>
);

const PageBackground = () => {
    const Icon = ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            strokeWidth="1"
            stroke="currentColor"
            className={cn("text-white size-6 absolute", className)}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-10">
            <div className="relative h-full w-full border-l border-r border-white/10 bg-transparent">
                <Icon className="-top-3 -left-3" />
                <Icon className="-top-3 -right-3" />
                <Icon className="-bottom-3 -left-3" />
                <Icon className="-bottom-3 -right-3" />
                {/* <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" /> */}
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white py-10 px-12 md:px-40 font-sans">
            <motion.div
                className="absolute inset-0 z-0 h-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <Aurora
                    colorStops={["#00267F", "#FCD116", "#00267F"]}
                    blend={1}
                    amplitude={0.75}
                    speed={0.5}
                />
            </motion.div>
            <PageBackground />
            <div className="relative z-10 max-w-4xl space-y-8 pt-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200 border border-emerald-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for work
                </div>
                <CardBody className="p-0" />
            </div>
        </main>
    );
}
