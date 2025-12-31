import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopTicker } from "@/components/layout/TopTicker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: "PulseKE | National Intelligence Console",
    description: "Situational Awareness Console for NIS",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ZenModeProvider } from "@/components/providers/ZenModeContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.variable, jetbrainsMono.variable, "min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased transition-colors duration-300")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ZenModeProvider>
                        <div className="flex min-h-screen">
                            <Sidebar />
                            <div className="flex-1 pl-64">
                                <TopTicker />
                                <main className="pt-16 min-h-screen">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </ZenModeProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
