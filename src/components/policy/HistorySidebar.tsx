
import { Session } from "@/lib/session-manager";
import { cn } from "@/lib/utils";
import { Clock, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface HistorySidebarProps {
    sessions: Session[];
    currentSessionId: string;
    onSelectSession: (id: string) => void;
}

export function HistorySidebar({ sessions, currentSessionId, onSelectSession }: HistorySidebarProps) {
    return (
        <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-full">
            <div className="p-4 border-b border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    Mission History
                </h3>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => onSelectSession(session.id)}
                            className={cn(
                                "w-full text-left p-3 rounded-lg text-xs transition-colors border",
                                session.id === currentSessionId
                                    ? "bg-slate-800 text-emerald-400 border-emerald-500/20"
                                    : "bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
                            )}
                        >
                            <div className="font-medium truncate mb-1">{session.title}</div>
                            <div className="flex items-center text-[10px] text-slate-600">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {formatDistanceToNow(session.timestamp, { addSuffix: true })}
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
