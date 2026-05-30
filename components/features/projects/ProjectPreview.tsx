import { AnimatePresence, motion } from "framer-motion";

import { PillButton, StatusPill } from "@/components/features/projects/ProjectBits";
import type { ProjectItem } from "@/lib/content/projects";

export function ProjectPreview({ project }: { project: ProjectItem }) {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="mb-6 flex shrink-0 items-center justify-between border-b border-dashed border-white/10 pb-4">
                <span className="text-sm font-semibold uppercase tracking-normal text-zinc-500">
                    Preview
                </span>
                <span className="text-sm font-semibold tabular-nums text-white">
                    {project.year}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={project.id}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex min-h-0 flex-col"
                >
                    <div className="relative mb-6 aspect-[16/10] max-h-[36vh] w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-900">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                    </div>

                    <div className="mb-5 flex flex-wrap items-center gap-3">
                        <StatusPill status={project.projectStatus} />
                        <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                            {project.tag}
                        </span>
                        <PillButton
                            label="View Project"
                            variant="ghost"
                            className="ml-auto"
                        />
                    </div>

                    <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
                        {project.title}
                    </h2>
                    <p className="text-base leading-relaxed text-zinc-400 xl:text-lg">
                        {project.subtitle}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
