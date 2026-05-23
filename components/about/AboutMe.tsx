"use client";

import { motion } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { cn } from "@/lib/utils";
import { contentContainer } from "@/components/about/layout";

const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Built" },
];

export function AboutMe() {
    return (
        <section className={cn(contentContainer, "space-y-8 pt-12")}>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="w-fit rounded-full border-2 border-emerald-500/15 bg-transparent px-3 py-1.5 text-md font-normal text-emerald-500">
                    About Me
                </h2>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.4fr]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="space-y-6 bg-yell/ow-400">
                        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                            Designing and developing digital experiences that feel{" "}
                            <span className="text-white/40">modern, intuitive and memorable.</span>
                        </h2>

                        <p className="max-w-5xl text-lg leading-9 text-zinc-400 text-justify">
                            I am from Barbados visually refined interfaces and performant web
                            experiences that blend creativity with functionality. My approach
                            combines clean development, thoughtful design systems, and attention
                            to detail to create products that feel seamless across every screen.
                        </p>

                        <p className="max-w-3xl text-lg leading-9 text-zinc-400 text-justify">
                            Whether I am developing responsive frontends, designing fluid
                            interactions, or experimenting with emerging technologies, I aim to
                            craft experiences that are both aesthetically striking and highly usable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="relative overflow-hidden rounded-3xl border border-[#262626]/70 bg-[#101010]/60 p-5 backdrop-blur-xl"
                            >
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

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-semibold text-white">{item.value}</h3>
                                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                />
            </div>
        </section>
    );
}
