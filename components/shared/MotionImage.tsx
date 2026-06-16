"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { easeCurve } from "@/lib/motion";

type MotionImageProps = {
    src: string;
    alt: string;
    className?: string;
    skeletonClassName?: string;
};

export function MotionImage({
    src,
    alt,
    className = "",
    skeletonClassName = "",
}: MotionImageProps) {
    const shouldReduceMotion = useReducedMotion();
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const isLoaded = loadedSrc === src;
    const markImageReady = useCallback(() => {
        setLoadedSrc(src);
    }, [src]);
    const handleImageRef = useCallback(
        (node: HTMLImageElement | null) => {
            if (node?.complete && node.naturalWidth > 0 && loadedSrc !== src) {
                setLoadedSrc(src);
            }
        },
        [loadedSrc, src],
    );

    return (
        <>
            <AnimatePresence initial={false}>
                {!isLoaded && (
                    <motion.div
                        key={`${src}-skeleton`}
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        className={`motion-image-skeleton absolute inset-0 bg-zinc-900 ${skeletonClassName}`}
                    />
                )}
            </AnimatePresence>

            <motion.img
                key={src}
                ref={handleImageRef}
                src={src}
                alt={alt}
                onLoad={markImageReady}
                onError={markImageReady}
                className={className}
                initial={
                    shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 1.04, filter: "blur(10px)" }
                }
                animate={
                    shouldReduceMotion
                        ? { opacity: isLoaded ? 1 : 0 }
                        : {
                              opacity: isLoaded ? 1 : 0,
                              scale: 1,
                              filter: "blur(0px)",
                          }
                }
                transition={{
                    duration: shouldReduceMotion ? 0.18 : 0.45,
                    ease: easeCurve,
                }}
            />
        </>
    );
}
