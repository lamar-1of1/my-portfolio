import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { FeaturedProjectsSection } from "./FeaturedProjectsSection";
import { HeroSection } from "./HeroSection";

export function HomePage() {
    return (
        <div className="relative overflow-hidden bg-black pt-24 text-white selection:bg-white selection:text-black md:pt-28">
            <HeroSection />
            <AboutSection />
            <FeaturedProjectsSection />
            <ContactSection />
        </div>
    );
}
