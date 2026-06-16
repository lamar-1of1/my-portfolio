import type { Variants } from "framer-motion";

export const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const contentStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.08,
        },
    },
};

export const reducedContentStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

export const fadeOnly: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
};

export const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: easeCurve,
        },
    },
};

export const slideUp = (direction: number): Variants => ({
    hidden: {
        opacity: 0,
        y: 14 * (direction >= 0 ? 1 : -1),
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: easeCurve,
        },
    },
});
