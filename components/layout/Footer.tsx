"use client"

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
    wrap,
} from "framer-motion"
import {
    GithubIcon,
    NewTwitterIcon,
} from "hugeicons-react"
import { ArrowUp } from "lucide-react"

const socialLinks = [
    { label: "GitHub", href: "#", icon: GithubIcon },
    { label: "Twitter", href: "#", icon: NewTwitterIcon },
    // { label: "LinkedIn", href: "#", icon: Linkedin02Icon },
]

const marqueeSpeed = 0.001

const MarqueeText = () => (
    <>
        {Array.from({ length: 4 }).map((_, index) => (
            <span
                key={index}
                className="inline-flex select-none items-center gap-[2vw] text-[0px] leading-none"
            >
                <span className="text-[15vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] transition-colors duration-300 group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.25)] md:text-[9vw]">
                    BARBADOS
                </span>
                <Image
                    src="/Barbados_trident.svg"
                    alt=""
                    width={428}
                    height={485}
                    aria-hidden="true"
                    className="mr-[2vw] h-[10vw] w-auto shrink-0 opacity-50 transition-opacity duration-300 group-hover:opacity-95 md:h-[6vw]"
                />
            </span>
        ))}
    </>
)

// function FooterPillButton({ label }: { label: string }) {
//     return (
//         <Link
//             href="#contact"
//             className="group/pill inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold tracking-tight text-zinc-950 transition-all duration-300 hover:bg-zinc-100 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
//         >
//             <span className="font-medium text-zinc-900">{label}</span>
//             <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-transform duration-500 ease-out group-hover/pill:rotate-45">
//                 <ArrowUpRight size={16} strokeWidth={2.5} />
//             </span>
//         </Link>
//     )
// }

export default function Footer() {
    const [formattedTime, setFormattedTime] = useState("--:-- --")
    const footerRef = useRef<HTMLElement>(null)
    const baseX = useMotionValue(0)

    // Smooth independent frame loop calculation
    useAnimationFrame((_, delta) => {
        baseX.set(baseX.get() + marqueeSpeed * delta)
    })

    const x = useTransform(baseX, (value) => `${wrap(-50, 0, -value)}%`)

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Barbados",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        const updateTime = () => setFormattedTime(formatter.format(new Date()))
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const scrollToTop = () => {
        let parent = footerRef.current?.parentElement
        while (parent) {
            const style = window.getComputedStyle(parent)
            if (parent.scrollHeight > parent.clientHeight && /(auto|scroll)/.test(style.overflowY)) {
                parent.scrollTo({ top: 0, behavior: "smooth" })
                return
            }
            parent = parent.parentElement
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer
            ref={footerRef}
            className="relative w-full overflow-hidden border-t border-dashed border-white/10 bg-zinc-950 px-8 pt-16 text-white md:px-12 md:pt-32"
        >
            {/* Core Header Elements */}
            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3.5 py-2 text-sm font-medium text-emerald-300">
                    What&apos;s next?
                </div>

                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-4xl">
                        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Let&apos;s build the <span className="text-zinc-500">next one.</span>
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
                            Have a project in mind? I take on a small number of focused builds at a time.
                        </p>
                    </div>
                    {/* <div className="flex shrink-0 lg:justify-end">
                        <FooterPillButton label="Book an intro call" />
                    </div> */}
                </div>
            </div>

            {/* Infinite Text Marquee Component Wrapper */}
            <div className="relative left-1/2 right-1/2 z-10 -ml-[50vw] -mr-[50vw] mb-10 mt-16 w-screen md:my-14">
                <div className="group flex h-24 w-full items-center overflow-hidden border-y border-dashed border-white/10 py-2 md:h-36">
                    <motion.div
                        className="flex min-w-max items-center whitespace-nowrap will-change-transform"
                        style={{ x }}
                    >
                        <div className="flex items-center">
                            <MarqueeText />
                        </div>

                        <div className="flex items-center">
                            <MarqueeText />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Global Metadata Area */}
            <div className="relative z-10 mx-auto max-w-7xl pb-22 pt-4 sm:pb-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8">

                    {/* Live Status Indicators */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span>Available for opportunities</span>
                        </div>

                        <p className="text-sm font-medium text-zinc-400 tabular-nums">
                            Local Time: <time className="text-zinc-200">{formattedTime} AST (GMT-4)</time>
                        </p>
                    </div>

                    {/* Integrated Social Networks Grid */}
                    <nav aria-label="Social Links Menu" className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon
                            return (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="group/social flex h-10 w-10 items-center justify-center rounded-full duration-200 border border-white/10 bg-white/[0.03] text-white/75 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                >
                                    <Icon size={18}
                                        className="transition-transform duration-300"
                                    />
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Subfooter Trademark & Window Actions */}
                <div className="flex items-end justify-between gap-6 pt-8 text-xs text-zinc-500">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#262626]/70 bg-white/[0.005]">
                            <Image
                                src="/icon-gif.gif"
                                alt="Lamar logo"
                                fill
                                sizes="48px"
                                unoptimized
                                className="object-contain p-2"
                            />
                        </div>
                        <p className="leading-relaxed">
                            &copy; {new Date().getFullYear()} Lamar
                            <br />
                            Barbados
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="cursor-pointer group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#262626]/70 bg-white/[0.025] px-4 py-2.5 font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        <span>Back to top</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-white transition-colors group-hover:bg-white/10">
                            <ArrowUp size={14} className="transition-transform duration-300 ease-out" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    )
}
