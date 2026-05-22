import AccordionIndexed from "@/components/ruixen/accordion-indexed";
import { cn } from "@/lib/utils";
import { contentContainer } from "@/components/about/layout";

export function WorkHistorySection() {
  return (
    <section className={cn(contentContainer, "py-12")}>
      <div className="text-left">
        <h3 className="mb-4 text-md font-medium text-emerald-500">Work History</h3>
      </div>
      <AccordionIndexed />
    </section>
  );
}
