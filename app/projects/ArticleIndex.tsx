// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ArrowUpRight } from 'lucide-react'
// interface Article {
//     id: string
//     title: string
//     category: string
//     date: string
//     excerpt: string
//     imageUrl: string
// }
// const ARTICLES: Article[] = [
//     {
//         id: '01',
//         title: 'The Future of Minimalist Architecture',
//         category: 'Design',
//         date: 'Oct 12',
//         excerpt:
//             'Exploring how contemporary architects are redefining space, light, and materials to create environments that foster tranquility and focus in an increasingly noisy world.',
//         imageUrl:
//             'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
//     },
//     {
//         id: '02',
//         title: 'A Return to Analog Photography',
//         category: 'Culture',
//         date: 'Oct 08',
//         excerpt:
//             'Why a new generation of creators is abandoning digital perfection for the unpredictable, tactile, and deeply personal nature of film photography.',
//         imageUrl:
//             'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=800',
//     },
//     {
//         id: '03',
//         title: 'Sustainable Fashion in 2026',
//         category: 'Style',
//         date: 'Sep 29',
//         excerpt:
//             'From lab-grown textiles to zero-waste pattern making, we examine the innovative practices that are finally making sustainable fashion the industry standard.',
//         imageUrl:
//             'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800',
//     },
//     {
//         id: '04',
//         title: 'The Art of Slow Living',
//         category: 'Lifestyle',
//         date: 'Sep 15',
//         excerpt:
//             'Embracing intentionality over productivity. Discover practical ways to disconnect, appreciate the mundane, and cultivate a more meaningful daily routine.',
//         imageUrl:
//             'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
//     },
//     {
//         id: '05',
//         title: 'Culinary Innovations in Tokyo',
//         category: 'Food',
//         date: 'Sep 02',
//         excerpt:
//             'A journey through the hidden alleys of Tokyo, where avant-garde chefs are blending centuries-old fermentation techniques with modern gastronomy.',
//         imageUrl:
//             'https://images.unsplash.com/photo-1580828369066-ea9f98b76593?auto=format&fit=crop&q=80&w=800',
//     },
// ]
// const ArticleRow = ({ article }: { article: Article }) => {
//     const [isHovered, setIsHovered] = useState(false)
//     return (
//         <div
//             className="group border-b border-border relative cursor-pointer"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Main Row Content (Always Visible) */}
//             <div className="py-8 flex flex-col md:flex-row items-baseline gap-4 md:gap-12 relative z-10 transition-colors duration-300 group-hover:bg-background/50">
//                 <div className="flex items-center gap-6 w-full md:w-48 shrink-0">
//                     <span className="text-xs font-medium uppercase tracking-widest text-muted">
//                         {article.id}
//                     </span>
//                     <span className="text-sm font-medium uppercase tracking-wider text-muted">
//                         {article.category}
//                     </span>
//                 </div>

//                 <div className="flex-1 flex justify-between items-center w-full">
//                     <h2 className="text-3xl md:text-5xl font-serif text-foreground transition-transform duration-500 ease-out group-hover:translate-x-2">
//                         {article.title}
//                     </h2>
//                     <div className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block">
//                         <ArrowUpRight
//                             className="w-8 h-8 text-foreground"
//                             strokeWidth={1.5}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Expanded Content (Visible on Hover) */}
//             <AnimatePresence>
//                 {isHovered && (
//                     <motion.div
//                         initial={{
//                             height: 0,
//                             opacity: 0,
//                         }}
//                         animate={{
//                             height: 'auto',
//                             opacity: 1,
//                         }}
//                         exit={{
//                             height: 0,
//                             opacity: 0,
//                         }}
//                         transition={{
//                             duration: 0.5,
//                             ease: [0.23, 1, 0.32, 1],
//                         }}
//                         className="overflow-hidden"
//                     >
//                         <div className="pb-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start pl-0 md:pl-60">
//                             <motion.div
//                                 initial={{
//                                     opacity: 0,
//                                     y: 10,
//                                 }}
//                                 animate={{
//                                     opacity: 1,
//                                     y: 0,
//                                 }}
//                                 transition={{
//                                     duration: 0.4,
//                                     delay: 0.1,
//                                 }}
//                                 className="flex-1 max-w-xl"
//                             >
//                                 <p className="text-muted text-lg leading-relaxed line-clamp-2">
//                                     {article.excerpt}
//                                 </p>
//                                 <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
//                                     <span>Read article</span>
//                                     <span className="text-muted">— {article.date}</span>
//                                 </div>
//                             </motion.div>

//                             <motion.div
//                                 initial={{
//                                     opacity: 0,
//                                     scale: 0.95,
//                                 }}
//                                 animate={{
//                                     opacity: 1,
//                                     scale: 1,
//                                 }}
//                                 transition={{
//                                     duration: 0.5,
//                                     delay: 0.1,
//                                     ease: [0.23, 1, 0.32, 1],
//                                 }}
//                                 className="w-full md:w-72 h-48 relative overflow-hidden rounded-sm shrink-0"
//                             >
//                                 <motion.img
//                                     initial={{
//                                         scale: 1.15,
//                                     }}
//                                     animate={{
//                                         scale: 1,
//                                     }}
//                                     transition={{
//                                         duration: 0.7,
//                                         ease: 'easeOut',
//                                     }}
//                                     src={article.imageUrl}
//                                     alt={article.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </motion.div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }
// export function ArticleIndex() {
//     return (
//         <section className="min-h-screen bg-background py-20 px-6 md:px-12 lg:px-24">
//             <div className="max-w-7xl mx-auto">
//                 <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
//                     <div>
//                         <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-4">
//                             Editorial
//                         </h1>
//                         <p className="text-muted text-lg max-w-md">
//                             Curated perspectives on design, culture, and the art of modern
//                             living.
//                         </p>
//                     </div>
//                     <div className="text-sm font-medium uppercase tracking-widest text-muted">
//                         Issue No. 42 — Fall 2026
//                     </div>
//                 </header>

//                 <div className="border-t border-border">
//                     {ARTICLES.map((article) => (
//                         <ArticleRow key={article.id} article={article} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }
