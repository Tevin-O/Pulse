
"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCountyStats, getTopLocations, Tweet } from "@/lib/mock-queries";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Radio, Users, Zap, Network, Share2, MapPin } from "lucide-react";

interface GeoIntMapProps {
    tweets: Tweet[];
}

export function GeoIntMap({ tweets }: GeoIntMapProps) {
    const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
    const [nodes, setNodes] = useState<any[]>([]);

    useEffect(() => {
        // Dynamic Node Generation
        let activeNodes = getTopLocations(tweets, 6); // Limit to top 6 for cleaner layout

        // Ensure we have at least some nodes for demo if filtered to zero
        if (activeNodes.length === 0) {
            // Fallback handled by page logic usually, but here just render nothing or placeholder
        }

        // Layout: Star Topology
        // Center Node (Most Active) + satellites
        const total = activeNodes.length;
        const mapped = activeNodes.map((node, i) => {
            if (!node) return null;
            const isCenter = i === 0;

            // Satellites in a regular pentagon/network shape
            const angle = ((i - 1) / (total - 1)) * 2 * Math.PI - (Math.PI / 2);
            const radius = 35; // % coordinates

            const x = isCenter ? 50 : 50 + (Math.cos(angle) * 35);
            const y = isCenter ? 50 : 50 + (Math.sin(angle) * 35);

            return { ...node, x, y, isCenter };
        }).filter(Boolean);

        setNodes(mapped);
    }, [tweets]);

    return (
        <div className="relative w-full h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest flex items-center shadow-black drop-shadow-md">
                    <Activity className="h-4 w-4 mr-2 animate-pulse" />
                    Narrative Topology
                </h3>
            </div>

            <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[600px] max-h-[600px] p-8">
                    {/* Background Net */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#334155" strokeWidth="0.1" strokeDasharray="2 2" opacity="0.5" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#334155" strokeWidth="0.1" strokeOpacity="0.3" />

                    {/* Dynamic Connections */}
                    {nodes.map((node, i) => {
                        if (node.isCenter) return null;
                        const center = nodes[0];
                        if (!center) return null;

                        return (
                            <motion.line
                                key={`conn-${i}`}
                                x1={center.x} y1={center.y}
                                x2={node.x} y2={node.y}
                                stroke="#10b981"
                                strokeWidth="0.4"
                                strokeOpacity="0.3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => {
                        const stats = getCountyStats(node.id, tweets);
                        const isSelected = selectedCounty === node.id;
                        const size = node.isCenter ? 45 : 30; // HUGE Nodes for visibility

                        return (
                            <foreignObject
                                key={node.id}
                                x={node.x - (size / 2)}
                                y={node.y - (size / 2)}
                                width={size}
                                height={size}
                                className="overflow-visible"
                            >
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-full h-full flex items-center justify-center relative cursor-pointer group"
                                                onMouseEnter={() => setSelectedCounty(node.id)}
                                                onClick={() => setSelectedCounty(node.id)}
                                            >
                                                {/* Pulse Effect */}
                                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping duration-[2000ms]" />

                                                {/* Core Node */}
                                                <div className={cn(
                                                    "rounded-full border flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                                                    isSelected
                                                        ? "bg-slate-900 border-white w-full h-full z-20 scale-110"
                                                        : "bg-slate-900 border-emerald-500 w-[95%] h-[95%] group-hover:scale-105"
                                                )}>
                                                    {node.isCenter ? (
                                                        <Network className={cn("h-10 w-10", isSelected ? "text-white" : "text-emerald-500")} />
                                                    ) : (
                                                        <MapPin className={cn("h-6 w-6", isSelected ? "text-white" : "text-emerald-500/70")} />
                                                    )}
                                                </div>

                                                {/* Bold Label - Only Show on Hover */}
                                                <div className="absolute -bottom-8 bg-slate-950/80 px-3 py-1.5 rounded text-[10px] font-bold text-slate-200 border border-slate-800 whitespace-nowrap pointer-events-none uppercase tracking-wider backdrop-blur-sm shadow-xl z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    {node.label}
                                                </div>
                                            </motion.div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-slate-950 border-emerald-500/30 text-emerald-400 z-[60]">
                                            <div className="text-sm font-bold">{node.label}</div>
                                            <div className="text-xs text-slate-400">{stats.volume} Volume</div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </foreignObject>
                        );
                    })}
                </svg>
            </div>

            {/* Bottom Info Bar (Detailed Intelligence) */}
            <div className="border-t border-slate-900 bg-slate-950/80 p-4 backdrop-blur-md min-h-[100px] flex items-center">
                {selectedCounty ? (
                    (() => {
                        const node = nodes.find(n => n.id === selectedCounty);
                        const stats = getCountyStats(selectedCounty, tweets);
                        if (!node) return null;

                        return (
                            <div className="w-full grid grid-cols-4 gap-4 animate-in slide-in-from-bottom-2 fade-in">
                                {/* Col 1: Identity */}
                                <div className="flex flex-col justify-center border-r border-slate-800 pr-4">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Target Zone</span>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                                        <span className="text-lg font-bold text-white uppercase truncate">{node.label}</span>
                                    </div>
                                </div>

                                {/* Col 2: Core Metrics */}
                                <div className="flex flex-col space-y-2 border-r border-slate-800 pr-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-500">REACH</span>
                                        <span className="text-xs font-mono text-emerald-400">{stats.volume}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-500">VELOCITY</span>
                                        <div className="flex items-center space-x-1">
                                            <Activity className="h-3 w-3 text-amber-500" />
                                            <span className="text-xs font-mono text-amber-400">{stats.velocity}/100</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 3: Operational Data */}
                                <div className="flex flex-col space-y-2 border-r border-slate-800 pr-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-500">SENTIMENT</span>
                                        <span className={cn(
                                            "text-xs font-bold px-1.5 py-0.5 rounded",
                                            stats.sentiment === "Critical" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
                                        )}>
                                            {stats.sentiment.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-500">BOTS</span>
                                        <span className="text-xs font-mono text-slate-300">{stats.botRatio.toFixed(0)}%</span>
                                    </div>
                                </div>

                                {/* Col 4: Active Agents */}
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Active Agents</span>
                                    <div className="flex flex-col space-y-1">
                                        {stats.activeVoices.slice(0, 2).map(voice => (
                                            <div key={voice} className="flex items-center space-x-1 text-[10px] text-slate-300">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                                                <span className="truncate">{voice}</span>
                                            </div>
                                        ))}
                                        {stats.activeVoices.length > 2 && (
                                            <span className="text-[9px] text-slate-600 pl-2.5">+{stats.activeVoices.length - 2} others</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                ) : (
                    <div className="w-full flex items-center justify-center space-x-3 opacity-40">
                        <Activity className="h-8 w-8 text-slate-500 animate-pulse" />
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Awaiting Selection</span>
                            <span className="text-[10px] text-slate-600">Hover over a node to analyze signal intelligence</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
