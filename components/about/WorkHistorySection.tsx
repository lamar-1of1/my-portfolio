import AccordionIndexed from "@/components/about/ruixen/accordion-indexed";
import { cn } from "@/lib/utils";
import { contentContainer } from "@/components/about/layout";

export function WorkHistorySection() {
    return (
        <section className={cn(contentContainer, "pt-0 pb-20")}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626]/50 bg-[#343434]/15 px-3 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 shadow-inner backdrop-blur-md mb-4">
                Work History
            </div>
            <AccordionIndexed />
        </section>
    );
}
