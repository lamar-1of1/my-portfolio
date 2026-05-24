"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
    GithubIcon,
    NewTwitterIcon,
    Linkedin02Icon,
    ArrowUp01Icon,
} from "hugeicons-react"

export default function Footer() {
    // Prevent hydration mismatch
    const [formattedTime, setFormattedTime] = useState("")

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Barbados",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })

        const updateTime = () => {
            setFormattedTime(formatter.format(new Date()))
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
        <footer className="flex w-full flex-col items-center overflow-hidden bg-bla/ck px-4 pt-20 pb-8 md:px-8">
            {/* Top Label */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                What&apos;s next?
            </div>

            {/* Massive Headline */}
            <div className="group relative mb-24 flex w-full cursor-pointer justify-center overflow-hidden">
                <motion.h2
                    className="select-none bg-clip-text text-center text-[12vw] leading-none font-black tracking-tighter text-transparent transition-all duration-500"
                    whileHover={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff, #10B981)",
                        opacity: 1,
                    }}
                    style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.2))",
                    }}
                >
                    LET&apos;S&nbsp; BUILD
                </motion.h2>
            </div>

            {/* Bottom Bar */}
            <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t  border-white/10 pt-8 pb-20 md:flex-row">
                {/* Left */}
                <div className="flex flex-col items-center gap-4 text-center text-sm text-zinc-500 md:flex-row md:gap-8 md:text-left">
                    <span>© 2024 Lamar</span>

                    <span className="hidden h-1 w-1 rounded-full bg-zinc-700 md:block" />

                    <span className="whitespace-nowrap w-42 bg-r/ed-500">
                        Barbados — {formattedTime || "--:--:--"}
                    </span>
                </div>

                {/* Center */}
                <div className="flex items-center gap-3 ">
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
