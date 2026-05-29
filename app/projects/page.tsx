'use client'

import {
    AnimatePresence,
    motion,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import ScalesContainerDemo from '@/components/scales-container-demo'
import Footer from '@/components/ui/footer'
import { cardData, type ProjectItem } from './projects'

interface PillButtonProps {
    label: string
    variant?: 'solid' | 'ghost'
    className?: string
    onClick?: () => void
}

function PillButton({
    label,
    variant = 'solid',
    className = '',
    onClick,
}: PillButtonProps) {
    const isSolid = variant === 'solid'

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group/pill inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isSolid
                ? 'bg-white text-[#0a0a0a] hover:bg-zinc-200'
                : 'border border-white/15 bg-transparent text-white hover:bg-white/[0.06]'
                } ${className}`}
        >
            <span className="py-1">{label}</span>
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:rotate-12 ${isSolid ? 'bg-[#0a0a0a] text-white' : 'bg-white text-[#0a0a0a]'
                    }`}
            >
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
        </button>
    )
}

function StatusPill({ status }: { status: string }) {
    const isLive = status.toLowerCase() === 'live'

    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#262626]/70 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-normal text-black">
            {/* <span className="relative flex h-1.5 w-1.5">
                {isLive && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                )}
                <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-emerald-500'
                        }`}
                />
            </span> */}
            {status}
        </span>
    )
}

function GuideRail({ side }: { side: 'left' | 'right' }) {
    return (
        <aside
            aria-hidden="true"
            className={`fixed top-0 z-0 h-screen w-5 overflow-hidden ${side === 'left'
                ? 'left-0 border-r border-dashed border-white/15'
                : 'right-0 border-l border-dashed border-white/15'
                }`}
        >
            <div className="absolute inset-0 h-full w-full">
                <ScalesContainerDemo />
            </div>
        </aside>
    )
}

interface ProjectRowProps extends ProjectItem {
    index: number
    isActive: boolean
    onMouseEnter: () => void
}

