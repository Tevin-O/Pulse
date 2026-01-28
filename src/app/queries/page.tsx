
"use client";

import { GeoIntMap } from "@/components/queries/GeoIntMap";
import { QueryBuilder, QueryParams, Filter } from "@/components/queries/QueryBuilder";
import { HistoryItem, QueryHistorySidebar } from "@/components/queries/QueryHistorySidebar";
import { ThematicSummary } from "@/components/queries/ThematicSummary";
import { TweetStream } from "@/components/queries/TweetStream";
import { getMockTweets, Tweet } from "@/lib/mock-queries";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pulse_geoint_history_v2"; // Version bump to clear old format

export default function QueriesPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentTweets, setCurrentTweets] = useState<Tweet[]>([]);
    const [activeQuery, setActiveQuery] = useState<QueryParams>({
        filters: []
    });

    // Initial Load
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try { setHistory(JSON.parse(stored)); } catch (e) { }
        }
        setCurrentTweets(getMockTweets(500)); // Load heavy seed
    }, []);

    const handleSearch = (params: QueryParams) => {
        setActiveQuery(params);

        // Mock Filter Logic
        let allTweets = getMockTweets(500);

        // Multi-filter AND logic
        let filtered = allTweets.filter(t => {
            return params.filters.every(f => {
                const val = f.value.toLowerCase().replace(/^[@#]/, ""); // Normalize input

                if (f.type === "category") return t.category.toLowerCase() === f.value.toLowerCase();

                if (f.type === "user") {
                    return t.username.toLowerCase().includes(val);
                }

                if (f.type === "hashtag") {
                    return t.hashtags.some(h => h.toLowerCase().replace("#", "").includes(val));
                }

                if (f.type === "text") {
                    const textMatch = t.text.toLowerCase().includes(val);
                    const userMatch = t.username.toLowerCase().includes(val);
                    const tagMatch = t.hashtags.some(h => h.toLowerCase().includes(val));
                    const locMatch = t.location.toLowerCase().includes(val);
                    return textMatch || userMatch || tagMatch || locMatch;
                }

                return true;
            });
        });

        // Fallback for visual density if zero results (Demo mode)
        if (filtered.length === 0 && params.filters.length > 0) {
            // Don't fallback too aggressively, show empty state or very broad match?
            // Actually, let's just show top 5 matching ANY filter if AND fails, for demo purposes?
            // No, strict AND is better for "Geointel".
        }

        // If no filters, show all
        if (params.filters.length === 0) filtered = allTweets;

        setCurrentTweets(filtered);

        // Save History (Debounce or only on significant actions? For now save all)
        if (params.filters.length > 0) {
            const newItem: HistoryItem = {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                query: params,
                resultCount: filtered.length
            };
            const newHistory = [newItem, ...history].slice(0, 50); // Limit history
            setHistory(newHistory);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        }
    };

    const handleRestore = (item: HistoryItem) => {
        // Just call handleSearch with saved query
        handleSearch(item.query);
    };

    const handleDelete = (id: string) => {
        const h = history.filter(x => x.id !== id);
        setHistory(h);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden font-sans">
            <QueryHistorySidebar history={history} onSelect={handleRestore} onDelete={handleDelete} />

            <div className="flex-1 flex gap-0 h-full">
                {/* Left Panel: GEOINT Map (50%) */}
                <div className="w-1/2 border-r border-slate-900 p-4">
                    <GeoIntMap tweets={currentTweets} />
                </div>

                {/* Right Panel: Intelligence Feed (50%) */}
                <div className="w-1/2 flex flex-col p-4 gap-4 bg-slate-950/80">
                    {/* Top Row: Builder + Summary */}
                    <div className="flex flex-col gap-4">
                        <QueryBuilder onSearch={handleSearch} />
                        <div className="h-32">
                            <ThematicSummary query={activeQuery} resultCount={currentTweets.length} />
                        </div>
                    </div>

                    {/* Bottom Row: Tweet Stream */}
                    <div className="flex-1 min-h-0 overflow-hidden rounded-lg border border-slate-800">
                        <TweetStream tweets={currentTweets.slice(0, 50)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
