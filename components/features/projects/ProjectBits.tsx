import { ArrowUpRight } from "lucide-react";

interface PillButtonProps {
    label: string;
    variant?: "solid" | "ghost";
    className?: string;
    onClick?: () => void;
}

export function PillButton({
    label,
    variant = "solid",
    className = "",
    onClick,
}: PillButtonProps) {
    const isSolid = variant === "solid";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group/pill inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isSolid
                ? "bg-white text-[#0a0a0a] hover:bg-zinc-200"
                : "border border-white/15 bg-transparent text-white hover:bg-white/[0.06]"
                } ${className}`}
        >
            <span className="py-1">{label}</span>
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:rotate-12 ${isSolid ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a]"
                    }`}
            >
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
        </button>
    );
}

export function StatusPill({ status }: { status: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#262626]/70 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-normal text-black">
            {status}
        </span>
    );
}
