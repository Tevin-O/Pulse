"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VELOCITY_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function VelocityChart() {
    // Check if any value exceeds threshold for "Burst" visual effect
    const isBursting = VELOCITY_DATA.some(d => d.value > 15); // Mock threshold

    return (
        <Card className={cn(
            "col-span-1 row-span-2 border-border bg-card/50 backdrop-blur-sm transition-all duration-500 shadow-sm",
            isBursting && "shadow-[0_0_30px_rgba(239,68,68,0.15)] border-red-500/30"
        )}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <span>Viral Velocity (Tweets/Min)</span>
                    {isBursting && <span className="text-xs text-red-500 font-mono animate-pulse">BURST DETECTED</span>}
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] w-full">
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={VELOCITY_DATA}>
                            <defs>
                                <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="time"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                interval={4}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #1e293b",
                                    borderRadius: "0.5rem",
                                    color: "#f8fafc",
                                }}
                                itemStyle={{ color: "#ef4444" }}
                                labelStyle={{ color: "#94a3b8", marginBottom: "0.25rem" }}
                            />
                            <ReferenceLine y={15} label="BURST THRESHOLD" stroke="red" strokeDasharray="3 3" />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorVelocity)"
                                isAnimationActive={true}
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