function ProjectRow({
    index,
    tag,
    projectStatus,
    title,
    subtitle,
    image,
    year,
    isActive,
    onMouseEnter,
}: ProjectRowProps) {
    const [isOpen, setIsOpen] = useState(false)
    const formattedIndex = (index + 1).toString().padStart(2, '0')
    const rowTone = index % 2 === 0 ? 'bg-[#343434]/10' : 'bg-[#343434]/20'

    return (
        <div
            className={`group border-b border-dashed border-white/10 transition-colors duration-500 last:border-b-0 ${isActive ? 'bg-[#343434]/30' : `${rowTone} hover:bg-[#343434]/25`
                }`}
            onMouseEnter={onMouseEnter}
        >
            <button
                onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen((value) => !value)
                }}
                aria-expanded={isOpen}
                className="flex w-full flex-col justify-between gap-4 px-5 py-6 text-left md:px-8 md:py-9 lg:cursor-default lg:flex-row lg:items-center"
            >
                <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
                    <div className="flex shrink-0 items-center gap-3">
                        <span className="text-xs font-semibold tabular-nums text-zinc-500">
                            {formattedIndex}
                        </span>
                        <span className="h-px w-8 shrink-0 bg-zinc-600" />
                        <span className="text-xs font-medium tabular-nums text-zinc-500">
                            {year}
                        </span>
                    </div>

                    <h3
                        className={`text-2xl font-extrabold tracking-tight transition-all duration-500 md:text-3xl ${isActive
                            ? 'text-white lg:translate-x-2'
                            : 'text-zinc-500 group-hover:text-zinc-100 lg:group-hover:translate-x-2'
                            }`}
                    >
                        {title}
                    </h3>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                    <span
                        className={`hidden text-sm font-semibold upp/ercase tracking-normal transition-colors duration-500 lg:block ${isActive
                            ? 'text-zinc-300'
                            : 'text-zinc-700 group-hover:text-zinc-400'
                            }`}
                    >
                        {tag}
                    </span>
                    <ArrowUpRight
                        strokeWidth={2.25}
                        className={`hidden h-6 w-6 transition-all duration-500 lg:block ${isActive
                            ? 'translate-x-0 translate-y-0 text-white opacity-100'
                            : '-translate-x-4 translate-y-4 text-zinc-600 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'
                            }`}
                    />
                </div>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out lg:hidden ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-5 pb-8 pt-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <StatusPill status={projectStatus} />
                            <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                {tag}
                            </span>
                        </div>

                        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900">
                            <img
                                src={image}
                                alt={title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                        </div>

                        <p className="text-sm leading-relaxed text-zinc-400">
                            {subtitle}
                        </p>

                        <div className="mt-5">
                            <PillButton label="View Project" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectPreview({ project }: { project: ProjectItem }) {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="mb-6 flex shrink-0 items-center justify-between border-b border-dashed border-white/10 pb-4">
                <span className="text-sm font-semibold up/percase tracking-normal text-zinc-500">
                    Preview
                </span>
                <span className="text-sm font-semibold tabular-nums text-white">
                    {project.year}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex min-h-0 flex-col"
                >
                    <div className="relative mb-6 aspect-[16/10] max-h-[36vh] w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-900">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                    </div>

                    <div className="mb-5 flex flex-wrap items-center gap-3">
                        <StatusPill status={project.projectStatus} />
                        <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                            {project.tag}
                        </span>
                        <PillButton
                            label="View Project"
                            variant="ghost"
                            className="ml-auto"
                        />
                    </div>

                    <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
                        {project.title}
                    </h2>
                    <p className="text-base leading-relaxed text-zinc-400 xl:text-lg">
                        {project.subtitle}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default function Page() {
    const [activeProjectId, setActiveProjectId] = useState(cardData[0].id)
    const scrollContainerRef = useRef<HTMLElement>(null)

    const activeProject =
        cardData.find((project) => project.id === activeProjectId) || cardData[0]

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
            <GuideRail side="left" />
            <GuideRail side="right" />

            <div className="ml-5 mr-5">
                <header className="border-b border-dashed border-white/10 bg-[#343434]/20 backdrop-blur-md">
                    <div className="flex h-24 items-end px-6 pb-5 md:px-12 lg:px-20">
                        <div className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white/80">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Projects
                        </div>
                    </div>
                </header>
            </div>

            <div className="ml-5 mr-5 grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                <main
                    ref={scrollContainerRef}
                    className="min-h-screen scrollbar-hide lg:h-screen lg:overflow-y-auto lg:border-r lg:border-dashed lg:border-white/10"
                >
                    <div className="flex flex-col px-6 pb-20 pt-8 md:px-12 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="mb-12"
                        >
                            {/* <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold tracking-normal text-zinc-500">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-white/10 bg-white text-sm font-bold leading-none text-black">
                                    {cardData.length}
                                </span>
                                <span className="text-sm">Projects</span>
                            </p> */}
                            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
                                Selected {' '}
                                <span className="text-zinc-500">Work.</span>
                            </h1>
                        </motion.div>

                        <div className="overflow-hidden rounded-xl border border-dashed border-white/10 bg-[#343434]/20">
                            {cardData.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{
                                        opacity: 0,
                                        y: 42,
                                        scale: 0.985,
                                        filter: 'blur(8px)',
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    viewport={{
                                        once: false,
                                        amount: 0.38,
                                        margin: '-8% 0px -12% 0px',
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
                                        onMouseEnter={() =>
                                            setActiveProjectId(card.id)
                                        }
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </main>

                <motion.aside
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    aria-label="Project preview"
                    className="hidden h-screen overflow-hidden bg-[#343434]/20 lg:block"
                >
                    <div className="h-screen overflow-hidden px-12 py-15 xl:px-20">
                        <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-center">
                            <ProjectPreview project={activeProject} />
                        </div>
                    </div>
                </motion.aside>
            </div>

            <div className="mx-5 py-18 md:py-0 border-t border-white/10 bg-black">
                <Footer />
            </div>

        </div>
    )
}
