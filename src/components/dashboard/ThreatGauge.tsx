"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ThreatGaugeProps {
    label: string;
    value: number;
    type: "critical" | "warning" | "stable";
    trend: string;
}

export function ThreatGauge({ label, value, type, trend }: ThreatGaugeProps) {
    const isCritical = value > 75;

    // Determine color based on type/value
    const getColor = () => {
        if (value > 75) return "text-red-500 stroke-red-500";
        if (value > 50) return "text-amber-500 stroke-amber-500";
        return "text-emerald-500 stroke-emerald-500";
    };

    const colorClass = getColor();
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <Card className={cn(
            "relative overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-500 shadow-sm",
            isCritical && "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
        )}>
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        {/* Background Circle */}
                        <svg className="h-full w-full -rotate-90 transform">
                            <circle
                                cx="48"
                                cy="48"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-muted-foreground"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="48"
                                cy="48"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeLinecap="round"
                                className={colorClass}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("text-xl font-bold font-mono", colorClass.split(" ")[0])}>
                                {value}%
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className={cn(
                            "text-sm font-bold font-mono",
                            trend.startsWith("+") ? "text-red-500" : "text-emerald-500"
                        )}>
                            {trend}
                        </span>
                        <span className="text-[10px] text-slate-500">vs last hour</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
