import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Import your footer component here
import { GuideRail } from "@/components/shared/GuideRail"; // Import your guide rail component here

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

// const inter = Inter({
//     subsets: ["latin"],
//     variable: "--font-inter",
// });

export const metadata: Metadata = {
    title: "Lamar | Portfolio",
    description:
        "Developer and designer crafting focused digital experiences.",
    icons: {
        icon: "/icon-white.svg",
    },
    openGraph: {
        title: "Lamar | Portfolio",
        description:
            "Developer and designer crafting focused digital experiences.",
        type: "website",
        images: [
            {
                url: "/assets/brand-social-preview.jpg",
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
                // inter.variable
            )}
        >
            <body className="bg-black text-white">
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
