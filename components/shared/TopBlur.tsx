"use client"

interface TopBlurProps {
    position?: "top" | "bottom"
    height?: number
    offset?: number
    className?: string
}

export function Blur({
    position = "bottom",
    height = 75,
    offset = 0,
    className = "",
}: TopBlurProps) {
    const blurLayers = [1, 2, 3, 6, 12]

    const isTop = position === "top"
    const positionStyle = isTop ? { top: offset } : { bottom: offset }

    return (
        <div
            className={`pointer-events-none fixed inset-x-0 isolate z-[49] ${className}`}
            style={{ height, ...positionStyle }}
        >
            {blurLayers.map((blur) => (
                <div
                    key={blur}
                    className="absolute inset-0"
                    style={{
                        backdropFilter: `blur(${blur}px)`,
                        WebkitBackdropFilter: `blur(${blur}px)`,
                        maskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`,
                        WebkitMaskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`,
                    }}
                />
            ))}
        </div>
    )
}

// Convenience exports for specific positions
export function TopBlur({
    height = 75,
    offset = 0,
    className,
}: {
    height?: number
    offset?: number
    className?: string
}) {
    return <Blur position="top" height={height} offset={offset} className={className} />
}

export function BottomBlur({
    height = 75,
    offset = 0,
    className,
}: {
    height?: number
    offset?: number
    className?: string
}) {
    return <Blur position="bottom" height={height} offset={offset} className={className} />
}
