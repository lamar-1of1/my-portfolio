import AccordionIndexed from "@/components/features/about/AccordionIndexed";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { contentContainer } from "@/components/shared/contentContainer";
import { cn } from "@/lib/utils";

export function WorkHistorySection() {
    return (
        <section className={cn(contentContainer, "pt-0 pb-20")}>
            <SectionTitle
                eyebrow="#02"
                title="Work History"
                className="mb-4"
            />
            <AccordionIndexed />
        </section>
    );
}
