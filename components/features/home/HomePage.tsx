"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import ScalesContainerDemo from "@/components/scales-container-demo";
// import { AboutSections } from "@/components/features/about/components/AboutSections";
import Footer from "@/components/ui/footer";
import { heroContent } from "@/components/features/home/data/home";
import { trackEvent } from "@/lib/analytics";

const AnimatedWord = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((previous) => (previous + 1) % heroContent.words.length);
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex items-center justify-center overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={heroContent.words[current]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block w-32 px-2 text-center font-semibold tracking-wide text-white/90"
                >
                    {heroContent.words[current]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default function HomePage() {
    return (
        <main className="relative min-h-screen bg-[var(--color-bg)] text-white">
            <div className="grid min-h-screen grid-cols-[32px_1fr_32px]">
                <aside className="relative border-r border-white/10">
                    <div className="absolute inset-0 h-full">
                        <ScalesContainerDemo />
                    </div>
                </aside>

                <div className="flex min-h-screen flex-col">
                    <section className="space-y-8 pt-24">
                        <div className="px-4 md:px-20">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 shadow-inner backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                Available for new projects
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="py-8 text-start"
                            >
                                <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                    {heroContent.title}
                                </h1>
                                <p className="max-w-3xl text-lg leading-9 text-zinc-300">
                                    I&apos;m an <AnimatedWord /> developer and designer crafting{" "}
                                    {heroContent.description}
                                </p>
                            </motion.div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href="/projects"
                                    onClick={() => trackEvent("cta_projects_click")}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-95"
                                >
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                    <span>View Projects</span>
                                </Link>

                                <a
                                    href="/cv.pdf"
                                    download
                                    onClick={() => trackEvent("cta_cv_download")}
                                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
                                >
                                    <Download className="h-4 w-4" aria-hidden="true" />
                                    <span>Download CV</span>
                                </a>
                            </div>
                        </div>

                        {/* <AboutSections /> */}

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
                                    onClick={() => trackEvent("cta_projects_bottom_click")}
                                    className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                                >
                                    <span>Projects</span>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </div>

                <aside className="relative border-l border-white/10">
                    <div className="absolute inset-0 h-full">
                        <ScalesContainerDemo />
                    </div>
                </aside>
            </div>

            <div className="px-4">
                <Footer />
            </div>
        </main>
    );
}
