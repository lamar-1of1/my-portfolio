"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
    contentStagger,
    easeCurve,
    fadeOnly,
    fadeUp,
    reducedContentStagger,
} from "@/lib/motion";

const loadingRows = ["w-5/6", "w-3/5", "w-4/6"];

export function PageLoadingShell() {
    const shouldReduceMotion = useReducedMotion();
    const itemVariant = shouldReduceMotion ? fadeOnly : fadeUp;

    return (
        <motion.div
            variants={shouldReduceMotion ? reducedContentStagger : contentStagger}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 text-white md:px-8 lg:px-12"
        >
            <motion.div
                variants={itemVariant}
                className="mb-5 h-4 w-24 rounded-full bg-white/10"
            />

            <motion.div
                variants={itemVariant}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950"
            >
                <div className="motion-image-skeleton aspect-[16/10] md:aspect-[16/7]" />
            </motion.div>

            <motion.div variants={itemVariant} className="py-7">
                <div className="mb-4 h-4 w-28 rounded-full bg-emerald-300/20" />
                <div className="h-10 max-w-2xl rounded-lg bg-white/10 md:h-14" />
                <div className="mt-4 grid gap-2">
                    {loadingRows.map((width) => (
                        <motion.div
                            key={width}
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: [0.45, 0.8, 0.45] }
                            }
                            transition={{
                                duration: 1.25,
                                ease: easeCurve,
                                repeat: Infinity,
                            }}
                            className={`h-3 rounded-full bg-white/10 ${width}`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
