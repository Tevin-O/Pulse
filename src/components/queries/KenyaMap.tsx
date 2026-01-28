
"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface NodeData {
    id: string;
    label: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    volume: string;
    agenda: string;
    voices: string[];
}

const NODES: NodeData[] = [
    { id: "nairobi", label: "Nairobi", x: 45, y: 60, volume: "12.5k/hr", agenda: "#Maandamano", voices: ["@ActivistKE", "@GenZ_Sentinel"] },
    { id: "mombasa", label: "Mombasa", x: 80, y: 80, volume: "4.2k/hr", agenda: "#PwaniSiKenya", voices: ["@MombasaWatcher"] },
    { id: "kisumu", label: "Kisumu", x: 20, y: 55, volume: "3.8k/hr", agenda: "#RejectFinanceBill", voices: ["@KisumuPundit"] },
    { id: "nakuru", label: "Nakuru", x: 35, y: 50, volume: "2.1k/hr", agenda: "#PeacefulProtest", voices: ["@Nakuru_News"] },
    { id: "eldoret", label: "Eldoret", x: 30, y: 40, volume: "1.9k/hr", agenda: "#RutoMustGo", voices: ["@Eldoret_Online"] },
    { id: "garissa", label: "Garissa", x: 75, y: 45, volume: "800/hr", agenda: "#IDVetting", voices: ["@Garissa_Youth"] },
    { id: "kajiado", label: "Kajiado", x: 45, y: 70, volume: "1.1k/hr", agenda: "#LandRates", voices: ["@Kajiado_Observer"] },
    { id: "lamu", label: "Lamu", x: 90, y: 70, volume: "500/hr", agenda: "#LamuPort", voices: ["@Lamu_Chronicles"] },
];

export function KenyaMap() {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    return (
        <div className="relative w-full h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Geospatial Heatmap
                </h3>
            </div>

            <div className="flex-1 relative p-8 flex items-center justify-center">
                {/* Abstract Kenya Shape Placeholder - Using a generic container for now as accurate SVG path is complex without file */}
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-80">
                    {/* Simplified border visual (Not accurate Kenya map but aesthetic container) */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <path
                            d="M20,50 Q30,20 50,15 T80,30 T95,60 T80,90 T40,95 T10,70 Z"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="0.5"
                        />
                        {/* Grid lines */}
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.1" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />
                    </svg>

                    {/* Nodes */}
                    {NODES.map((node) => (
                        <TooltipProvider key={node.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setSelectedNode(node)}
                                        className="absolute group transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                    >
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping group-hover:opacity-40" />
                                        <div className={cn(
                                            "relative inline-flex rounded-full h-3 w-3 border transition-colors",
                                            selectedNode?.id === node.id
                                                ? "bg-emerald-500 border-white shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                                                : "bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:bg-emerald-400"
                                        )} />
                                        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {node.label}
                                        </span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-slate-200 text-xs">
                                    <p className="font-bold">{node.label}</p>
                                    <p className="text-[10px] text-emerald-400">{node.volume}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>

            {/* Region Card Overlay */}
            {selectedNode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 right-4 w-64 bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md p-4 rounded-lg shadow-2xl z-20"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-white uppercase">{selectedNode.label} Node</h4>
                        <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-white">
                            &times;
                        </button>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span className="text-slate-400">Volume</span>
                            <span className="text-emerald-400 font-mono">{selectedNode.volume}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span className="text-slate-400">Primary Agenda</span>
                            <span className="text-amber-400 font-mono">{selectedNode.agenda}</span>
                        </div>
                        <div>
                            <span className="text-slate-400 block mb-1">Active Voices</span>
                            <div className="flex flex-wrap gap-1">
                                {selectedNode.voices.map(v => (
                                    <span key={v} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
