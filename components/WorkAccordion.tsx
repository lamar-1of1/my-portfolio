import React, { useState } from 'react'
import { workExperience } from '@/components/workData'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
export const WorkAccordion = () => {
    const [openId, setOpenId] = useState<string | null>(workExperience[0].id)
    const toggleOpen = (id: string) => {
        setOpenId(openId === id ? null : id)
    }
    return (
        <section className="relative z-10 w-full py-20">
            <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
                <h3 className="text-md font-medium text-emerald-500 mb-4">Work History</h3>
                <p className="text-zinc-400 max-w-lg mx-auto">
                    A detailed view of my past roles.
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-8">
                <div className="rounded-2xl border border-[#262626]/60 bg-[#101010]/20 backdrop-blur-md overflow-hidden">
                    {workExperience.map((job, index) => {
                        const isOpen = openId === job.id
                        const isLast = index === workExperience.length - 1
                        return (
                            <div
                                key={job.id}
                                className={`border-white/5 ${!isLast ? 'border-b' : ''}`}
                            >
                                <button
                                    onClick={() => toggleOpen(job.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                        <span className="text-xs font-mono text-zinc-500 w-32 shrink-0">
                                            {job.startDate} &mdash; {job.endDate}
                                        </span>
                                        <div>
                                            <span className="text-base font-semibold text-white mr-3">
                                                {job.role}
                                            </span>
                                            <span className="text-sm text-zinc-400 hidden md:inline-block">
                                                {job.company}
                                            </span>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{
                                            rotate: isOpen ? 90 : 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className="text-zinc-500 shrink-0 ml-4"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.div>
                                </button>

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
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 pl-6 md:pl-[172px]">
                                                <div className="md:hidden text-sm text-emerald-400 mb-3">
                                                    {job.company}
                                                </div>
                                                <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
                                                    {job.description}
                                                </p>
                                                <ul className="space-y-2 mb-6">
                                                    {job.achievements.map((achievement, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-2 text-sm text-zinc-400"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-500/50 mt-0.5 shrink-0" />
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs font-medium text-zinc-400 bg-white/5 px-2 py-1 rounded-md"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
