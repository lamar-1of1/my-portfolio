"use client"
import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    Home,
    User,
    FolderKanban,
    Mail,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { TopBlur } from '@/components/shared/TopBlur'
import { scrollToHash } from '@/lib/smooth-scroll'
const navItems = [
    {
        id: 'home',
        label: 'Home',
        icon: Home,
        keybind: 'H',
        href: '/#home',
    },
    {
        id: 'about',
        label: 'About',
        icon: User,
        keybind: 'A',
        href: '/#about',
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: FolderKanban,
        keybind: 'P',
        href: '/#featured-projects',
    },
    {
        id: 'contact',
        label: 'Contact',
        icon: Mail,
        keybind: 'C',
        href: '/#contact',
    },
]
const getSectionId = (item: (typeof navItems)[number]) =>
    item.href.split('#')[1] || item.id

const getActiveSectionId = (sectionId: string) =>
    sectionId === 'featured-projects' ? 'projects' : sectionId

const selectionSpring = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 42,
    mass: 0.75,
}

const iconSpring = {
    type: 'spring' as const,
    stiffness: 620,
    damping: 34,
    mass: 0.55,
}

const getActiveSectionForPath = (pathname: string) => {
    if (pathname.startsWith('/projects')) return 'projects'
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
}

const setSectionIfChanged = (
    setActiveSection: (value: string | ((current: string) => string)) => void,
    sectionId: string,
) => {
    setActiveSection((current) => (current === sectionId ? current : sectionId))
}

// Keep global nav shortcuts from firing while visitors type.
const isEditableTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false

    return (
        target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    )
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
            <Image
                src="/flag_bb.svg.png"
                alt=""
                width={18}
                height={12}
                className="h-3 w-[18px] shrink-0 rounded-[2px] object-cover"
            />
            <span className="font-medium text-white/75">Barbados</span>
            <span className="font-bold text-white/20">{'//'}</span>
            <time className="tabular-nums text-white/60">{formattedTime}</time>
        </div>
    )
}
export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home')
    const [hoveredSection, setHoveredSection] = useState<string | null>(null)
    const pathname = usePathname()
    const highlightedSection = hoveredSection || activeSection
    const desktopNavItems = navItems
    const scrollToSection = (
        item: (typeof navItems)[number],
        behavior: ScrollBehavior = 'smooth',
    ) => {
        const sectionId = getSectionId(item)

        if (behavior === 'auto') {
            if (item.id === 'home') {
                window.scrollTo({ top: 0, behavior })
                return
            }

            const target = document.getElementById(sectionId)

            if (!target) return

            const navOffset = window.matchMedia('(min-width: 768px)').matches ? 72 : 20
            const targetTop =
                target.getBoundingClientRect().top + window.scrollY - navOffset

            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior,
            })
            return
        }

        scrollToHash(`#${sectionId}`)
    }

    useEffect(() => {
        if (pathname === '/') return

        setSectionIfChanged(setActiveSection, getActiveSectionForPath(pathname))
    }, [pathname])

    useEffect(() => {
        if (pathname !== '/') return

        const sectionIds = navItems.map(getSectionId)
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => Boolean(section))

        let animationFrame = 0

        const getActiveSectionFromScroll = () => {
            if (sections.length === 0) return 'home'

            const isDesktop = window.matchMedia('(min-width: 768px)').matches
            const activationOffset = isDesktop
                ? 88
                : Math.min(window.innerHeight * 0.36, 220)
            const scrollPosition = window.scrollY + activationOffset
            const pageBottom = window.scrollY + window.innerHeight
            const isAtPageBottom =
                pageBottom >= document.documentElement.scrollHeight - 2

            if (isAtPageBottom) {
                return getActiveSectionId(sections[sections.length - 1].id)
            }

            const activeSection =
                sections
                    .filter((section) => section.offsetTop <= scrollPosition)
                    .at(-1) || sections[0]

            return getActiveSectionId(activeSection.id)
        }

        const updateFromScroll = () => {
            animationFrame = 0
            setSectionIfChanged(setActiveSection, getActiveSectionFromScroll())
        }

        const requestUpdateFromScroll = () => {
            if (animationFrame) return
            animationFrame = window.requestAnimationFrame(updateFromScroll)
        }

        const updateFromHash = () => {
            const hash = window.location.hash.replace('#', '')

            if (sectionIds.includes(hash)) {
                setSectionIfChanged(setActiveSection, getActiveSectionId(hash))
                return
            }

            requestUpdateFromScroll()
        }

        updateFromHash()

        if (window.location.hash) {
            requestAnimationFrame(() => {
                const matchedItem = navItems.find(
                    (item) => getSectionId(item) === window.location.hash.replace('#', ''),
                )

                if (matchedItem) scrollToSection(matchedItem, 'auto')
            })
        }

        window.addEventListener('hashchange', updateFromHash)
        window.addEventListener('popstate', updateFromHash)
        window.addEventListener('resize', requestUpdateFromScroll)
        window.addEventListener('scroll', requestUpdateFromScroll, { passive: true })

        return () => {
            window.removeEventListener('hashchange', updateFromHash)
            window.removeEventListener('popstate', updateFromHash)
            window.removeEventListener('resize', requestUpdateFromScroll)
            window.removeEventListener('scroll', requestUpdateFromScroll)

            if (animationFrame) window.cancelAnimationFrame(animationFrame)
        }
    }, [pathname])
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                isEditableTarget(event.target) ||
                event.altKey ||
                event.ctrlKey ||
                event.metaKey
            ) {
                return
            }

            const pressedKey = event.key?.toLowerCase?.()

            if (!pressedKey) return

            const matchedItem = navItems.find(
                (item) => item.keybind?.toLowerCase?.() === pressedKey,
            )
            if (matchedItem) {
                event.preventDefault()
                const sectionId = getSectionId(matchedItem)
                window.history.pushState(null, '', `/#${sectionId}`)
                setActiveSection(matchedItem.id)
                scrollToSection(matchedItem)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
    const handleNavClick = (
        event: MouseEvent<HTMLAnchorElement>,
        item: (typeof navItems)[number],
    ) => {
        if (pathname !== '/') {
            setActiveSection(item.id)
            return
        }

        event.preventDefault()
        setActiveSection(item.id)

        const targetId = getSectionId(item)
        window.history.pushState(null, '', `/#${targetId}`)
        scrollToSection(item)
    }
    return (
        <>
            <TopBlur height={40} className="mx-5 !top-0 md:!top-16" />

            {/* Desktop Navbar */}
            <div className="fixed left-5 right-5 top-0 z-[100] hidden border-b border-dashed border-white/10 bg-zinc-950/80 backdrop-blur-xl md:block">
                <nav className="mx-auto flex h-16 w-full max-w-7xl items-stretch px-3 lg:px-6 xl:px-8">
                    {/* Brand */}
                    <div className="flex items-center justify-center border-r border-dashed border-white/10 pr-3 lg:pr-5 xl:pr-8">
                        <Link
                            href="/#home"
                            onClick={(event) => handleNavClick(event, navItems[0])}
                            className="group/brand flex min-w-0 items-center gap-3 text-white transition-colors hover:text-white/85"
                        >
                            <Image
                                src="/icon-gif.gif"
                                alt="Lamar logo"
                                width={36}
                                height={36}
                                unoptimized
                                className="h-9 w-9 shrink-0"
                            />
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex h-full min-w-0 flex-1 items-center justify-center gap-8 px-2 lg:gap-4 lg:px-5 xl:gap-7 xl:px-8">
                        {desktopNavItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.id
                            const isHighlighted = highlightedSection === item.id
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={(event) => handleNavClick(event, item)}
                                    onMouseEnter={() => setHoveredSection(item.id)}
                                    onMouseLeave={() => setHoveredSection(null)}
                                    className={`group relative flex h-full min-w-0 items-center gap-1.5 px-2 text-[13px] font-medium transition-colors duration-200 lg:gap-2 xl:text-sm ${isHighlighted ? 'text-white' : 'text-white/55 hover:text-white/90'}`}
                                >
                                    {isHighlighted && (
                                        <motion.span
                                            layoutId="desktop-nav-highlight"
                                            className="absolute inset-x-0 inset-y-3 rounded-3xl border border-white/10 bg-white/[0.03]"
                                            transition={selectionSpring}
                                        />
                                    )}
                                    <motion.span
                                        className="relative z-10 flex shrink-0"
                                        whileTap={{ scale: 0.94 }}
                                        transition={iconSpring}
                                    >
                                        <Icon
                                            size={16}
                                            className={`transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70'}`}
                                        />
                                    </motion.span>
                                    <span className="relative z-10 truncate">{item.label}</span>
                                    <kbd
                                        className={`relative z-10 hidden h-6 min-w-[24px] items-center justify-center rounded-full border p-1 font-sans text-[11px] font-semibold leading-none transition-colors lg:inline-flex ${isActive ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400' : 'border-white/10 bg-black/[0.055] text-white/35 group-hover:text-white/55'}`}
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

            {/* Mobile Tab Bar */}
            <div
                className="fixed inset-x-0 bottom-0 z-[100] px-4 pt-2 md:hidden"
                style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
            >
                <nav
                    aria-label="Mobile navigation"
                    className="mx-auto grid h-12 w-full max-w-[18rem] grid-cols-4 gap-1 rounded-full border border-white/10 bg-zinc-950/85 p-1 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.id

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={(event) => handleNavClick(event, item)}
                                className={`group relative flex h-10 min-w-0 items-center justify-center rounded-full transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/55 active:text-white'}`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="mobile-tab-highlight"
                                        className="absolute inset-0 rounded-full border border-emerald-400/20 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                        transition={selectionSpring}
                                    />
                                )}
                                {isActive && (
                                    <motion.span
                                        key={`${item.id}-select-pulse`}
                                        className="absolute inset-1 rounded-full bg-emerald-400/15"
                                        initial={{ opacity: 0.42, scale: 0.66 }}
                                        animate={{ opacity: 0, scale: 1.2 }}
                                        transition={{
                                            duration: 0.42,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />
                                )}

                                <motion.span
                                    className="relative z-10 flex"
                                    animate={{
                                        y: isActive ? -1.5 : 0,
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={iconSpring}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={2.1}
                                        className={`transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-white/50 group-active:text-white'}`}
                                    />
                                </motion.span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}
