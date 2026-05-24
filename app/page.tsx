"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

import { cn } from "@/lib/utils";
import ScalesContainerDemo from "@/components/scales-container-demo";
import { AboutSections } from "@/components/about/AboutSections";
import Footer from "@/components/ui/footer";

// Removed unused imports:
// import { contentContainer } from "@/components/about/layout";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import Model from "@/components/Model";

const cardContent = { title: "Hi, I'm Lamar" };

const animatedWords = ["innovative", "proactive", "adaptable"];

const AnimatedWord = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((previous) => (previous + 1) % animatedWords.length);
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
                    className="inline-block w-30 px-2 text-center font-semibold tracking-wide text-white/90"
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
        <h3 className="mb-4 text-3xl font-semibold tracking-tight text-white">
            {cardContent.title}
        </h3>

        <p className="max-w-3xl text-lg leading-9 text-zinc-300">
            I&apos;m an <AnimatedWord /> developer and designer crafting
            exceptional digital experiences with cutting-edge technologies and
            innovative solutions.
        </p>
    </motion.div>
);

export default function Home() {
    return (
        <main className="relative min-h-screen bg-black font-sans text-white">
            <div className="grid min-h-screen grid-cols-[32px_1fr_32px]">
                {/* Left Scale Bar */}
                <aside className="relative border-r border-[#343434]/50">
                    <div className="absolute inset-0 h-full">
                        <ScalesContainerDemo />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex min-h-screen flex-col">
                    <section className="space-y-8 pt-25">
                        <div className="px-4 md:px-20">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626]/60 bg-[#343434]/20 px-4 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 shadow-inner backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>

                                Available for new projects
                            </div>

                            <CardBody className="py-8" />

                            <div className="flex items-center gap-3">
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-95"
                                >
                                    <ArrowUpRight
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />

                                    <span>View Projects</span>
                                </Link>

                                <a
                                    href="/cv.pdf"
                                    download
                                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#262626]/70 bg-[#343434]/20 px-4 py-2 text-sm text-white/90 transition hover:bg-white/5"
                                >
                                    <Download
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />

                                    <span>Download CV</span>
                                </a>
                            </div>
                        </div>

                        <AboutSections />

                        {/* Bottom CTA Button */}
                        <div className="px-4 pb-20 md:px-20">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="flex justify-center"
                            >
                                <Link
                                    href="/projects"
                                    className="group inline-flex items-center gap-3 rounded-full border border-[#262626]/70 bg-[#343434]/20 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-[#262626] hover:bg-[#343434]/30"
                                >
                                    <span>Projects</span>

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#262626]/70 text-white/70">
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    {/* Footer */}
                    <Footer />
                </div>

                {/* Right Scale Bar */}
                <aside className="relative border-l border-[#343434]/50">
                    <div className="absolute inset-0 h-full">
                        <ScalesContainerDemo />
                    </div>
                </aside>
            </div>
        </main>
    );
}
