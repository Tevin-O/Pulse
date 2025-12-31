"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin } from "lucide-react";

const HOTSPOTS = [
    { id: 1, name: "Nairobi CBD", x: 50, y: 60, intensity: "critical", grievance: "Finance Bill Protests" },
    { id: 2, name: "Githurai", x: 55, y: 50, intensity: "critical", grievance: "Police Brutality" },
    { id: 3, name: "Kisumu", x: 20, y: 55, intensity: "warning", grievance: "Cost of Living" },
    { id: 4, name: "Mombasa", x: 80, y: 80, intensity: "warning", grievance: "Port Privatization" },
    { id: 5, name: "Eldoret", x: 30, y: 40, intensity: "critical", grievance: "Farmer Subsidies" },
];

export function Heatmap() {
    return (
        <Card className="col-span-2 row-span-2 border-border bg-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group">
            <CardHeader className="absolute z-10 w-full bg-gradient-to-b from-slate-900/80 to-transparent pb-10">
                <CardTitle className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <span>Live Geospatial Intel</span>
                    <div className="flex items-center space-x-2">
                        <span className="flex items-center text-[10px] text-red-500">
                            <span className="mr-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" /> CRITICAL
                        </span>
                        <span className="flex items-center text-[10px] text-amber-500">
                            <span className="mr-1 h-2 w-2 rounded-full bg-amber-500" /> WARNING
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="h-[calc(100%-4rem)] relative bg-card/20">
                {/* Abstract Map Background - Using CSS gradients to simulate a dark map */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-50" />

                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

                {/* Hotspots */}
                <div className="relative h-full w-full">
                    {HOTSPOTS.map((spot) => (
                        <TooltipProvider key={spot.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        className="absolute cursor-pointer"
                                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        {/* Pulsing Effect */}
                                        <div className={cn(
                                            "absolute -inset-4 rounded-full opacity-30 animate-ping",
                                            spot.intensity === "critical" ? "bg-red-500" : "bg-amber-500"
                                        )} />

                                        {/* Core Dot */}
                                        <div className={cn(
                                            "relative flex items-center justify-center h-4 w-4 rounded-full shadow-[0_0_15px_currentColor]",
                                            spot.intensity === "critical" ? "bg-red-500 text-red-500" : "bg-amber-500 text-amber-500"
                                        )}>
                                            <MapPin className="h-3 w-3 text-white" />
                                        </div>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-card border-border text-foreground p-0 shadow-xl z-50 min-w-[200px]">
                                    <div className="p-3 border-b border-border bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold uppercase tracking-wider text-foreground">{spot.name}</p>
                                            {spot.intensity === "critical" && <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1 rounded">CRITICAL</span>}
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-2">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-xs font-medium text-muted-foreground">
                                                <AlertTriangle className="mr-1 h-3 w-3 text-amber-500" />
                                                Dominant Grievance
                                            </div>
                                            <p className="text-sm font-bold">{spot.grievance}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                                            <div className="text-center">
                                                <div className="text-[10px] text-muted-foreground">Crowd Size</div>
                                                <div className="text-xs font-mono font-bold">~2.5k</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[10px] text-muted-foreground">Police Units</div>
                                                <div className="text-xs font-mono font-bold">4 Platoons</div>
                                            </div>
                                        </div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
