import { cn } from "@/lib/utils";

interface SectionTitleProps {
    eyebrow?: string;
    title: string;
    className?: string;
}

export function SectionTitle({ eyebrow, title, className }: SectionTitleProps) {
    return (
        <div className={cn("mb-10", className)}>
            {eyebrow ? (
                <p className="mb-3 text-sm font-semibold tracking-tight text-emerald-500">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
            </h2>
        </div>
    );
}
