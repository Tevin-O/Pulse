"use client";

import { TICKER_ALERTS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useZenMode } from "@/components/providers/ZenModeContext";

export function TopTicker() {
    const { isZenMode } = useZenMode();

    return (
        <div className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center border-b border-border bg-card/80 px-6 backdrop-blur-md overflow-hidden">
            <div className="flex items-center space-x-4 overflow-hidden">
                <span className="flex items-center text-xs font-bold text-red-500">
                    {!isZenMode && (
                        <span className="mr-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                    )}
                    LIVE INTEL
                </span>
                <div className="h-4 w-px bg-border" />
            </div>

            <div className="relative flex flex-1 overflow-hidden mask-linear-fade">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={isZenMode ? { x: 0 } : { x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...TICKER_ALERTS, ...TICKER_ALERTS, ...TICKER_ALERTS].map((alert, i) => (
                        <div key={i} className="mx-8 flex items-center">
                            <span
                                className={cn(
                                    "mr-2 text-xs font-bold uppercase",
                                    alert.type === "critical" && "text-red-500",
                                    alert.type === "warning" && "text-amber-500",
                                    alert.type === "info" && "text-blue-500",
                                    alert.type === "news" && "text-emerald-500"
                                )}
                            >
                                [{alert.type}]
                            </span>
                            <span className="font-mono text-sm text-slate-300">{alert.message}</span>
                            <span className="ml-8 text-slate-700">///</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

