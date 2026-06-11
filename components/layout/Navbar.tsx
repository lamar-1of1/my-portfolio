"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Grip,
    X,
    Home,
    User,
    FolderKanban,
    Mail,
    Command,
    MapPin,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBlur } from '@/components/shared/TopBlur'
const navItems = [
    {
        id: 'home',
        label: 'Home',
        icon: Home,
        keybind: 'H',
        href: '/',
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: FolderKanban,
        keybind: 'P',
        href: '/projects',
    },
    {
        id: 'about',
        label: 'About',
        icon: User,
        keybind: 'A',
        href: '/about',
    },
    {
        id: 'contact',
        label: 'Contact',
        icon: Mail,
        keybind: 'C',
        href: '/contact',
    },
]
const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
}
function NavbarMetaBadge() {
    const [formattedTime, setFormattedTime] = useState('--:-- --')
    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Barbados',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
        const updateTime = () => setFormattedTime(formatter.format(new Date()))
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div
            aria-label={`Location Barbados and local time ${formattedTime}`}
            className="flex h-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap text-xs font-medium text-white/65"
        >
            <MapPin size={14} className="shrink-0 text-white/55" />
            <span className="font-medium text-white/75">Barbados</span>
            <span className="font-bold text-white/20">{'//'}</span>
            <time className="tabular-nums text-white/60">{formattedTime}</time>
        </div>
    )
}
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const activeNav =
        navItems.find((item) => item.href === pathname) || navItems[0]
    const ActiveIcon = activeNav.icon
    const desktopNavItems = navItems
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedKey = event.key.toLowerCase()
            const matchedItem = navItems.find(
                (item) => item.keybind.toLowerCase() === pressedKey,
            )
            if (matchedItem) {
                window.location.href = matchedItem.href
                setIsOpen(false)
            }
            if (pressedKey === 'm') setIsOpen((prev) => !prev)
            if (pressedKey === 'escape') setIsOpen(false)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
    return (
        <>
            <TopBlur height={40} className="mx-5 !top-0 md:!top-16" />

            {/* Desktop Navbar */}
            <div className="fixed left-5 right-5 top-0 z-[100] hidden border-b border-dashed border-white/10 bg-zinc-950/80 backdrop-blur-xl md:block">
                <nav className="mx-auto flex h-16 w-full max-w-7xl items-stretch px-3 lg:px-6 xl:px-8">
                    {/* Brand */}
                    <div className="flex items-center justify-center border-r border-dashed border-white/10 pr-3 lg:pr-5 xl:pr-8">
                        <Link
                            href="/"
                            className="group/brand flex min-w-0 items-center gap-3 text-white transition-colors hover:text-white/85"
                        >
                            <img
                                src="/icon-gif.gif"
                                alt="Lamar logo"
                                className="h-9 w-9 shrink-0"
                            />
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex h-full min-w-0 flex-1 items-center justify-center gap-8 px-2 lg:gap-4 lg:px-5 xl:gap-7 xl:px-8">
                        {desktopNavItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`group relative flex h-full min-w-0 items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 lg:gap-2 xl:text-sm ${isActive ? 'text-white' : 'text-white/55 hover:text-white/90'}`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="desktop-nav-active"
                                            className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-emerald-400"
                                            transition={springConfig}
                                        />
                                    )}
                                    <Icon
                                        size={16}
                                        className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70'}`}
                                    />
                                    <span className="truncate">{item.label}</span>
                                    <kbd
                                        className={`hidden h/-6 min-w-[24px] items-center justify-center rounded-[0.35rem] border p-1 font-sans text-[11px] font-semibold leading-none transition-colors lg:inline-flex ${isActive ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400' : 'border-white/10 bg-black/[0.055] text-white/35 group-hover:text-white/55'}`}
                                    >
                                        {item.keybind}
                                    </kbd>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Meta Badge */}
                    <div className="hidden min-w-0 items-center justify-center border-l border-dashed border-white/10 px-5 xl:flex xl:px-8">
                        <NavbarMetaBadge />
                    </div>

                </nav>
            </div>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-xl md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Floating Menu */}
            <div className="fixed bottom-4 left-4 right-4 z-[100] flex justify-center md:hidden">
                <motion.div
                    layout
                    transition={springConfig}
                    className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#262626] bg-zinc-950/80 backdrop-blur-xl"
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: 'auto',
                                    transition: {
                                        staggerChildren: 0.04,
                                        delayChildren: 0.05,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                        staggerChildren: 0.02,
                                        staggerDirection: -1,
                                    },
                                }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col gap-1 p-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon
                                        const isActive = pathname === item.href
                                        return (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                onClick={() => {
                                                    setIsOpen(false)
                                                }}
                                                className="block"
                                            >
                                                <motion.div
                                                    variants={{
                                                        open: {
                                                            opacity: 1,
                                                            y: 0,
                                                        },
                                                        closed: {
                                                            opacity: 0,
                                                            y: 10,
                                                        },
                                                    }}
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                    transition={springConfig}
                                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${isActive ? 'border-2 border-[#262626]/70 bg-[#262626]/30 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon
                                                            size={18}
                                                        />
                                                        <span className="text-sm tracking-wide">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="flex h-6 items-center gap-1.5 rounded-lg border border-[#262626]/90 bg-[#343434]/20 px-2 shadow-[0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)]">
                                                            <Command size={13} className="text-white/45" />
                                                            <kbd className="font-sans text-xs font-medium uppercase tracking-wide text-white/55">
                                                                {item.keybind}
                                                            </kbd>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Bottom Bar (Always Visible) */}
                    <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src="/icon-gif.gif"
                                alt="Logo"
                                className="h-8 w-8 shrink-0"
                            />
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-2 overflow-hidden rounded-2xl border-2 border-[#262626]/70 bg-[#343434]/20 px-3 py-2 text-white">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeNav.id}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -8,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <ActiveIcon size={17} className="text-white" />
                                        <span className="truncate text-sm capitalize text-white">
                                            {activeNav.label}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="ml-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#262626]/70 bg-[#343434]/20 text-white transition-all duration-200 hover:bg-white/10"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{
                                            rotate: -90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            rotate: 90,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                    >
                                        <X size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{
                                            rotate: 90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            rotate: -90,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                    >
                                        <Grip size={22} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
