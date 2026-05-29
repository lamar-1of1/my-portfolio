"use client"

import React, { useEffect, useRef, useState } from "react"
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
    wrap,
} from "framer-motion"
import {
    ArrowUp01Icon,
    GithubIcon,
    Linkedin02Icon,
    NewTwitterIcon,
} from "hugeicons-react"

const MarqueeText = () => (
    <>
        {Array.from({ length: 3 }).map((_, index) => (
            <span
                key={index}
                className="bg-gradient-to-r from-emerald-300 via-white to-emerald-500 bg-[length:200%_200%] bg-clip-text text-[18vw] font-black tracking-tighter text-transparent animate-[gradient_6s_ease_infinite] md:bg-none md:text-[12vw] md:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:group-hover:text-emerald-400 md:group-hover:[-webkit-text-stroke:1px_transparent]"
            >
                LET&apos;S BUILD &middot;&nbsp;
            </span>
        ))}
    </>
)

function FooterPillButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold tracking-tight text-[#0a0a0a] transition-colors duration-300 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
            <span className="py-1">{label}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-white transition-transform duration-300 group-hover/pill:rotate-12">
                <ArrowUp01Icon size={16} strokeWidth={2} />
            </span>
        </button>
    )
}

export default function Footer() {
    const [formattedTime, setFormattedTime] = useState("--:--:-- --")
    const footerRef = useRef<HTMLElement>(null)
    const baseX = useMotionValue(0)

    useAnimationFrame((_, delta) => {
        baseX.set(baseX.get() - 0.002 * delta)
    })

    const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`)

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Barbados",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
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
            const canScroll =
                parent.scrollHeight > parent.clientHeight &&
                /(auto|scroll)/.test(style.overflowY)

            if (canScroll) {
                parent.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
                return
            }

            parent = parent.parentElement
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer
            ref={footerRef}
            className="w-full overflow-hidden border-t border-dashed border-white/10 bg-black px-5 pt-14 text-white"
        >
            <div className="mx-auto max-w-7xl px-1 py-8 md:px-7 lg:px-15">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                    What&apos;s next?
                </div>

                <div className="flex flex-row flex-wrap items-end justify-between gap-8">
                    <div>
                        <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                            Let&apos;s build the{" "}
                            <span className="text-zinc-500">next one.</span>
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                            Have a project in mind? I take on a small number of
                            focused builds at a time.
                        </p>
                    </div>

                    <FooterPillButton label="Book an intro call" />
                </div>
            </div>

            <div className="group relative my-16 w-full overflow-x-hidden border-y border-dashed border-white/10 py-4 md:my-20">
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

            <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap items-center justify-between gap-6 border-t border-dashed border-white/10 pb-10 pt-8">
                <div className="flex flex-row flex-wrap items-center gap-4 text-left text-sm text-zinc-500 md:gap-8">
                    <span>&copy; {new Date().getFullYear()} Lamar</span>
                    <span className="hidden h-1 w-1 rounded-full bg-zinc-700 md:block" />
                    <span className="flex items-center whitespace-nowrap">
                        Barbados
                        <span className="mx-2 h-px w-4 bg-zinc-700" />
                        <span className="inline-block min-w-[110px] text-left tabular-nums">
                            {formattedTime}
                        </span>
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#343434]/20 text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <GithubIcon size={18} strokeWidth={1.8} />
                        <span className="sr-only">GitHub</span>
                    </a>

                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#343434]/20 text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <NewTwitterIcon size={18} strokeWidth={1.8} />
                        <span className="sr-only">Twitter</span>
                    </a>

                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#343434]/20 text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <Linkedin02Icon size={18} strokeWidth={1.8} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>

                <button
                    type="button"
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#343434]/20 p-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
                >
                    <span className="hidden">Back to top</span>
                    <ArrowUp01Icon
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                </button>
            </div>
        </footer>
    )
}
