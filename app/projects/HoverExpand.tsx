"use client";

import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    ChevronRight,
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/* -------------------------------------------------------------------------- */
/*                                  Blur Layer                                */
/* -------------------------------------------------------------------------- */

export interface ProgressiveBlurProps {
    className?: string;
    blurIntensity?: number;
}

export function ProgressiveBlur({
    className,
    blurIntensity = 8,
}: ProgressiveBlurProps) {
    return (
        <div
            className={cn("pointer-events-none", className)}
            style={{
                backdropFilter: `blur(${blurIntensity}px)`,
                WebkitBackdropFilter: `blur(${blurIntensity}px)`,
                maskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            }}
        />
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface HoverExpandItem {
    label: string;
    sublabel?: string;
    image: string;
    imageAlt?: string;
    description?: string;
    techStack?: string[];
    role?: string;
    year?: string;
}

export interface HoverExpandProps {
    items: HoverExpandItem[];
    collapsedHeight?: number;
    expandedHeight?: number;
    className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Animations                                  */
/* -------------------------------------------------------------------------- */

const detailVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.12,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.18,
        },
    },
};

const detailChild = {
    hidden: {
        opacity: 0,
        y: 16,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.45,
            ease: [0.23, 1, 0.32, 1],
        },
    },
    exit: {
        opacity: 0,
        y: 8,
        filter: "blur(8px)",
        transition: {
            duration: 0.18,
        },
    },
} as const;

/* -------------------------------------------------------------------------- */
/*                              Hover Expand UI                               */
/* -------------------------------------------------------------------------- */

