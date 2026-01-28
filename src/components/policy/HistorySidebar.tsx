
import { Session } from "@/lib/session-manager";
import { cn } from "@/lib/utils";
import { Clock, MessageSquare, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface HistorySidebarProps {
    sessions: Session[];
    currentSessionId: string;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string) => void;
}

export function HistorySidebar({ sessions, currentSessionId, onSelectSession, onDeleteSession }: HistorySidebarProps) {
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
                        <div
                            key={session.id}
                            className={cn(
                                "group relative w-full text-left p-3 rounded-lg text-xs transition-colors border cursor-pointer",
                                session.id === currentSessionId
                                    ? "bg-slate-800 text-emerald-400 border-emerald-500/20"
                                    : "bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
                            )}
                            onClick={() => onSelectSession(session.id)}
                        >
                            <div className="font-medium truncate mb-1 pr-8">
                                {session.title.length > 28 ? session.title.substring(0, 28) + "..." : session.title}
                            </div>
                            <div className="flex items-center text-[10px] text-slate-600">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {formatDistanceToNow(session.timestamp, { addSuffix: true })}
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteSession(session.id);
                                }}
                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-opacity"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
