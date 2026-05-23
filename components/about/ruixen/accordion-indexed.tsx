"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { workExperience } from "@/components/workData";

export interface AccordionIndexedItem {
    id: string;
    title: string;
    content: string;
}

export interface AccordionIndexedProps {
    items?: AccordionIndexedItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
    className?: string;
}

const defaultItems: AccordionIndexedItem[] = [
    {
        id: "strategy",
        title: "Strategy",
        content:
            "",
    },
    {
        id: "design",
        title: "Design",
        content:
            "",
    },
    {
        id: "engineering",
        title: "Engineering",
        content:
            "",
    },
];

const previewColumns = [
    { left: 12, width: 19, height: 206, opacity: 0.95 },
    { left: 35, width: 14, height: 178, opacity: 0.82 },
    { left: 54, width: 11, height: 152, opacity: 0.7 },
    { left: 70, width: 9, height: 128, opacity: 0.58 },
    { left: 83, width: 8, height: 106, opacity: 0.48 },
    { left: 94, width: 7, height: 86, opacity: 0.38 },
    { left: 104, width: 6, height: 68, opacity: 0.3 },
    { left: 113, width: 5, height: 52, opacity: 0.24 },
];

function WorkPreviewImage() {
    return (
        <div className="relative hidden h-[244px] w-[178px] overflow-hidden rounded-lg border border-white/10 bg-black md:block">
            {/* <div
                className="absolute bottom-6 left-0 h-10 w-[158px] bg-zinc-200/95"
                style={{
                    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                }}
            /> */}
            {previewColumns.map((column) => (
                <div
                    key={column.left}
                    className="absolute bottom-6 bg-zinc-100"
                    style={{
                        left: column.left,
                        width: column.width,
                        height: column.height,
                        opacity: column.opacity,
                        clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0 100%)",
                    }}
                />
            ))}
            <div className="absolute bottom-[24px] left-0 h-px w-[160px] bg-zinc-300/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/75" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.82)),radial-gradient(circle_at_70%_74%,rgba(255,255,255,0.35)_0_1px,transparent_2px)] opacity-90" />
        </div>
    );
}

function FillerWorkContent({ description }: { description: string }) {
    return (
        <div className="grid gap-8 pb-8 md:grid-cols-[178px_minmax(0,1fr)]">
            <WorkPreviewImage />

            <div className="min-w-0 overflow-hidden">
                <p className="mb-4 max-w-2xl text-sm leading-6 text-zinc-500 md:hidden">
                    {description}
                </p>
                {workExperience.slice(0, 3).map((entry, index) => (
                    <div
                        key={`${entry.company}-${index}`}
                    // className="border-b border-white/[0.07] py-5 first:pt-0 last:pb-0"
                    >
                        {index === 0 ? (
                            <span className="mb-3 inline-flex rounded-full border bo/rder-[#b5b5b5]/60 bg-white px-3 py-1.5 text-sm font-medium leading-none text-black">
                                Current
                            </span>
                        ) : null}


                        <div className="bg-re/d-500 grid gap-4 py-1 md:grid-cols-[minmax(280px,0.15fr)_minmax(0,1fr)] md:items-start md:gap-8">
                            <div className="min-w-0">
                                {/* <span className="text-sm font-medium leading-6 text-zinc-400">
                                    {entry.startDate} - {entry.endDate}
                                </span> */}

                                <div className="flex items-center gap-3">
                                    {/* <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
                                        {entry.companyInitial}
                                    </span> */}

                                    <div className="m/in-w-0">
                                        <p className="text-wr/ap text-base font-medium leading-tight text-white">
                                            {entry.role}
                                        </p>
                                        <p className="mt-1 trunc/ate text-sm leading-none text-zinc-500">
                                            {entry.company}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium leading-6 text-zinc-300">
                                    {entry.location}
                                </p>

                                <p className="mt-2 text-sm leading-5 text-zinc-500">
                                    {entry.description}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {entry.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11px] font-medium leading-none text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AccordionIndexed({
    items = defaultItems,
    defaultValue = "",
    value,
    onValueChange,
    collapsible = true,
    className,
}: AccordionIndexedProps) {
    return (
        <div className={cn("mx-au/to w-full max-w-[920px]", className)}>
            <Accordion
                type="single"
                defaultValue={value ? undefined : defaultValue}
                value={value}
                onValueChange={onValueChange}
                collapsible={collapsible}
            >
                {items.map((item, index) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="group/item border-white/[0.055] last:border-b"
                    >
                        <AccordionTrigger className="cursor-pointer py-6 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden">
                            <div className="flex items-baseline gap-4">
                                <span className="shrink-0 font-mono text-[22px] font-medium tabular-nums text-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]/item:text-zinc-400">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-lg font-normal text-zinc-700 transition-all duration-300 ease-out group-hover/item:text-zinc-500 group-data-[state=open]/item:text-zinc-50">
                                    {item.title}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="h-auto pb-0">
                            <FillerWorkContent description={item.content} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