export function HoverExpand({
    items,
    collapsedHeight = 92,
    expandedHeight = 440,
    className,
}: HoverExpandProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={cn("flex w-full flex-col", className)}>
            <div className="w-full border-t border-white/10" />

            {items.map((item, i) => {
                const isHovered = hoveredIndex === i;
                const isOtherHovered =
                    hoveredIndex !== null && !isHovered;

                return (
                    <Fragment key={i}>
                        <motion.div
                            className="
                                group
                                relative
                                w-full
                                overflow-hidden
                                cursor-pointer
                                bg-black
                            "
                            animate={{
                                height: isHovered
                                    ? expandedHeight
                                    : collapsedHeight,
                                opacity: isOtherHovered ? 0.35 : 1,
                            }}
                            transition={{
                                height: {
                                    type: "spring",
                                    stiffness: 240,
                                    damping: 30,
                                    mass: 1,
                                },
                                opacity: {
                                    duration: 0.25,
                                },
                            }}
                            onHoverStart={() => setHoveredIndex(i)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            onClick={() =>
                                setHoveredIndex((prev) =>
                                    prev === i ? null : i
                                )
                            }
                        >
                            {/* Background */}
                            <motion.div
                                className="absolute inset-0"
                                initial={false}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 1.04,
                                }}
                                transition={{
                                    opacity: {
                                        duration: 0.45,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                    scale: {
                                        duration: 0.7,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.imageAlt ?? item.label}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                                {/* cinematic overlay */}
                                <div className="absolute inset-0 bg-black/35" />

                                {/* glow */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-tr
                                        from-emerald-500/10
                                        via-transparent
                                        to-violet-500/20
                                    "
                                />

                                {/* blur fade */}
                                <ProgressiveBlur
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        h-[75%]
                                        w-full
                                    "
                                    blurIntensity={18}
                                />

                                {/* bottom gradient */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        h-[80%]
                                        w-full
                                        bg-gradient-to-t
                                        from-black
                                        via-black/60
                                        to-transparent
                                    "
                                />
                            </motion.div>

                            {/* subtle hover border */}
                            <motion.div
                                className="
                                    absolute
                                    inset-0
                                    border
                                    border-white/0
                                "
                                animate={{
                                    borderColor: isHovered
                                        ? "rgba(255,255,255,0.12)"
                                        : "rgba(255,255,255,0)",
                                }}
                            />

                            {/* collapsed row */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-end
                                    px-5
                                    pb-5
                                    sm:px-8
                                    sm:pb-6
                                "
                            >
                                <div
                                    className="
                                        flex
                                        w-full
                                        items-end
                                        justify-between
                                        gap-4
                                    "
                                >
                                    {/* left */}
                                    <div
                                        className="
                                            flex
                                            items-end
                                            gap-4
                                            min-w-0
                                        "
                                    >
                                        {/* index */}
                                        {/* <motion.span
                                            className="
                                                shrink-0
                                                pb-1
                                                text-xs
                                                font-mono
                                                leading-none
                                                tracking-widest
                                                text-zinc-500
                                            "
                                            animate={{
                                                color: isHovered
                                                    ? "#ffffff"
                                                    : "#71717a",
                                                opacity: isHovered
                                                    ? 0.45
                                                    : 1,
                                            }}
                                        >
                                            {String(i + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </motion.span> */}

                                        {/* title */}
                                        <AnimatePresence mode="wait">
                                            {!isHovered && (
                                                <motion.h3
                                                    key="collapsed-title"
                                                    className="
                                                        truncate
                                                        text-2xl
                                                        font-bold
                                                        tracking-tight
                                                        text-zinc-200
                                                        sm:text-3xl
                                                        md:text-4xl
                                                    "
                                                    initial={{
                                                        opacity: 0,
                                                        y: 8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    transition={{
                                                        duration: 0.18,
                                                    }}
                                                >
                                                    {item.label}
                                                </motion.h3>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* category */}
                                    <AnimatePresence>
                                        {!isHovered &&
                                            item.sublabel && (
                                                <motion.div
                                                    className="
                                                        hidden
                                                        items-center
                                                        gap-2
                                                        sm:flex
                                                    "
                                                    initial={{
                                                        opacity: 0,
                                                        x: 12,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: 12,
                                                    }}
                                                >
                                                    <span
                                                        className="
                                                            text-xs
                                                            font-medium
                                                            uppercase
                                                            tracking-[0.24em]
                                                            text-zinc-500
                                                        "
                                                    >
                                                        {
                                                            item.sublabel
                                                        }
                                                    </span>

                                                    <ChevronRight
                                                        size={14}
                                                        className="text-zinc-600"
                                                    />
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* expanded */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        className="
                                            absolute
                                            inset-0
                                            flex
                                            flex-col
                                            justify-between
                                            p-5
                                            sm:p-8
                                        "
                                        variants={detailVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {/* top row */}
                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >
                                            <motion.div
                                                variants={detailChild}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >
                                                <span
                                                    className="
                                                        text-xs
                                                        uppercase
                                                        tracking-[0.3em]
                                                        text-white/40
                                                    "
                                                >
                                                    {String(
                                                        i + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <div
                                                    className="
                                                        h-px
                                                        w-16
                                                        bg-white/15
                                                    "
                                                />
                                            </motion.div>

                                            {item.sublabel && (
                                                <motion.span
                                                    variants={
                                                        detailChild
                                                    }
                                                    className="
                                                        rounded-full
                                                        border
                                                        border-white/10
                                                        bg-white/5
                                                        px-3
                                                        py-1
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.24em]
                                                        text-white/60
                                                        backdrop-blur-md
                                                    "
                                                >
                                                    {
                                                        item.sublabel
                                                    }
                                                </motion.span>
                                            )}
                                        </div>

                                        {/* bottom content */}
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-6
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-4
                                                    max-w-3xl
                                                "
                                            >
                                                <motion.h3
                                                    variants={
                                                        detailChild
                                                    }
                                                    className="
                                                        text-4xl
                                                        font-bold
                                                        leading-[0.95]
                                                        tracking-tight
                                                        text-white
                                                        sm:text-5xl
                                                        md:text-6xl
                                                    "
                                                >
                                                    {item.label}
                                                </motion.h3>

                                                {item.description && (
                                                    <motion.p
                                                        variants={
                                                            detailChild
                                                        }
                                                        className="
                                                            max-w-2xl
                                                            text-base
                                                            leading-relaxed
                                                            text-zinc-300
                                                            sm:text-lg
                                                        "
                                                    >
                                                        {
                                                            item.description
                                                        }
                                                    </motion.p>
                                                )}
                                            </div>

                                            {/* footer row */}
                                            <motion.div
                                                variants={detailChild}
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-5
                                                    md:flex-row
                                                    md:items-end
                                                    md:justify-between
                                                "
                                            >
                                                {/* stack */}
                                                {item.techStack &&
                                                    item.techStack
                                                        .length >
                                                    0 && (
                                                        <div
                                                            className="
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                                                        >
                                                            {item.techStack.map(
                                                                (
                                                                    tech
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            tech
                                                                        }
                                                                        className="
                                                                            rounded-full
                                                                            border
                                                                            border-white/10
                                                                            bg-white/10
                                                                            px-3
                                                                            py-1.5
                                                                            text-xs
                                                                            font-medium
                                                                            text-zinc-200
                                                                            backdrop-blur-md
                                                                        "
                                                                    >
                                                                        {
                                                                            tech
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    )}

                                                {/* CTA */}
                                                <motion.button
                                                    whileHover={{
                                                        x: 4,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.98,
                                                    }}
                                                    className="
                                                        group/button
                                                        flex
                                                        items-center
                                                        gap-3
                                                        self-start
                                                        rounded-full
                                                        border
                                                        border-white/10
                                                        bg-white/10
                                                        px-5
                                                        py-3
                                                        text-sm
                                                        font-medium
                                                        text-white
                                                        backdrop-blur-xl
                                                        transition-colors
                                                        hover:bg-white/15
                                                    "
                                                >
                                                    View Project

                                                    <ArrowUpRight
                                                        size={16}
                                                        className="
                                                            transition-transform
                                                            duration-300
                                                            group-hover/button:translate-x-0.5
                                                            group-hover/button:-translate-y-0.5
                                                        "
                                                    />
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="w-full border-t border-white/10" />
                    </Fragment>
                );
            })}
        </div>
    );
}
