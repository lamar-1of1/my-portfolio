import { ArrowUpRight } from "lucide-react";

import { PillButton, StatusPill } from "@/components/features/projects/ProjectBits";
import type { ProjectItem } from "@/lib/content/projects";

interface ProjectRowProps extends ProjectItem {
    index: number;
    isActive: boolean;
    onMouseEnter: () => void;
}

export function ProjectRow({
    index,
    tag,
    projectStatus,
    title,
    subtitle,
    image,
    year,
    isActive,
    onMouseEnter,
}: ProjectRowProps) {
    const formattedIndex = (index + 1).toString().padStart(2, "0");
    const rowTone = index % 2 === 0 ? "bg-[#343434]/10" : "bg-[#343434]/20";

    return (
        <details
            className={`group border-b border-dashed border-white/10 transition-colors duration-500 last:border-b-0 ${isActive ? "bg-[#343434]/30" : `${rowTone} hover:bg-[#343434]/25`
                }`}
            onMouseEnter={onMouseEnter}
        >
            <summary className="project-row-button flex w-full cursor-pointer list-none flex-col justify-between gap-4 px-5 py-6 text-left md:px-8 md:py-9 lg:cursor-default lg:flex-row lg:items-center [&::-webkit-details-marker]:hidden">
                <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
                    <div className="flex shrink-0 items-center gap-3">
                        <span className="text-xs font-semibold tabular-nums text-zinc-500">
                            {formattedIndex}
                        </span>
                        <span className="h-px w-8 shrink-0 bg-zinc-600" />
                        <span className="text-xs font-medium tabular-nums text-zinc-500">
                            {year}
                        </span>
                    </div>

                    <h3
                        className={`text-2xl font-extrabold tracking-tight transition-all duration-500 md:text-3xl ${isActive
                            ? "text-white lg:translate-x-2"
                            : "text-zinc-500 group-hover:text-zinc-100 lg:group-hover:translate-x-2"
                            }`}
                    >
                        {title}
                    </h3>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                    <span
                        className={`hidden text-sm font-semibold uppercase tracking-normal transition-colors duration-500 lg:block ${isActive
                            ? "text-zinc-300"
                            : "text-zinc-700 group-hover:text-zinc-400"
                            }`}
                    >
                        {tag}
                    </span>
                    <ArrowUpRight
                        strokeWidth={2.25}
                        className={`hidden h-6 w-6 transition-all duration-500 lg:block ${isActive
                            ? "translate-x-0 translate-y-0 text-white opacity-100"
                            : "-translate-x-4 translate-y-4 text-zinc-600 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                            }`}
                    />
                </div>
            </summary>

            <div className="project-mobile-details grid lg:hidden">
                <div className="project-mobile-details-inner overflow-hidden">
                    <div className="project-detail-body px-5 pb-8 pt-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <StatusPill status={projectStatus} />
                            <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                {tag}
                            </span>
                        </div>

                        <div className="project-detail-image relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900">
                            <img
                                src={image}
                                alt={title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                        </div>

                        <p className="text-sm leading-relaxed text-zinc-400">
                            {subtitle}
                        </p>

                        <div className="mt-5">
                            <PillButton label="View Project" />
                        </div>
                    </div>
                </div>
            </div>
        </details>
    );
}
