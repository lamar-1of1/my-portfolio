import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
//Sidebar
import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/MobileNav";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
        >
            <body className="min-h-full">
                <MobileNav />
                <Sidebar />

                <main className="min-h-screen md:p/l-25 p/t-20 md:pt-0">
                    {children}
                </main>
            </body>
        </html >
    );
}
