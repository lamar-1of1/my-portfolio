import { AboutMe } from "@/components/about/AboutMe";
import { WorkHistorySection } from "@/components/about/WorkHistorySection";
import "@/app/globals.css";

export function AboutSections() {
    return (
        <>
            <AboutMe />
            <WorkHistorySection />
        </>
    );
}
