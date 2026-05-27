"use client"

import React, { useEffect, useState } from "react"
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
    Linkedin02Icon,
    ArrowUp01Icon,
} from "hugeicons-react"

const MarqueeText = () => (
    <>
        <span
            className="
                text-[18vw] md:text-[12vw]
                font-black tracking-tighter
                text-transparent
                bg-[length:200%_200%]
                bg-clip-text
                animate-[gradient_6s_ease_infinite]

                md:bg-none
                md:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
                md:group-hover:text-emerald-400
                md:group-hover:[-webkit-text-stroke:1px_transparent]

                bg-gradient-to-r
                from-emerald-300
                via-white
                to-emerald-500
            "
        >
            LET&apos;S BUILD ·&nbsp;
        </span>

        <span
            className="
                text-[18vw] md:text-[12vw]
                font-black tracking-tighter
                text-transparent
                bg-[length:200%_200%]
                bg-clip-text
                animate-[gradient_6s_ease_infinite]

                md:bg-none
                md:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
                md:group-hover:text-emerald-400
                md:group-hover:[-webkit-text-stroke:1px_transparent]

                bg-gradient-to-r
                from-emerald-300
                via-white
                to-emerald-500
            "
        >
            LET&apos;S BUILD ·&nbsp;
        </span>

        <span
            className="
                text-[18vw] md:text-[12vw]
                font-black tracking-tighter
                text-transparent
                bg-[length:200%_200%]
                bg-clip-text
                animate-[gradient_6s_ease_infinite]

                md:bg-none
                md:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
                md:group-hover:text-emerald-400
                md:group-hover:[-webkit-text-stroke:1px_transparent]

                bg-gradient-to-r
                from-emerald-300
                via-white
                to-emerald-500
            "
        >
            LET&apos;S BUILD ·&nbsp;
        </span>
    </>
)

export default function Footer() {
    const [formattedTime, setFormattedTime] = useState("--:--:-- --")

    // Marquee animation
    const baseX = useMotionValue(0)

    useAnimationFrame((t, delta) => {
        const moveBy = -0.002 * delta
        baseX.set(baseX.get() + moveBy)
    })

    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Barbados",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })

        const updateTime = () => {
            const time = formatter.format(new Date())

            // Force fixed width by padding shorter values
            setFormattedTime(time)
        }

        updateTime()

        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer className="flex w-full max-w-full flex-col items-center overflow-hidden pt-20 pb-8 md:px-8">
            {/* Top Label */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                What&apos;s next?
            </div>

            {/* Animated Marquee */}
            <div className="group relative mb-24 w-full overflow-x-hidden">
                <motion.div
                    className="flex min-w-max items-center whitespace-nowrap will-change-transform"
                    style={{ x }}
                >
                    {/* First Set */}
                    <div className="flex items-center">
                        <MarqueeText />
                    </div>

                    {/* Duplicate Set */}
                    <div className="flex items-center">
                        <MarqueeText />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 pb-20 md:flex-row">
                {/* Left */}
                <div className="flex flex-col items-center gap-4 text-center text-sm text-zinc-500 md:flex-row md:gap-8 md:text-left">
                    <span>© 2024 Lamar</span>

                    <span className="hidden h-1 w-1 rounded-full bg-zinc-700 md:block" />

                    <span className="flex items-center whitespace-nowrap">
                        Barbados —

                        <span className="ml-2 inline-block min-w-[110px] text-left tabular-nums">
                            {formattedTime}
                        </span>
                    </span>
                </div>

                {/* Center */}
                <div className="flex items-center gap-3">
                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <GithubIcon size={18} strokeWidth={1.8} />

                        <span className="sr-only">GitHub</span>
                    </a>

                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <NewTwitterIcon size={18} strokeWidth={1.8} />

                        <span className="sr-only">Twitter</span>
                    </a>

                    <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                        <Linkedin02Icon size={18} strokeWidth={1.8} />

                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>

                {/* Right */}
                <button
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
                >
                    <span>Back to top</span>

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
