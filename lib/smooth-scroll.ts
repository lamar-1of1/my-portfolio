import { easeCurve } from "@/lib/motion";

const desktopScrollOffset = 72;
const mobileScrollOffset = 20;

const getScrollOffset = () =>
    window.matchMedia("(min-width: 768px)").matches
        ? desktopScrollOffset
        : mobileScrollOffset;

const cubicBezierY = (y1: number, y2: number, t: number) => {
    const oneMinusT = 1 - t;
    return (
        3 * oneMinusT * oneMinusT * t * y1 +
        3 * oneMinusT * t * t * y2 +
        t * t * t
    );
};

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function getHashTarget(hash: string) {
    const targetId = decodeURIComponent(hash.replace("#", ""));

    if (!targetId || targetId === "home") {
        return null;
    }

    return document.getElementById(targetId);
}

export function getScrollTopForHash(hash: string) {
    const target = getHashTarget(hash);

    if (!target) {
        return 0;
    }

    return Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - getScrollOffset(),
    );
}

export function animateScrollTo(top: number) {
    if (prefersReducedMotion()) {
        window.scrollTo({ top, behavior: "auto" });
        return;
    }

    const startTop = window.scrollY;
    const distance = top - startTop;

    if (Math.abs(distance) < 2) return;

    const duration = Math.min(1100, Math.max(420, Math.abs(distance) * 0.55));
    const startTime = performance.now();

    const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = cubicBezierY(
            easeCurve[1],
            easeCurve[3],
            progress,
        );

        window.scrollTo(0, startTop + distance * easedProgress);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

export function scrollToHash(hash: string) {
    animateScrollTo(getScrollTopForHash(hash));
}
