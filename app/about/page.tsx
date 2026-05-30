import { AboutSections } from "@/components/features/about/AboutSections";
import Footer from "@/components/layout/Footer";
import { GuideRail } from "@/components/shared/GuideRail";

export default function Page() {
    return (
        <main className="relative min-h-screen bg-black font-sans text-white">
            <GuideRail side="left" />
            <GuideRail side="right" />

            <div className="ml-5 mr-5 min-h-screen pt-20">
                <AboutSections />
            </div>

            <div className="mx-5 border-t border-white/10 bg-black py-18 md:py-0">
                <Footer />
            </div>
        </main>
    );
}
