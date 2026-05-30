"use client";

import { motion } from "framer-motion";

import { aboutCopy, aboutStats } from "@/lib/content/about";
import { cn } from "@/lib/utils";
import { contentContainer } from "@/components/shared/contentContainer";

export function AboutMe() {
    return (
        <section className={cn(contentContainer, "space-y-8 pt-12")}>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <div className="flex w-fit items-center rounded-full border border-[#262626]/70 bg-[#343434]/20 px-3 py-2 backdrop-blur-sm">
                    <h2 className="font-sans text-xl font-extrabold tracking-tight text-emerald-500">
                        #01&nbsp;
                    </h2>
                    <div className="font-sans text-xl font-bold tracking-tight text-[#474747]">
                        About
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.4fr]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="space-y-6">
                        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                            {aboutCopy.titleLead}{" "}
                            <span className="fraunces text-white/40">
                                {aboutCopy.titleEmphasis}
                            </span>
                        </h2>

                        <p className="max-w-5xl text-base leading-9 text-zinc-400">
                            {aboutCopy.paragraphOne}
                        </p>

                        <p className="max-w-3xl text-base leading-9 text-zinc-400">
                            {aboutCopy.paragraphTwo}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {aboutStats.slice(0, 2).map((item) => (
                            <div
                                key={item.label}
                                className="relative overflow-hidden rounded-3xl border border-[#262626]/70 bg-[#101010]/60 p-5 backdrop-blur-xl"
                            >
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-semibold text-white">
                                        {item.value}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
