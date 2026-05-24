import React, { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ArrowUpRight } from 'lucide-react'
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export interface HoverExpandItem {
    label: string
    sublabel?: string
    image: string
    imageAlt?: string
    description?: string
}
export interface HoverExpandProps {
    items: HoverExpandItem[]
    collapsedHeight?: number
    expandedHeight?: number
    className?: string
}
export function HoverExpand({
    items,
    collapsedHeight = 120,
    expandedHeight = 400,
    className,
}: HoverExpandProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    return (
        <div className={cn('flex flex-col w-full', className)}>
            <div className="w-full border-t border-white/10" />
            {items.map((item, i) => {
                const isHovered = hoveredIndex === i
                const isOtherHovered = hoveredIndex !== null && !isHovered
                return (
                    <Fragment key={i}>
                        <motion.div
                            className="relative w-full overflow-hidden cursor-pointer bg-transparent touch-pan-y"
                            animate={{
                                height: isHovered ? expandedHeight : collapsedHeight,
                                opacity: isOtherHovered ? 0.4 : 1,
                            }}
                            transition={{
                                height: {
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 32,
                                    mass: 0.9,
                                },
                                opacity: {
                                    duration: 0.22,
                                    ease: "easeOut",
                                },
                            }}
                            onHoverStart={() => setHoveredIndex(i)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            onTap={() =>
                                setHoveredIndex((prev) =>
                                    prev === i ? null : i
                                )
                            }
                        >
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                initial={false}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 1.05,
                                }}
                                transition={{
                                    opacity: {
                                        duration: 0.45,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                    scale: {
                                        duration: 0.55,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.imageAlt ?? ''}
                                    className="w-full h-full object-cover"
                                />

                                {/* Progressive Blur Overlay */}
                                <ProgressiveBlur
                                    className="absolute bottom-0 left-0 h-[40%] w-full"
                                    blurIntensity={2}
                                />
                                {/* Subtle dark gradient to ensure text readability over bright images */}
                                <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 flex p/x-6 sm:px-8"
                                animate={{
                                    alignItems: isHovered ? "flex-end" : "center",
                                    paddingBottom: isHovered ? 32 : 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                            >
                                <div className="flex w-full items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                        <motion.span
                                            className="text-sm font-bold fo/nt-mono tabular-nums shrink-0"
                                            animate={{
                                                color: isHovered ? '#ffffff' : '#71717a',
                                                opacity: isHovered ? 0.6 : 1,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </motion.span>
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold tracking-tight truncate"
                                            animate={{
                                                color: isHovered ? '#ffffff' : '#d4d4d8',
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            {item.label}
                                        </motion.h3>
                                        {item.description && (
                                            <motion.span
                                                className="text-sm sm:text-base text-zinc-300 truncate hidden sm:block"
                                                initial={{
                                                    opacity: 0,
                                                    x: -8,
                                                }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                    x: isHovered ? 0 : -8,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: isHovered ? 0.1 : 0,
                                                }}
                                            >
                                                — {item.description}
                                            </motion.span>
                                        )}
                                    </div>

                                    {item.sublabel && (
                                        <motion.span
                                            className="text-sm font-medium tracking-normal up/percase shrink-0 rounded-xl border border-[#262626]/70 bg-[#343434]/20 px-4 py-2"
                                            animate={{
                                                color: isHovered ? '#ffffff' : '#a1a1aa',
                                                opacity: isHovered ? 0.7 : 1,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            {item.sublabel}
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                        <div className="w-full border-t border-white/10" />
                    </Fragment>
                )
            })}
        </div>
    )
}
