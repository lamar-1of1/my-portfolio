'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { cardData } from './projects'
import ScalesContainerDemo from '@/components/scales-container-demo'
import Footer from '@/components/ui/footer'

interface CardProps {
    id: number
    tag: string
    title: string
    subtitle: string
    image: string
    year: string
    isActive: boolean
    onMouseEnter: () => void
}

function Card({
    tag,
    title,
    subtitle,
    image,
    year,
    isActive,
    onMouseEnter,
}: CardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="border-b border-white/10 group"
            onMouseEnter={onMouseEnter}
        >
            <button
                onClick={() => {
                    // Accordion only on mobile/tablet
                    if (window.innerWidth < 1024) {
                        setIsOpen(!isOpen)
                    }
                }}
                aria-expanded={isOpen}
                className="w-full py-6 md:py-8 flex items-center justify-between text-left gap-4 lg:cursor-default"
            >
                <div className="flex flex-col">
                    <span className="text-sm/tight font-medium tracking-normal text-zinc-500">
                        {year}
                    </span>

                    <h3
                        className={`mt-2 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight transition-colors duration-300 ${isActive
                            ? 'text-white'
                            : 'text-zinc-500 group-hover:text-zinc-300'
                            }`}
                    >
                        {title}
                    </h3>
                </div>
            </button>

            {/* Mobile / Tablet Accordion */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden lg:hidden"
                    >
                        <motion.div
                            initial={{ y: 10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="pb-6"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                                <motion.img
                                    src={image}
                                    alt={title}
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 1.02 }}
                                    transition={{
                                        duration: 0.4,
                                    }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    delay: 0.05,
                                    duration: 0.2,
                                }}
                                className="text-zinc-400 leading-relaxed"
                            >
                                {subtitle}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Page() {
    const [activeProjectId, setActiveProjectId] = useState(
        cardData[0].id
    )

    const activeProject =
        cardData.find((p) => p.id === activeProjectId) ||
        cardData[0]

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">

            {/* FIXED LEFT SCALE */}
            <aside className="fixed left-0 top-0 h-screen w-[32px] border-r border-[#343434]/50 overflow-hidden z-0">
                <div className="absolute inset-0 h-full w-full">
                    <ScalesContainerDemo />
                </div>
            </aside>

            {/* FIXED RIGHT SCALE */}
            <aside className="fixed right-0 top-0 h-screen w-[32px] border-l border-[#343434]/50 overflow-hidden z-0">
                <div className="absolute inset-0 h-full w-full">
                    <ScalesContainerDemo />
                </div>
            </aside>

            {/* MAIN FULLSCREEN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen ml-[32px] mr-[32px]">

                {/* LEFT CONTENT */}
                <div className="h-screen overflow-y-auto scrollbar-hide border-r border-white/10">
                    <div className="flex flex-col pt-26 pb-20 px-6 md:px-12 lg:px-20">

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626]/60 bg-[#343434]/20 px-4 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 shadow-inner backdrop-blur-md mb-14">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>

                                Projects
                            </div>

                            {/* Cards */}
                            <div className="flex flex-col border-t border-white/10">
                                {cardData.map((card) => (
                                    <Card
                                        key={card.id}
                                        {...card}
                                        isActive={card.id === activeProjectId}
                                        onMouseEnter={() =>
                                            setActiveProjectId(card.id)
                                        }
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT PREVIEW */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="hidden lg:block h-screen overflow-hidden bg-zinc-950"
                >
                    <div className="h-screen p-12 xl:p-20 overflow-hidden">
                        <div className="relative w-full h-full flex flex-col justify-center max-w-2xl mx-auto p/t-20 xl:p/t-32">
                            <div
                                key={activeProject.id}
                                className="animate-fade-in"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/5] xl:aspect-[16/10] w-full overflow-hidden rounded-xl mb-10 bg-zinc-900">
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="rounded-full border border-emerald-400/70 bg-emerald-400/70 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white">
                                        {activeProject.projectStatus}
                                    </span>

                                    <span className="rounded-full border border-[#262626]/60 bg-[#343434]/20 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white/70">
                                        {activeProject.tag}
                                    </span>

                                    <span className="text-sm/tight font-medium tracking-normal text-white/70">
                                        {activeProject.year}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl xl:text-4xl font-medium tracking-tight mb-4 text-white">
                                    {activeProject.title}
                                </h2>

                                {/* Description */}
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    {activeProject.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* FOOTER */}
            <div className="md:mx-0 mx-8 border-t border-white/10">
                <Footer />
            </div>
        </div>
    )
}
