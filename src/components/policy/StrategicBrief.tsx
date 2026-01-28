
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface StrategicBriefProps {
    markdown: string;
}

export function StrategicBrief({ markdown }: StrategicBriefProps) {
    return (
        <ScrollArea className="h-full w-full pr-4">
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-emerald-400 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-slate-100">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </ScrollArea>
    );
}
