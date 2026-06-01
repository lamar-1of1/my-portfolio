import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionTitleProps {
    eyebrow?: string;
    section?: string;
    title?: string;
    icon?: ReactNode;
    className?: string;
    labelClassName?: string;
    titleClassName?: string;
    showDot?: boolean;
    headingLevel?: 1 | 2;
}

export function SectionTitle({
    eyebrow,
    section,
    title,
    icon,
    className,
    labelClassName,
    titleClassName,
    showDot = false,
    headingLevel = 2,
}: SectionTitleProps) {
    const Heading = headingLevel === 1 ? "h1" : "h2";

    return (
        <div className={cn("mb-10", className)}>
            {eyebrow || section || icon || showDot ? (
                <div
                    className={cn(
                        "mb-6 inline-flex w-full items-center gap-4 border-b border-t border-dashed border-[#262626]/70 bg-[#343434]/15 px-4 py-10 text-sm font-semibold tracking-tight text-white/70 backdrop-blur-sm md:px-18 md:py-6",
                        labelClassName
                    )}
                >
                    {/* {showDot ? (
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                    ) : null} */}
                    {icon}
                    {eyebrow || section ? (
                        <span className="inline-grid h-18 w-18 shrink-0 place-items-center rounded-2xl border border-dashed border-[#343434]/90 bg-transparent md:h-16 md:w-16">
                            {eyebrow ? (
                                <span className="block w-full text-center font-heterodox-mono text-3xl font-bold leading-none tracking-normal text-white/50 md:text-4xl">
                                    {eyebrow}
                                </span>
                            ) : null}
                            {/* {section ? (
                                <span
                                    className={cn(
                                        eyebrow
                                            ? "font-section-heading text-3xl font-semibold upper/case leading-none tracking-normal text-white/45 md:text-4xl"
                                            : "font-section-heading font-semibold tracking-[0.08em] text-white/60",
                                    )}
                                >
                                    {section}
                                </span>
                            ) : null} */}
                        </span>
                    ) : null}
                </div>
            ) : null}
            {title ? (
                <Heading
                    className={cn(
                        "max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl",
                        titleClassName
                    )}
                >
                    {title}
                </Heading>
            ) : null}
        </div>
    );
}
