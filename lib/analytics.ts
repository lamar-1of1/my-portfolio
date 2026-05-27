type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        gtag?: (
            command: "event",
            eventName: string,
            payload?: EventPayload
        ) => void;
    }
}

export function trackEvent(eventName: string, payload: EventPayload = {}) {
    if (typeof window === "undefined") {
        return;
    }

    if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload);
        return;
    }

    if (process.env.NODE_ENV !== "production") {
        console.info("[analytics]", eventName, payload);
    }
}
