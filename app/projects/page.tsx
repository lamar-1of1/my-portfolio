"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring
    const springConfig = {
        damping: 25,
        stiffness: 150,
        mass: 0.5,
    };

    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // Responsive image size
        const imageWidth = window.innerWidth < 1280 ? 260 : 320;
        const imageHeight = window.innerWidth < 1280 ? 320 : 400;

        // Clamp inside container
        const maxX = rect.width - imageWidth;
        const maxY = rect.height - imageHeight;

        const x = Math.min(
            Math.max(e.clientX - rect.left - imageWidth / 2, 0),
            maxX
        );

        const y = Math.min(
            Math.max(e.clientY - rect.top - imageHeight / 2, 0),
            maxY
        );

        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full overflow-hidden py-32 md:py-24"
        >
            {/* Main Layout */}
            <div className="relative mx-auto flex w-full max-w-[1600px]">
                {/* Left Scale */}
                <aside className="relative hidd/en w-8 shrink-0 border-r border-[#343434]/50 2xl:block">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ScalesContainerDemo />
                    </div>
                </aside>

                {/* Content */}
                <div className="min-w-0 flex-1 overflow-hidden">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <div className="flex items-center w-fit roun/ded-full bord/er b/order-[#262626]/70 b/g-[#343434]/20 md:px-12 px-5 py-6 backdrop-blur-sm">
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

                    {/* Project List */}
                    <div className="border-t border-white/10">
                        {projects.map((project) => (
                            <a
                                key={project.id}
                                href="#"
                                onMouseEnter={() =>
                                    setHoveredProject(project.id)
                                }
                                onMouseLeave={() =>
                                    setHoveredProject(null)
                                }
                                className="group flex flex-col gap-8 overflow-hidden border-b border-white/10 px-4 py-8 transition-colors hover:bg-white/[0.02] sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-12 xl:px-16"
                            >
                                {/* Left */}
                                <div className="min-w-0">
                                    <motion.h3
                                        className="
                                            break-words
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-zinc-300
                                            transition-colors
                                            duration-300
                                            group-hover:text-emerald-400

                                            sm:text-4xl
                                            md:text-5xl
                                            lg:text-6xl
                                            xl:text-7xl
                                        "
                                        initial={{ x: 0 }}
                                        whileHover={{
                                            x:
                                                typeof window !== "undefined" &&
                                                    window.innerWidth >= 768
                                                    ? 20
                                                    : 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                </div>

                                {/* Right */}
                                <div className="flex w-full items-center justify-between gap-4 md:w-auto md:flex-row md:justify-end md:gap-10">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors group-hover:border-emerald-400/30 group-hover:text-emerald-300 sm:px-4 sm:text-sm">
                                            {project.category}
                                        </span>

                                        <span className="text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-300 sm:text-base md:text-lg">
                                            {project.year}
                                        </span>
                                    </div>

                                    <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 group-hover:text-emerald-400 lg:flex">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Scale */}
                <aside className="relative hidde/n w-8 shrink-0 border-l border-[#343434]/50 block">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ScalesContainerDemo />
                    </div>
                </aside>
            </div>

            {/* Floating Hover Image */}
            <motion.div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-50
                    hidden
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-black
                    shadow-2xl
                    md:block
                "
                style={{
                    x: imageX,
                    y: imageY,
                    opacity: hoveredProject ? 1 : 0,
                    scale: hoveredProject ? 1 : 0.92,
                    width:
                        typeof window !== "undefined" &&
                            window.innerWidth < 1280
                            ? 260
                            : 320,
                    height:
                        typeof window !== "undefined" &&
                            window.innerWidth < 1280
                            ? 320
                            : 400,
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                }}
            >
                {projects.map((project) => (
                    <img
                        key={project.id}
                        src={project.image}
                        alt={project.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hoveredProject === project.id
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                    />
                ))}

                <div className="absolute inset-0 bg-black/20" />
            </motion.div>
        </section>
    );
}
