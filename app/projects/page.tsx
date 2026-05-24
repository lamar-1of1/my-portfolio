"use client";

import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";

import { HoverExpand } from "./HoverExpand";
import ScalesContainerDemo from "@/components/scales-container-demo";

const projects = [
    {
        id: 1,
        title: "Aura Finance",
        year: "2024",
        category: "Fintech",
        image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Nexus OS",
        year: "2023",
        category: "System Design",
        image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Lumina Studio",
        year: "2023",
        category: "E-Commerce",
        image:
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Vanguard AI",
        year: "2022",
        category: "Web Application",
        image:
            "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const hoverItems = useMemo(
        () =>
            projects.map((project) => ({
                label: project.title,
                sublabel: project.category,
                description: project.year,
                image: project.image,
            })),
        []
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden py-20 sm:py-24 md:py-28"
        >
            {/* Main Layout */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1800px]">
                {/* Left Scale */}
                <aside className="relative hidd/en w-8 shrink-0 border-r border-[#343434]/50 2xl:block">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ScalesContainerDemo />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="min-w-0 flex-1 overflow-hidden">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <div className="flex items-center w-fit roun/ded-full bord/er b/order-[#262626]/70 b/g-[#343434]/20 px-5 md:px-16 p/y-2 backdrop-blur-sm">
                            <h2
                                className="text-xl font-extrabold text-emerald-500 font-sans tracking-tight"
                            >
                                #02 &nbsp;
                            </h2>
                            {/* About Me Pill Badge */}
                            <div className="text-xl font-bold text-[#474747] font-sanstext-emerald-500tracking-tight">
                                Projects
                            </div>
                        </div>
                    </motion.div>

                    {/* Projects */}
                    <div
                        className="
                            px-4
                            sm:px-6
                            md:px-10
                            lg:px-14
                            xl:px-16
                        "
                    >
                        <HoverExpand
                            items={hoverItems}
                            collapsedHeight={76}
                            expandedHeight={340}
                            className="
                                w-full
                                text-zinc-300
                                [&_*]:transition-colors
                                [&_*]:duration-300
                            "
                        />
                    </div>
                </div>

                {/* Right Scale */}
                <aside
                    className="
                        relative
                        hidde/n
                        w-8
                        shrink-0
                        border-l
                        border-[#343434]/50
                        xl:block
                    "
                >
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ScalesContainerDemo />
                    </div>
                </aside>
            </div>
        </section>
    );
}
