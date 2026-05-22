import { AboutMe } from "@/components/about/AboutMe";
import { TechStackSection } from "@/components/about/TechStackSection";
import { WorkHistorySection } from "@/components/about/WorkHistorySection";

export function AboutSections() {
  return (
    <>
      <AboutMe />
      <TechStackSection />
      <WorkHistorySection />
    </>
  );
}
