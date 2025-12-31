"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { INFLUENCER_LINKS, INFLUENCER_NODES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Info, Users } from "lucide-react";
import { useState } from "react";

export function InfluencerGraph() {
    const [showBots, setShowBots] = useState(true);

    // Simple force-directed graph simulation (static for now, but animated entry)
    // In a real app, use d3-force or react-force-graph

    // Calculate positions (mock layout)
    const getNodePosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI;
        const radius = 150; // Distance from center
        return {
            x: Math.cos(angle) * radius + 250, // Center X
            y: Math.sin(angle) * radius + 200, // Center Y
        };
    };

    const visibleNodes = showBots ? INFLUENCER_NODES : INFLUENCER_NODES.filter(n => !n.isBot);
    const visibleLinks = showBots
        ? INFLUENCER_LINKS
        : INFLUENCER_LINKS.filter(l => {
            const sourceNode = INFLUENCER_NODES.find(n => n.id === l.source);
            const targetNode = INFLUENCER_NODES.find(n => n.id === l.target);
            return sourceNode && !sourceNode.isBot && targetNode && !targetNode.isBot;
        });

    return (
        <Card className="col-span-2 h-full border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Influencer Network Graph
                </CardTitle>
                <button
                    onClick={() => setShowBots(!showBots)}
                    className={cn(
                        "flex items-center space-x-2 rounded px-3 py-1 text-xs font-bold transition-colors border",
                        showBots
                            ? "bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/20"
                    )}
                >
                    {showBots ? <Bot className="h-4 w-4 mr-1" /> : <Users className="h-4 w-4 mr-1" />}
                    {showBots ? "HIDE BOT FARMS" : "SHOW BOT FARMS"}
                </button>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] relative overflow-hidden">
                <svg className="h-full w-full">
                    {/* Links */}
                    {visibleLinks.map((link, i) => {
                        const sourceIndex = INFLUENCER_NODES.findIndex(n => n.id === link.source);
                        const targetIndex = INFLUENCER_NODES.findIndex(n => n.id === link.target);
                        const sourcePos = getNodePosition(sourceIndex, INFLUENCER_NODES.length);
                        const targetPos = getNodePosition(targetIndex, INFLUENCER_NODES.length);

                        return (
                            <motion.line
                                key={`${link.source}-${link.target}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.2 }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                x1={sourcePos.x}
                                y1={sourcePos.y}
                                x2={targetPos.x}
                                y2={targetPos.y}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-muted-foreground/50"
                            />
                        );
                    })}

                    {/* Nodes */}
                    {visibleNodes.map((node, i) => {
                        const index = INFLUENCER_NODES.findIndex(n => n.id === node.id);
                        const pos = getNodePosition(index, INFLUENCER_NODES.length);

                        return (
                            <TooltipProvider key={node.id}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <motion.g
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.05 }}
                                        >
                                            <circle
                                                cx={pos.x}
                                                cy={pos.y}
                                                r={node.size}
                                                className={cn(
                                                    "cursor-pointer transition-all duration-300 hover:opacity-80",
                                                    node.isBot ? "fill-red-500/50 stroke-red-500" : "fill-emerald-500/50 stroke-emerald-500"
                                                )}
                                                strokeWidth="2"
                                            />
                                            <text
                                                x={pos.x}
                                                y={pos.y + node.size + 15}
                                                textAnchor="middle"
                                                className="fill-muted-foreground text-[10px] font-mono uppercase pointer-events-none"
                                            >
                                                {node.label}
                                            </text>
                                        </motion.g>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-popover border-border text-popover-foreground p-3 shadow-xl z-50">
                                        <div className="space-y-2 min-w-[150px]">
                                            <div className="flex items-center justify-between border-b border-border pb-1">
                                                <span className="font-bold text-sm">{node.label}</span>
                                                {node.isBot && <Bot className="h-3 w-3 text-red-500" />}
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Cluster:</span>
                                                    <span className="font-medium">{node.cluster}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Reach:</span>
                                                    <span className="font-medium">{(node.size * 12.5).toFixed(1)}k</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Status:</span>
                                                    <span className={cn("font-medium", node.isBot ? "text-red-500" : "text-emerald-500")}>
                                                        {node.isBot ? "SUSPICIOUS" : "VERIFIED"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Top Narrative:</span>
                                                    <span className="font-medium truncate max-w-[80px]">{node.isBot ? "#RejectBill" : "#Justice"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Last Active:</span>
                                                    <span className="font-medium">2m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 space-y-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" /> Organic Influencer
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-red-500" /> Bot / Astroturf
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
