"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SHENG_WORDS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, Volume2 } from "lucide-react";

export function ShengDecoder() {
    return (
        <Card className="col-span-1 h-full border-border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col">
            <CardHeader className="shrink-0">
                <CardTitle className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <span>Sheng Decoder</span>
                    <Badge variant="outline" className="text-xs text-emerald-500 border-emerald-500/20 bg-emerald-500/10">
                        <Volume2 className="mr-1 h-3 w-3" />
                        LIVE LISTENING
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-6 pb-6">
                    <div className="space-y-4">
                        {SHENG_WORDS.map((word, index) => (
                            <TooltipProvider key={word.text}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={cn(
                                                "group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                                                "hover:bg-accent hover:border-accent-foreground/20",
                                                "bg-card border-border"
                                            )}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    word.sentiment === "critical" && "bg-red-500 animate-pulse",
                                                    word.sentiment === "warning" && "bg-amber-500",
                                                    word.sentiment === "negative" && "bg-orange-400",
                                                    word.sentiment === "neutral" && "bg-slate-400",
                                                )} />
                                                <div>
                                                    <p className="font-bold text-foreground text-sm">{word.text}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                                                        "{word.meaning}"
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <Badge variant="secondary" className="text-[10px] font-mono">
                                                    {word.value}k
                                                </Badge>
                                                <span className="text-[9px] text-emerald-500 flex items-center mt-1">
                                                    <TrendingUp className="h-2 w-2 mr-1" />
                                                    Rising
                                                </span>
                                            </div>
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="max-w-[200px] bg-popover text-popover-foreground border-border p-4 shadow-xl z-[100]">
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-lg border-b border-border pb-1">{word.text}</h4>
                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Meaning</span>
                                                <p className="text-sm">{word.meaning}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Context</span>
                                                <p className="text-xs italic text-muted-foreground">{word.context}</p>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
