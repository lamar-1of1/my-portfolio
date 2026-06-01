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
    Linkedin02Icon,
    NewTwitterIcon,
} from "hugeicons-react"

import { ArrowUp, ArrowUpRight } from "lucide-react"

const socialLinks = [
    {
        label: "GitHub",
        href: "#",
        icon: GithubIcon,
    },
    {
        label: "Twitter",
        href: "#",
        icon: NewTwitterIcon,
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: Linkedin02Icon,
    },
]

const MarqueeText = () => (
    <>
        {Array.from({ length: 3 }).map((_, index) => (
            <span
                key={index}
                className="bg-gradient-to-r from-emerald-300 via-white to-emerald-500 bg-[length:200%_200%] bg-clip-text text-[18vw] font-black leading-none tracking-tighter text-transparent animate-[gradient_6s_ease_infinite] md:bg-none md:text-[11vw] md:[-webkit-text-stroke:1px_rgba(255,255,255,0.18)] md:group-hover:text-emerald-400 md:group-hover:[-webkit-text-stroke:1px_transparent]"
            >
                LET&apos;S BUILD &middot;&nbsp;
            </span>
        ))}
    </>
)

function FooterPillButton({ label }: { label: string }) {
    return (
        <Link
            href="/contact"
            className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold tracking-tight text-[#0a0a0a] shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-colors duration-300 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
            <span className="py-1">{label}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-white transition-transform duration-300 ">
                <ArrowUpRight size={16} strokeWidth={2} />
            </span>
        </Link>
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
            className="relative w-full overflow-hidden border-t border-dashed border-white/10 bg-black px-5 pt-14 text-white md:pt-18"
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    aria-hidden="true"
                    className="positioned-element pointer-events-none absolute md:-bottom-25 bottom-48 z-0 h/idden h-[15rem] w-[15rem] o/pacity-60 mix-blend-screen md:block xl:h-[50rem] xl:w-[50rem]"
                    style={{
                        left: `calc(${index * 18}% - 12rem)`,
                    }}
                >
                    <Image
                        src="/assets/brand-social-preview-Photoroom.png"
                        alt=""
                        fill
                        // sizes="66rem"
                        className="object-contain"
                    />
                </div>
            ))}

            <div className="relative z-10 mx-auto max-w-7xl px-1 md:px-7 lg:px-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3.5 py-2 text-sm font-medium text-emerald-300">
                    What&apos;s next?

                </div>
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="max-w-4xl">
                        <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                            Let&apos;s build the{" "}
                            <span className="text-zinc-500">next one.</span>
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
                            Have a project in mind? I take on a small number of
                            focused builds at a time.
                        </p>
                    </div>

                    <div className="flex lg:justify-end">
                        <FooterPillButton label="Book an intro call" />
                    </div>
                </div>
            </div>


            <div className="group relative z-10 my-14 flex h-[8rem] w-full items-center overflow-x-hidden border-y border-dashed border-white/10 md:my-18 md:h-[12rem] lg:h-[15rem]">
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


            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 bor/der-t b/order-dashed bor/der-white/10 px-1 pb-20 pt-7 md:flex-row md:items-center md:justify-between md:px-7 md:pb-10 lg:px-12">
                <div className="flex flex-row flex-wrap items-center gap-4 text-sm text-zinc-500 md:gap-8">
                    <span className="whitespace-nowrap">
                        &copy; {new Date().getFullYear()} Lamar
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-zinc-700 md:block" />
                    <span className="flex items-center whitespace-nowrap">
                        Barbados
                        <span className="mx-2 h-px w-4 bg-zinc-700" />
                        <span className="inline-block min-w-[110px] text-left tabular-nums">
                            {formattedTime}
                        </span>
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                    <div className="flex items-center gap-2">
                        {socialLinks.map((link) => {
                            const Icon = link.icon

                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="group/social flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.8}
                                        className="transition-transform duration-300 group-hover/social:-translate-y-0.5"
                                    />
                                </a>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                        <ArrowUp
                            size={17}
                            strokeWidth={1.9}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                    </button>
                </div>
            </div>

        </footer>
    )
}
