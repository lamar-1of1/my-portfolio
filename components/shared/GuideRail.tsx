import ScalesBackground from "@/components/visual/ScalesBackground";

interface GuideRailProps {
    side: "left" | "right";
}

export function GuideRail({ side }: GuideRailProps) {
    return (
        <aside
            aria-hidden="true"
            className={`fixed top-0 z-0 h-screen w-5 overflow-hidden ${side === "left"
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
