"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

import ScalesContainerDemo from "@/components/scales-container-demo";
import { ArticleIndex } from "./ArticleIndex";
import MobileNav from "@/components/ui/MobileNav";

export default function Projects() {
    const containerRef = useRef<HTMLElement | null>(null);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden py-20 sm:py-24 md:py-28 bg-black min-h-screen"
        >
            <MobileNav />
            <div className="relative z-10 mx-auto flex w-full max-w-[1800px]">
                {/* Left Scale */}
                <aside className="relative hid/den w-8 shrink-0 border-r border-[#343434]/50 2xl:block">
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
                        <div className="flex items-center w-fit round/ed-full border bo/rder-[#262626]/70 b/g-[#343434]/20 px-5 md:px-26 py-2 backdrop-blur-sm">
                            <h2 className="text-xl font-extrabold text-emerald-500 font-sans tracking-tight">
                                #02 &nbsp;
                            </h2>
                            <div className="text-xl font-bold text-[#474747] font-sans tracking-tight">
                                Projects
                            </div>
                        </div>
                    </motion.div>

                    {/* ArticleIndex */}
                    <div className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
                        <ArticleIndex />
                    </div>
                </div>

                {/* Right Scale */}
                <aside className="relative h/dden w-8 shrink-0 border-l border-[#343434]/50 xl:block">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ScalesContainerDemo />
                    </div>
                </aside>
            </div>
        </section>
    );
}
