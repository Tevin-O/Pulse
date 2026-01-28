
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar, Hash, Search, Tag, User, X } from "lucide-react";
import { useState } from "react";

export interface Filter {
    type: "user" | "hashtag" | "category" | "text" | "time";
    value: string;
}

export interface QueryParams {
    filters: Filter[];
}

interface QueryBuilderProps {
    onSearch: (params: QueryParams) => void;
}

const SUGGESTIONS = [
    { type: "category", value: "Politics" },
    { type: "category", value: "Finance" },
    { type: "hashtag", value: "#RejectFinanceBill" },
    { type: "hashtag", value: "#Maandamano" },
];

export function QueryBuilder({ onSearch }: QueryBuilderProps) {
    const [input, setInput] = useState("");
    const [filters, setFilters] = useState<Filter[]>([]);

    const addFilter = (type: Filter["type"], value: string) => {
        const newFilters = [...filters, { type, value }];
        setFilters(newFilters);
        onSearch({ filters: newFilters });
        setInput("");
    };

    const removeFilter = (index: number) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
        onSearch({ filters: newFilters });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        let type: Filter["type"] = "text";
        if (input.startsWith("@")) type = "user";
        else if (input.startsWith("#")) type = "hashtag";

        addFilter(type, input);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && input === "" && filters.length > 0) {
            removeFilter(filters.length - 1);
        }
    };

    return (
        <div className="w-full space-y-3">
            <div
                className="flex flex-wrap items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg p-2 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-lg backdrop-blur-sm"
            >
                {filters.map((filter, i) => (
                    <span
                        key={i}
                        className={cn(
                            "flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border animate-in fade-in zoom-in-50",
                            filter.type === "user" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                filter.type === "hashtag" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                    filter.type === "time" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                        "bg-slate-800 text-slate-300 border-slate-700"
                        )}
                    >
                        {filter.type === "user" && <User className="h-3 w-3" />}
                        {filter.type === "hashtag" && <Hash className="h-3 w-3" />}
                        {filter.type === "category" && <Tag className="h-3 w-3" />}
                        {filter.type === "time" && <Calendar className="h-3 w-3" />}
                        <span>{filter.value}</span>
                        <button onClick={() => removeFilter(i)} className="ml-1 hover:text-white">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}

                <form onSubmit={handleSubmit} className="flex-1 min-w-[150px]">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={filters.length === 0 ? "Search intelligence... (try @user, #hashtag, or keywords)" : "Add filter..."}
                        className="w-full bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:outline-none py-1"
                    />
                </form>

                <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-500 hover:text-white"
                    onClick={() => handleSubmit({ preventDefault: () => { } } as any)}
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {/* Quick Actions / Suggestions */}
            {filters.length === 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {SUGGESTIONS.map(s => (
                        <button
                            key={s.value}
                            onClick={() => addFilter(s.type as any, s.value)}
                            className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded-full hover:border-emerald-500/50 hover:text-emerald-400 transition-colors whitespace-nowrap"
                        >
                            + {s.value}
                        </button>
                    ))}
                    <div className="w-px h-4 bg-slate-800 self-center mx-1" />
                    {["24h", "7d", "30d"].map(t => (
                        <button
                            key={t}
                            onClick={() => addFilter("time", t)}
                            className="text-[10px] text-slate-500 hover:text-amber-400 transition-colors"
                        >
                            {t}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
