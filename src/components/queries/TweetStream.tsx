
"use client";

import { Tweet } from "@/lib/mock-queries";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Repeat, Heart, Shield, BadgeCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TweetStreamProps {
    tweets: Tweet[];
}

export function TweetStream({ tweets }: TweetStreamProps) {
    return (
        <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Live Feed ({tweets.length})
                </h3>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-500">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Realtime</span>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {tweets.map((tweet) => (
                        <div
                            key={tweet.id}
                            className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 hover:bg-slate-900/60 hover:border-slate-700 transition-colors group relative overflow-hidden"
                        >
                            {/* Influence Score Badge */}
                            <div className={cn(
                                "absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider border-b border-l",
                                tweet.influence_score > 80 ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                    tweet.influence_score > 50 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                        "bg-slate-800 text-slate-400 border-slate-700"
                            )}>
                                INF: {tweet.influence_score}
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-lg font-bold text-slate-500">
                                    {tweet.username[1].toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-bold text-slate-200 text-sm truncate">{tweet.username}</span>
                                        {tweet.user_type === "Official" && <BadgeCheck className="h-3 w-3 text-blue-400" />}
                                        {tweet.user_type === "Bot" && <Shield className="h-3 w-3 text-red-500" />}
                                        <span className="text-xs text-slate-500">• {formatDistanceToNow(new Date(tweet.timestamp))} ago</span>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                                        {tweet.text.split(" ").map((word, i) =>
                                            word.startsWith("#") || word.startsWith("@") ?
                                                <span key={i} className="text-emerald-400">{word} </span> :
                                                word + " "
                                        )}
                                    </p>

                                    <div className="flex items-center space-x-6 text-xs text-slate-500">
                                        <div className="flex items-center space-x-1 hover:text-emerald-400">
                                            <MessageSquare className="h-3 w-3" />
                                            <span>{tweet.quotes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 hover:text-emerald-400">
                                            <Repeat className="h-3 w-3" />
                                            <span>{tweet.retweets}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 hover:text-red-400">
                                            <Heart className="h-3 w-3" />
                                            <span>{tweet.likes}</span>
                                        </div>
                                        <div className="ml-auto text-[10px] uppercase font-mono text-slate-600">
                                            {tweet.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
