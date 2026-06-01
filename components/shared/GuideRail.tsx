import ScalesBackground from "@/components/visual/ScalesBackground";

interface GuideRailProps {
    side: "left" | "right";
}

export function GuideRail({ side }: GuideRailProps) {
    return (
        <aside
            aria-hidden="true"
            className={`pointer-events-none fixed inset-y-0 z-40 h-dvh w-5 overflow-hidden ${side === "left"
                ? "left-0 border-r border-dashed border-white/15"
                : "right-0 border-l border-dashed border-white/15"
                }`}
        >
            <div className="absolute inset-0 h-full w-full">
                <ScalesBackground />
            </div>
        </aside>
    );
}
