"use client";

import { motion } from "framer-motion";
import { techStack } from "@/components/data";
import { cn } from "@/lib/utils";
import { contentContainer } from "@/components/about/layout";

const techStackRows = [
  {
    direction: "left",
    speed: 30,
    items: techStack,
  },
  {
    direction: "right",
    speed: 35,
    items: [...techStack].reverse(),
  },
];

export function TechStackSection() {
  return (
    <section className="relative z-10 py-12">
      <div className={cn(contentContainer, "text-left")}>
        <h3 className="mb-12 text-md font-medium text-emerald-500">My Tech Stack</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-t border-[#262626]/70 bg-black py-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />

          <div className="flex flex-col gap-5">
            {techStackRows.map((row, rowIndex) => {
              const duplicatedItems = [
                ...row.items,
                ...row.items,
                ...row.items,
                ...row.items,
              ];

              return (
                <div key={row.direction} className="flex min-w-max">
                  <motion.div
                    animate={{
                      x: row.direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
                    }}
                    transition={{
                      duration: row.speed,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="flex min-w-max gap-3 px-3 will-change-transform"
                  >
                    {duplicatedItems.map((tech, itemIndex) => {
                      const Icon = tech.icon;

                      return (
                        <div
                          key={`${rowIndex}-${itemIndex}-${tech.name}`}
                          className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-emerald-500/35 hover:bg-emerald-500/[0.06]"
                        >
                          <Icon className={`h-4 w-4 ${tech.color}`} />
                          <span className="whitespace-nowrap font-medium text-zinc-200">
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
    </section>
  );
}
