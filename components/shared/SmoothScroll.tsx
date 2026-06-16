"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { scrollToHash } from "@/lib/smooth-scroll";

const isPlainPrimaryClick = (event: MouseEvent) =>
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey;

const getAnchorFromTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null;

    return target.closest<HTMLAnchorElement>("a[href*='#']");
};

export function SmoothScroll() {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const scrollToCurrentHash = () => {
            if (!window.location.hash) return;

            window.requestAnimationFrame(() => {
                scrollToHash(window.location.hash);
            });
        };

        scrollToCurrentHash();

        window.addEventListener("hashchange", scrollToCurrentHash);
        window.addEventListener("popstate", scrollToCurrentHash);

        return () => {
            window.removeEventListener("hashchange", scrollToCurrentHash);
            window.removeEventListener("popstate", scrollToCurrentHash);
        };
    }, [pathname]);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (event.defaultPrevented || !isPlainPrimaryClick(event)) return;

            const anchor = getAnchorFromTarget(event.target);

            if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

            const href = anchor.getAttribute("href");

            if (!href || !href.includes("#")) return;

            const targetUrl = new URL(href, window.location.href);

            if (targetUrl.origin !== window.location.origin || !targetUrl.hash) {
                return;
            }

            event.preventDefault();

            const targetPath = `${targetUrl.pathname}${targetUrl.search}`;
            const currentPath = `${window.location.pathname}${window.location.search}`;

            if (targetPath === currentPath) {
                window.history.pushState(null, "", targetUrl.hash);
                scrollToHash(targetUrl.hash);
                return;
            }

            router.push(`${targetPath}${targetUrl.hash}`, { scroll: false });
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [router]);

    return null;
}
