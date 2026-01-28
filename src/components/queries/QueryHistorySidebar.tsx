
"use client";

import { QueryParams } from "@/components/queries/QueryBuilder";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock, Trash2, Search, ArrowRight, Hash, User, Tag, Calendar } from "lucide-react";

export interface HistoryItem {
    id: string;
    timestamp: number;
    query: QueryParams;
    resultCount: number;
}

interface QueryHistorySidebarProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
}

export function QueryHistorySidebar({ history, onSelect, onDelete }: QueryHistorySidebarProps) {
    return (
        <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-full shrink-0">
            <div className="p-4 border-b border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    Query Log
                </h3>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {history.length === 0 && (
                        <div className="p-4 text-center text-xs text-slate-600 italic">
                            No recent queries.
                        </div>
                    )}
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col w-full text-left p-3 rounded-lg text-xs transition-colors border bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div
                                    className="flex-1 cursor-pointer"
                                    onClick={() => onSelect(item)}
                                >
                                    <span className="text-[10px] text-slate-600 block mb-1">
                                        {format(item.timestamp, "HH:mm:ss")} • {item.resultCount} results
                                    </span>

                                    <div className="flex flex-wrap gap-1">
                                        {item.query.filters.slice(0, 3).map((f, i) => (
                                            <span key={i} className="flex items-center bg-slate-800 px-1.5 py-0.5 rounded text-[10px] border border-slate-700">
                                                {f.type === "user" ? <User className="h-2 w-2 mr-1 text-blue-400" /> :
                                                    f.type === "hashtag" ? <Hash className="h-2 w-2 mr-1 text-emerald-400" /> :
                                                        f.type === "time" ? <Calendar className="h-2 w-2 mr-1 text-amber-400" /> :
                                                            <Tag className="h-2 w-2 mr-1 text-slate-400" />}
                                                <span className="truncate max-w-[80px]">{f.value}</span>
                                            </span>
                                        ))}
                                        {item.query.filters.length > 3 && <span className="text-[10px] text-slate-500">+{item.query.filters.length - 3}</span>}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-opacity"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
