"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TREND_DECAY } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export function TrendDecay() {
    return (
        <Card className="col-span-1 h-full border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Trend Decay (Half-Life)
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {TREND_DECAY.map((trend) => (
                    <div key={trend.hashtag} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border shadow-sm">
                        <div>
                            <p className="font-mono text-sm font-bold text-foreground">{trend.hashtag}</p>
                            <div className="flex items-center space-x-2 text-[10px] text-muted-foreground">
                                <span>Half-Life: {trend.halfLife}</span>
                                <span>•</span>
                                <span>{trend.volume}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={cn(
                                "text-xs font-bold uppercase px-2 py-0.5 rounded",
                                trend.status === "rising" && "bg-red-500/10 text-red-500",
                                trend.status === "decaying" && "bg-emerald-500/10 text-emerald-500",
                                trend.status === "stable" && "bg-blue-500/10 text-blue-500"
                            )}>
                                {trend.status}
                            </span>
                            {trend.status === "rising" && <ArrowUpRight className="h-4 w-4 text-red-500" />}
                            {trend.status === "decaying" && <ArrowDownRight className="h-4 w-4 text-emerald-500" />}
                            {trend.status === "stable" && <Minus className="h-4 w-4 text-blue-500" />}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
