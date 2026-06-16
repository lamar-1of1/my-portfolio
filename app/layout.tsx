import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Import your footer component here
import { GuideRail } from "@/components/shared/GuideRail"; // Import your guide rail component here
import { SmoothScroll } from "@/components/shared/SmoothScroll";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

const interSans = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Lamar | Portfolio",
    description:
        "Developer and designer crafting focused digital experiences.",
    icons: {
        icon: "/icon.png",
    },
    openGraph: {
        title: "Lamar | Portfolio",
        description:
            "Developer and designer crafting focused digital experiences.",
        type: "website",
        images: [
            {
                url: "/brand-social-preview-Photoroom.png",
                width: 1200,
                height: 630,
                alt: "Lamar portfolio brand mark",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lamar | Portfolio",
        description:
            "Developer and designer crafting focused digital experiences.",
        images: ["/assets/brand-social-preview.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                interSans.variable,
            )}
        >
            <body className="bg-black text-white">
                <SmoothScroll />
                <Navbar />

                <GuideRail side="left" />
                <GuideRail side="right" />
                <main className="relative min-h-screen px-8">
                    {children}
                </main>
                <div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
