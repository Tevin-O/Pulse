
"use client";

import { QueryParams } from "./QueryBuilder";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface ThematicSummaryProps {
    query: QueryParams;
    resultCount: number;
}

export function ThematicSummary({ query, resultCount }: ThematicSummaryProps) {
    if (query.filters.length === 0) {
        return (
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 h-full flex items-center justify-center text-slate-500 font-mono text-sm">
                AWAITING INTELLIGENCE VECTORS...
            </div>
        );
    }

    // Mock logic to generate dynamic text
    const isHighVolume = resultCount > 300;
    const impactColor = isHighVolume ? "text-red-400" : "text-amber-400";

    const primaryFilter = query.filters[0];
    const label = `${primaryFilter.type.toUpperCase()}: ${primaryFilter.value}`;

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col justify-center h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <TrendingUp className="h-24 w-24" />
            </div>

            <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className={`h-4 w-4 ${impactColor}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${impactColor}`}>
                    {isHighVolume ? "Critical Impact" : "Developing Narrative"}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-tight mb-2 truncate">
                {label} {query.filters.length > 1 ? `+ ${query.filters.length - 1} filters` : ""}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed">
                Analysis suggests a
                <span className="text-emerald-400 font-bold mx-1">{(resultCount / 10).toFixed(1)}%</span>
                variability in engagement across identified nodes.
                {isHighVolume
                    ? " High-velocity signal detected in core urban clusters."
                    : " Signal remains within baseline parameters."}
            </p>
        </div>
    );
}
