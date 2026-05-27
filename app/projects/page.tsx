'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import React, { useState } from 'react'
import { cardData } from './projects'
import ScalesContainerDemo from '@/components/scales-container-demo'
import Footer from '@/components/ui/footer'

interface CardProps {
    id: number
    index: number
    tag: string
    projectStatus: string
    title: string
    subtitle: string
    image: string
    year: string
    isActive: boolean
    onMouseEnter: () => void
}

function Card({
    index,
    tag,
    projectStatus,
    title,
    subtitle,
    image,
    year,
    isActive,
    onMouseEnter,
}: CardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const formattedIndex = (index + 1).toString().padStart(2, '0')

    return (
        <div
            className={`border-b border-dashed border-white/10 group transition-colors duration-500 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
            onMouseEnter={onMouseEnter}
        >
            <button
                onClick={() => {
                    if (window.innerWidth < 1024) {
                        setIsOpen(!isOpen)
                    }
                }}
                aria-expanded={isOpen}
                className="w-full px-4 py-6 md:px-6 md:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-left lg:cursor-default"
            >
                <div className="flex min-w-0 flex-1 flex-col gap-3 w-full">
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-zinc-700 font-mo/no text-xs">
                            {formattedIndex}
                        </span>

                        <span className="h-[1px] w-8 shrink-0 bg-zinc-500/70" />

                        <span className="text-zinc-500 font-mo/no text-xs">
                            {year}
                        </span>
                    </div>

                    <h3
                        className={`text-2xl font-medium tracking-tight transition-all duration-500 ${isActive
                            ? 'text-white lg:translate-x-2'
                            : 'text-zinc-500 group-hover:text-zinc-200 lg:group-hover:translate-x-2'
                            }`}
                    >
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <span
                        className={`hidden lg:block text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isActive
                            ? 'text-zinc-300'
                            : 'text-zinc-700 group-hover:text-zinc-400'
                            }`}
                    >
                        {tag}
                    </span>

                    <ArrowUpRight
                        className={`hidden lg:block w-6 h-6 transition-all duration-500 ${isActive
                            ? 'text-white opacity-100 translate-x-0 translate-y-0'
                            : 'text-zinc-600 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0'
                            }`}
                    />
                </div>
            </button>

            <div
                className={`lg:hidden grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-8 pt-2">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-emerald-400/50 bg-emerald-400/80 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white">
                                {projectStatus}
                            </span>

                            <span className="rounded-full border border-dashed border-zinc-700 bg-[#343434]/20 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white/70">
                                {tag}
                            </span>
                        </div>

                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                            <img
                                src={image}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {subtitle}
                        </p>

                        <button
                            type="button"
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-zinc-700 hover:bg-white hover:text-black"
                        >
                            View Project
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [activeProjectId, setActiveProjectId] = useState(cardData[0].id)

    const activeProject =
        cardData.find((p) => p.id === activeProjectId) || cardData[0]

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <aside className="fixed left-0 top-0 h-screen w-[32px] border-r border-[#343434]/50 overflow-hidden z-0">
                <div className="absolute inset-0 h-full w-full">
                    <ScalesContainerDemo />
                </div>
            </aside>

            <aside className="fixed right-0 top-0 h-screen w-[32px] border-l border-[#343434]/50 overflow-hidden z-0">
                <div className="absolute inset-0 h-full w-full">
                    <ScalesContainerDemo />
                </div>
            </aside>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen ml-[32px] mr-[32px]">
                <div className="h-screen overflow-y-auto scrollbar-hide border-r border-white/10">
                    <div className="flex flex-col pt-26 pb-20 px-6 md:px-12 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626]/60 bg-[#343434]/20 px-4 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 shadow-inner backdrop-blur-md mb-14">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                Projects
                            </div>

                            <div className="flex flex-col border border-dashed border-white/10 rounded-sm overflow-hidden">
                                {cardData.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        index={index}
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

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="hidden lg:block h-screen overflow-hidden bg-zinc-950"
                >
                    <div className="h-screen overflow-hidden px-12 py-10 xl:px-20 xl:py-12">
                        <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col justify-center">
                            <div key={activeProject.id} className="animate-fade-in flex min-h-0 flex-col">
                                <div className="mb-6 flex shrink-0 items-center justify-between border-b border-dashed border-white/10 pb-4">
                                    <span className="text-sm/tight font-medium tracking-normal text-white/70">
                                        Preview
                                    </span>

                                    <span className="text-sm/tight font-semibold tracking-normal text-emerald-500">
                                        {activeProject.year}
                                    </span>
                                </div>

                                <div className="relative mb-6 aspect-[16/10] max-h-[34vh] w-full shrink-0 overflow-hidden rounded-xl bg-zinc-900 xl:max-h-[38vh]">
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                                </div>

                                <div className="mb-5 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full border border-emerald-400/70 bg-emerald-400/70 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white">
                                        {activeProject.projectStatus}
                                    </span>

                                    <span className="rounded-full border border-dashed border-zinc-700 bg-[#343434]/20 px-3 py-1.5 text-sm/tight font-medium tracking-normal text-white/70">
                                        {activeProject.tag}
                                    </span>

                                    <button
                                        className="ml-auto flex items-center gap-2 rounded-full border border-[#262626]/60 bg-[#343434]/20 px-4 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 cursor-pointer shadow-inner backdrop-blur-md transition-colors duration-300 hover:bg-[#343434]/40"
                                        onClick={() => {
                                            // Handle "View Project" button click
                                            // For example, navigate to the project details page
                                        }}
                                    >
                                        View Project
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <h2 className="mb-3 text-2xl font-medium tracking-normal text-white font-serif leading-tight xl:text-3xl">
                                    {activeProject.title}
                                </h2>

                                <p className="min-h-0 overflow-hidden text-base leading-relaxed text-zinc-400 xl:text-lg">
                                    {activeProject.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mx-8 md:mx-0 border-t border-dashed border-white/10">
                <Footer />
            </div>
        </div>
    )
}
