"use client";

import { cn } from "@/lib/utils";
import { Activity, BarChart3, Globe, Moon, ShieldAlert, Sun, Users, ZapOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useZenMode } from "@/components/providers/ZenModeContext";

const NAV_ITEMS = [
    { label: "The Sentinel", href: "/", icon: ShieldAlert },
    { label: "War Room", href: "/war-room", icon: Users },
    { label: "Policy Sim", href: "/policy-sim", icon: Activity },
    { label: "Intel Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { isZenMode, toggleZenMode } = useZenMode();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/80 backdrop-blur-md transition-transform">
            <div className="flex h-16 items-center border-b border-slate-800 px-6 shrink-0">
                <Globe className={cn("mr-2 h-6 w-6 text-emerald-500", !isZenMode && "animate-pulse")} />
                <span className="text-xl font-bold tracking-tighter text-foreground">
                    PULSE<span className="text-red-500">KE</span>
                </span>
            </div>

            <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-red-500/10 text-red-500"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("mr-3 h-5 w-5", isActive && !isZenMode && "animate-pulse")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs text-slate-500 font-medium">ZEN MODE</span>
                    <button
                        onClick={toggleZenMode}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            isZenMode ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-800 text-slate-400 hover:text-slate-200"
                        )}
                    >
                        <ZapOff className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs text-slate-500 font-medium">THEME</span>
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="p-4 shrink-0">
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>System Status</span>
                        <span className="flex items-center text-emerald-500">
                            <span className={cn("mr-1.5 h-2 w-2 rounded-full bg-emerald-500", !isZenMode && "animate-ping")} />
                            ONLINE
                        </span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-[85%] bg-emerald-500" />
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 font-mono">Uptime: 99.9%</p>
                </div>
            </div>
        </aside>
    );
}
