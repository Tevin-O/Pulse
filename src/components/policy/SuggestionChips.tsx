
import { Suggestion } from "@/lib/suggestion-agent";
import { Sparkles } from "lucide-react";

interface SuggestionChipsProps {
    suggestions: Suggestion[];
    onSelect: (prompt: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
    if (suggestions.length === 0) return null;

    return (
        <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-xs text-emerald-500 uppercase tracking-widest font-bold">
                <Sparkles className="h-3 w-3" />
                <span>Intel Suggstions</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => onSelect(s.prompt)}
                        className="text-xs text-left px-3 py-2 rounded border border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-emerald-900/20 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm"
                    >
                        <span className="block font-bold text-[10px] text-slate-500 uppercase mb-0.5">{s.category}</span>
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
