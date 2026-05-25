import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HoverExpand } from './HoverExpand'
const projectsData = [
    {
        id: 1,
        title: 'Aura Finance',
        year: '2024',
        category: 'Fintech',
        description:
            'A next-gen banking dashboard with real-time analytics and AI-powered insights.',
        techStack: ['React', 'TypeScript', 'D3.js', 'Node.js'],
        role: 'Lead Designer',
        image:
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Nexus OS',
        year: '2023',
        category: 'System Design',
        description:
            'A modular design system powering consistent experiences across 12 product teams.',
        techStack: ['Figma', 'React', 'Storybook', 'Tokens'],
        // role: 'Design Lead',
        image:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Lumina Studio',
        year: '2023',
        category: 'E-Commerce',
        description:
            'Premium lighting e-commerce platform with immersive 3D product previews.',
        techStack: ['Next.js', 'Three.js', 'Stripe', 'Sanity'],
        // role: 'Product Designer',
        image:
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Vanguard AI',
        year: '2022',
        category: 'Web Application',
        description:
            'An intelligent writing assistant with context-aware suggestions and tone analysis.',
        techStack: ['React', 'Python', 'OpenAI', 'PostgreSQL'],
        // role: 'UX Engineer',
        image:
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
    },
    {
        id: 5,
        title: 'PayFlow',
        year: '2022',
        category: 'Fintech',
        description:
            'Streamlined payment processing with fraud detection and merchant analytics.',
        techStack: ['React Native', 'Node.js', 'Redis', 'AWS'],
        // role: 'Senior Designer',
        image:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2500&auto=format&fit=crop',
    },
    {
        id: 6,
        title: 'Thread & Co.',
        year: '2021',
        category: 'E-Commerce',
        description:
            'Sustainable fashion marketplace connecting independent designers with conscious buyers.',
        techStack: ['Vue.js', 'Shopify', 'Figma', 'Algolia'],
        // role: 'Design Consultant',
        image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2500&auto=format&fit=crop',
    },
]
export function ArticleIndex() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    // Derive unique categories from data
    const categories = [
        'All',
        ...Array.from(new Set(projectsData.map((p) => p.category))),
    ]
    // Filter projects based on selected category
    const filteredProjects =
        selectedCategory === 'All'
            ? projectsData
            : projectsData.filter((p) => p.category === selectedCategory)
    // Map to HoverExpandItem format
    const hoverItems = filteredProjects.map((project) => ({
        label: project.title,
        sublabel: project.category,
        description: project.description,
        image: project.image,
        techStack: project.techStack,
        role: project.role,
    }))
    return (
        <>
            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl bord/er-b bord/er-white/10">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === category ? 'bg-white text-black shado/w-[0_0_20px_rgba(255,255,255,0.1)]' : 'rounded-xl border border-[#262626]/70 bg-[#101010]/60 p-5 backdro/p-blur-xl text-zinc-400 hover:bg-[#101010]/80 hover:text-white '}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects List Section */}
            <section className="relative w-full overflow-hidden py-20">
                <div className="relative mx-auto flex w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <div className="min-w-0 flex-1 overflow-hidden">


                        {/* Project List using HoverExpand */}
                        <motion.div
                            key={selectedCategory} // Force re-mount/animation when category changes
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                        >
                            {hoverItems.length > 0 ? (
                                <HoverExpand items={hoverItems} />
                            ) : (
                                <div className="py-20 text-center text-zinc-500">
                                    No projects found in this category.
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
