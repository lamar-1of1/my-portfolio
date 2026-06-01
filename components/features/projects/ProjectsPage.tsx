"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { ProjectPreview } from "@/components/features/projects/ProjectPreview";
import { ProjectRow } from "@/components/features/projects/ProjectRow";
import Footer from "@/components/layout/Footer";
import { GuideRail } from "@/components/shared/GuideRail";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { cardData } from "@/lib/content/projects";

export function ProjectsPage() {
    const [activeProjectId, setActiveProjectId] = useState(cardData[0].id);
    const scrollContainerRef = useRef<HTMLElement>(null);

    const activeProject =
        cardData.find((project) => project.id === activeProjectId) || cardData[0];

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
            {/* <GuideRail side="left" />
            <GuideRail side="right" /> */}

            {/* <div className="projects-header-wrap ml-5 mr-5">
                <header className="border-b border-dashed border-white/10 bg-[#343434]/20 backdrop-blur-md">
                    <div className="projects-header-inner flex h-24 items-end px-6 pb-5 md:px-12 lg:px-20">
                        <SectionTitle
                            section="Projects"
                            showDot
                            className="mb-0"
                            labelClassName="mb-0 border-0 bg-transparent p-0 backdrop-blur-none"
                        />
                    </div>
                </header>
            </div> */}

            <div className="projects-grid mt-20 m/l-5 m/r-5 grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                <main
                    ref={scrollContainerRef}
                    className="projects-list min-h-screen scrollbar-hide lg:h-screen lg:overflow-y-auto lg:border-r lg:border-dashed lg:border-white/10"
                >
                    <div className="projects-list-inner flex flex-col p/x-6 pb-20 pt-8 md:px-12 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="mb-12"
                        >
                            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
                                Selected <span className="text-zinc-500">Work.</span>
                            </h1>
                        </motion.div>

                        <div className="overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#343434]/20">
                            {cardData.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={false}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                    }}
                                    transition={{
                                        duration: 0.72,
                                        delay: index * 0.035,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <ProjectRow
                                        index={index}
                                        {...card}
                                        isActive={card.id === activeProjectId}
                                        onMouseEnter={() => setActiveProjectId(card.id)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                <motion.aside
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    aria-label="Project preview"
                    className="project-preview-panel hidden h-screen overflow-hidden bg-[#343434]/20 lg:block"
                >
                    <div className="h-screen overflow-hidden px-12 py-15 xl:px-20">
                        <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-center">
                            <ProjectPreview project={activeProject} />
                        </div>
                    </div>
                </motion.aside>
            </div>
        </div>
    );
}
