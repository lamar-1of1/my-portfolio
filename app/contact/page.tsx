import { Mail } from "lucide-react";

import Footer from "@/components/layout/Footer";
import { GuideRail } from "@/components/shared/GuideRail";
import { SectionTitle } from "@/components/shared/SectionTitle";

const contactLinks = [
    {
        label: "Email",
        value: "hello@lamar.dev",
        href: "mailto:hello@lamar.dev",
    },
    {
        label: "Location",
        value: "Bridgetown, Barbados",
        href: null,
    },
];

export default function Page() {
    return (
        <main className="relative min-h-screen bg-black font-sans text-white">
            <GuideRail side="left" />
            <GuideRail side="right" />

            <section className="mx-5 min-h-screen px-4 pb-20 pt-28 md:px-20">
                <div className="max-w-4xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#262626]/60 bg-[#343434]/20 px-4 py-2.5 text-sm/tight font-medium tracking-normal text-white/70 shadow-inner backdrop-blur-md">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Contact
                    </div>

                    <SectionTitle
                        title="Let’s talk about the next build."
                        className="mb-6"
                    />

                    <p className="max-w-2xl text-base leading-8 text-zinc-400">
                        Send a note about the product, site, or interface you want
                        to create. I usually respond with a few useful next steps.
                    </p>

                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {contactLinks.map((item) => {
                            const content = (
                                <div className="rounded-2xl border border-[#262626]/70 bg-[#343434]/20 p-5 transition-colors hover:bg-[#343434]/30">
                                    <p className="text-sm font-medium text-zinc-500">
                                        {item.label}
                                    </p>
                                    <p className="mt-3 text-lg font-semibold text-white">
                                        {item.value}
                                    </p>
                                </div>
                            );

                            return item.href ? (
                                <a key={item.label} href={item.href}>
                                    {content}
                                </a>
                            ) : (
                                <div key={item.label}>{content}</div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="mx-5 border-t border-white/10 bg-black py-18 md:py-0">
                <Footer />
            </div>
        </main>
    );
}
