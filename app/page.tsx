"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ScalesContainerDemo from "@/components/scales-container-demo";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { techStack } from "@/components/data";
import { WorkAccordion } from "@/components/WorkAccordion";

const cardContent = { title: "Hi, I'm Lamar" };
const animatedWords = ["innovative", "proactive", "adaptable"];

const AnimatedWord = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % animatedWords.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex items-center justify-center overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={animatedWords[current]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-center text-white/90 font-semibold tracking-wide px-2 w-30 round/ed-full"
                >
                    {animatedWords[current]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const CardBody = ({ className = "p-4" }: { className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("text-start", className)}
    >
        <h3 className="text-3xl font-semibold mb-4 text-white tracking-tight">
            {cardContent.title}
        </h3>
        <p className="text-lg text-zinc-300 max-w-3xl leading-9">
            I’m an <AnimatedWord /> developer and designer crafting exceptional digital experiences with cutting-edge technologies and innovative solutions.
        </p>
    </motion.div>
);

const PageBackground = () => {
    // const Icon = ({ className }: { className?: string }) => (
    //     <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         width={24}
    //         height={24}
    //         strokeWidth="1"
    //         stroke="currentColor"
    //         className={cn("text-white size-6 absolute", className)}
    //     >
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    //     </svg>
    // );

    // return (
    //     <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-10">
    //         <div className="relative h-full w-full border-l border-r border-white/10 bg-transparent">
    //             <Icon className="-top-3 -left-3" />
    //             <Icon className="-top-3 -right-3" />
    //             <Icon className="-bottom-3 -left-3" />
    //             <Icon className="-bottom-3 -right-3" />
    //             {/* <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" /> */}
    //         </div>
    //     </div>
    // );
};

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white py-10 md:px-40 font-sans">
            {/* <PageBackground /> */}
            <div className="relative z-10 max-w-4xl space-y-8 pt-25 px-8">

                <div className="inline-flex items-center gap-2 rounded-full bg-[#343434]/20 px-4 py-2.5 text-sm/tight tracking-normal font-medium text-white/70 border border-[#262626]/60 backdrop-blur-md shadow-inner">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available for new projects
                </div>

                <CardBody className="p-0" />

                <div className="flex items-center gap-3">
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-95"
                    >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span>View Projects</span>
                    </a>

                    <a
                        href="/cv.pdf"
                        download
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#343434]/20 border-2 border-[#262626]/70 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
                    >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <span>Download CV</span>
                    </a>
                </div>
            </div>

            {/* Divider (Scales Container) */}
            <div className="relative z-10 w-full pt-16">
                <div className="w-screen md:-ml-[43vw] md:left-1/2 relative">
                    <ScalesContainerDemo />
                </div>
            </div>



            {/* About section */}
            <section className="relative z-10 max-w-4xl space-y-8 py-12 px-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h2 className="text-md font-normal text-[#6c6c6c] border w-fit bg-[#262626]/20 border-[#262626]/60 rounded-full px-3 py-1.5">About Me</h2>
                </motion.div>
                {/* Main Layout */}
                <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h2 className="max-w-4xl text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
                                Designing and developing digital experiences that feel{" "}
                                <span className="text-white/40">
                                    modern, intuitive and memorable.
                                </span>
                            </h2>

                            <p className="max-w-3xl text-lg leading-9 text-zinc-400">
                                I am from Barbados visually refined interfaces and
                                performant web experiences that blend creativity with
                                functionality. My approach combines clean development,
                                thoughtful design systems, and attention to detail to
                                create products that feel seamless across every screen.
                            </p>

                            <p className="max-w-3xl text-lg leading-9 text-zinc-400">
                                Whether I’m developing responsive frontends, designing
                                fluid interactions, or experimenting with emerging
                                technologies, I aim to craft experiences that are both
                                aesthetically striking and highly usable.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                                { value: "3+", label: "Years Experience" },
                                { value: "15+", label: "Projects Built" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="relative overflow-hidden rounded-3xl border border-[#262626]/70 bg-[#101010]/60 p-5 backdrop-blur-xl"
                                >
                                    {/* Shader Background */}
                                    <div className="pointer-events-none absolute inset-0 opacity-70">
                                        <ShaderGradientCanvas
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                            }}
                                            pixelDensity={1.2}
                                            fov={45}
                                        >
                                            <ShaderGradient
                                                animate="on"
                                                type="plane"
                                                shader="defaults"
                                                wireframe={false}
                                                // bgColor1="#000000"
                                                // bgColor2="#000000"
                                                color1="#101010"
                                                color2="#101010"
                                                color3="#10B981"
                                                cDistance={3.6}
                                                cPolarAngle={90}
                                                cAzimuthAngle={180}
                                                positionX={-1.4}
                                                rotationY={10}
                                                rotationZ={50}
                                                uSpeed={0.3}
                                                uStrength={2.4}
                                                uDensity={1.2}
                                                uFrequency={5.5}
                                                grain="on"
                                                reflection={0.1}
                                            />
                                        </ShaderGradientCanvas>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-semibold text-white">
                                            {item.value}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                    </motion.div>
                </div>
            </section>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10 flex justify-center"
            >
                <h2 className="text-md font-medium text-emerald-500 w-fit px-3 py-1.5">
                    My Tech Stack
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                {/* Marquee Rows */}
                <div className="relative overflow-hidden border-b border-t border-[#262626]/70 py-6 mb-12">
                    {/* Edge fades */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />

                    <div className="flex flex-col gap-4">
                        {[
                            {
                                direction: "left",
                                speed: 30,
                                items: [...techStack].sort(() => Math.random() - 0.5),
                            },
                            {
                                direction: "right",
                                speed: 35,
                                items: [...techStack].sort(() => Math.random() - 0.5),
                            },
                        ].map((row, i) => {
                            const duplicatedItems = [
                                ...row.items,
                                ...row.items,
                                ...row.items,
                            ];

                            return (
                                <div key={i} className="flex w-max">
                                    <motion.div
                                        animate={{
                                            x:
                                                row.direction === "left"
                                                    ? ["0%", "-33.33%"]
                                                    : ["-33.33%", "0%"],
                                        }}
                                        transition={{
                                            duration: row.speed,
                                            ease: "linear",
                                            repeat: Infinity,
                                        }}
                                        className="flex gap-3 px-4"
                                    >
                                        {duplicatedItems.map((tech, j) => {
                                            const Icon = tech.icon;

                                            return (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className="flex items-center gap-2 rounded-full border bg-[#262626]/20 border-[#262626]/60 px-4 py-2 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5"
                                                >
                                                    <Icon
                                                        className={`h-4 w-4 ${tech.color}`}
                                                    />
                                                    <span className="whitespace-nowrap text-xs font-medium text-zinc-200">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
            {/* Work / Experience Accordion */}
            <WorkAccordion />
        </main >
    );
}
