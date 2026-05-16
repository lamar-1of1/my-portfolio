"use client"; // Required for interactivity in Next.js App Router
import { useState } from 'react';
import { Grip, Home, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* The Floating Pill */}
            <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between px-1 py-2 border border-[#262626] backdrop-blur-3xl bg-transparent shadow-2xl rounded-2xl">
                {/* Logo + Projects */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                        <img src="/icon-gif.gif" alt="Sidebar logo" className="h-8 w-8" />
                    </div>

                    {/* Divider + time */}
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-0.5 rounded-full bg-[#FFFFFF]/25" />
                    </div>

                    <div className="bg-[#343434]/20 border-2 border-[#262626]/70 text-white rounded-2xl px-3 py-2 flex items-center gap-2">
                        <Home size={16} />
                        <span className="text-sm font-normal tracking-wide">Home</span>
                    </div>
                </div>

                {/* Right: menu button */}
                <div className="pr-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white p-1.5 rounded-2xl bg-[#343434]/20 border-2 border-[#262626]/70 transition-colors duration-200"
                    >
                        {isOpen ? <X size={24} /> : <Grip size={24} />}
                    </button>
                </div>
            </div>

            {/* The Sliding Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 z-40 overflow-hidden bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-8"
                    >
                        <div className="relative z-10 flex flex-col items-center gap-8 text-white">
                            <a onClick={() => setIsOpen(false)} href="/" className="text-2xl font-bold">
                                Home
                            </a>
                            <a onClick={() => setIsOpen(false)} href="/about" className="text-2xl font-bold">
                                About
                            </a>
                            <a onClick={() => setIsOpen(false)} href="/projects" className="text-2xl font-bold">
                                Projects
                            </a>
                            <a onClick={() => setIsOpen(false)} href="/contact" className="text-2xl font-bold">
                                Contact
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
