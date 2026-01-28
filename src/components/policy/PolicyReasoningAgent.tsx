
"use client";

import { HistorySidebar } from "@/components/policy/HistorySidebar";
import { StrategicBrief } from "@/components/policy/StrategicBrief";
import { SuggestionChips } from "@/components/policy/SuggestionChips";
import { TelemetryPanel } from "@/components/policy/TelemetryPanel";
import { ThinkingIndicator } from "@/components/policy/ThinkingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IntelligenceData, MOCK_INTELLIGENCE_LIBRARY, ReasoningWorkflow, SimulationResult } from "@/lib/intelligence-engine";
import { Session, SessionManager } from "@/lib/session-manager";
import { Suggestion, SuggestionAgent } from "@/lib/suggestion-agent";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Menu, Plus, Send, Sparkles, Terminal } from "lucide-react"; // Added Menu, Plus
import { useEffect, useRef, useState } from "react";

interface Message {
    role: "user" | "system" | "agent";
    content: string;
}

export function PolicyReasoningAgent() {
    // State
    const [query, setQuery] = useState("");
    const [isReasoning, setIsReasoning] = useState(false);
    const [currentStep, setCurrentStep] = useState<string>("");

    // Session State
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle if needed, or desktop layout

    // Agents
    const sessionManager = useRef(new SessionManager());
    const suggestionAgent = useRef(new SuggestionAgent());
    const workflow = useRef(new ReasoningWorkflow());

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Load
    useEffect(() => {
        // Load history
        const loadedSessions = sessionManager.current.getHistory();
        setSessions(loadedSessions);

        // Start new session if none
        const newSession = sessionManager.current.createSession();
        setCurrentSession(newSession);

        // Save initial state logic could go here
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentSession?.messages]);

    const handleSimulation = async (inputQuery?: string) => {
        const textToProcess = inputQuery || query;
        if (!textToProcess.trim() || !currentSession) return;

        setQuery("");
        setIsReasoning(true);
        setCurrentStep("Retrieve");

        // Update Messages (Optimistic)
        const updatedMessages = [
            ...currentSession.messages,
            { role: "user", content: textToProcess }
        ];

        const partialSession: Session = {
            ...currentSession,
            messages: updatedMessages,
            title: currentSession.title === "New Simulation" ? textToProcess : currentSession.title // Auto-title
        };
        setCurrentSession(partialSession as Session);

        // Visual "Reasoning" sequence
        const steps = ["Retrieve", "Compare", "Simulate", "Advise"];
        for (const step of steps) {
            setCurrentStep(step);
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
        }

        // Run Logic
        const result = await workflow.current.runSimulation(textToProcess);

        // Finalize Session
        const finalMessages = [
            ...updatedMessages,
            { role: "agent", content: "Simulation complete. Strategic Brief generated." }
        ];

        const completedSession: Session = {
            ...partialSession,
            messages: finalMessages as any,
            result: result
        };

        setCurrentSession(completedSession);

        // Persist
        sessionManager.current.saveSession(completedSession);
        setSessions(sessionManager.current.getHistory()); // Refresh list

        setIsReasoning(false);
        setCurrentStep("");
    };

    const handleNewSession = () => {
        const newSession = sessionManager.current.createSession();
        setCurrentSession(newSession);
        sessionManager.current.saveSession(newSession); // Save it so it appears in list immediately? Or wait? 
        // Better to wait for interaction usually, but for history list visibility we might want it.
        // Let's NOT save empty sessions to history to avoid clutter.
    };

    const handleSelectSession = (id: string) => {
        const session = sessionManager.current.loadSession(id);
        if (session) {
            setCurrentSession(session);
        }
    };

    const handleDeleteSession = (id: string) => {
        sessionManager.current.deleteSession(id);
        const updated = sessionManager.current.getHistory();
        setSessions(updated);

        // If deleted session was active, create new one
        if (currentSession?.id === id) {
            handleNewSession();
        }
    };

    // Suggestions
    const suggestions = suggestionAgent.current.getSuggestions();

    return (
        <div className="flex h-full bg-slate-950 overflow-hidden relative">
            {/* Sidebar (Desktop visible) */}
            <HistorySidebar
                sessions={sessions}
                currentSessionId={currentSession?.id || ""}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
            />

            {/* Main Content */}
            <div className="flex-1 flex gap-4 p-4 overflow-hidden h-full">
                {/* Left Panel: Chat & Control */}
                <div className="w-1/3 flex flex-col space-y-4">
                    <Card className="flex-1 border-slate-800 bg-slate-900/50 backdrop-blur-sm flex flex-col overflow-hidden">
                        <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-emerald-500">
                                <Bot className="h-5 w-5" />
                                <span className="font-mono text-sm font-bold tracking-wider">COMMAND_LINE</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-[10px] border-slate-700 hover:bg-slate-800 text-slate-400"
                                    onClick={handleNewSession}
                                >
                                    <Plus className="h-3 w-3 mr-1" /> New Mission
                                </Button>
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        </div>

                        <CardContent className="flex-1 overflow-hidden p-0 flex flex-col relative">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                                <AnimatePresence>
                                    {currentSession?.messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "flex flex-col space-y-1 max-w-[90%]",
                                                msg.role === "user" ? "ml-auto items-end" : "items-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "px-4 py-2 rounded-lg text-sm",
                                                msg.role === "user"
                                                    ? "bg-emerald-500/10 text-emerald-100 border border-emerald-500/20 rounded-br-none"
                                                    : "bg-slate-800 text-slate-300 border border-slate-700 rounded-bl-none font-mono text-xs"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isReasoning && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4"
                                    >
                                        <ThinkingIndicator currentStep={currentStep} />
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-slate-900 border-t border-slate-800">
                                {/* Suggestions Area */}
                                {!isReasoning && currentSession?.messages.length === 1 && (
                                    <SuggestionChips
                                        suggestions={suggestions}
                                        onSelect={(prompt) => handleSimulation(prompt)}
                                    />
                                )}

                                <div className="relative flex items-center">
                                    <Terminal className="absolute left-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        // Wrap in anonymous function to match signature
                                        onKeyDown={(e) => e.key === "Enter" && !isReasoning && handleSimulation()}
                                        placeholder="Enter policy scenario..."
                                        className="pl-10 pr-12 bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600 focus-visible:ring-emerald-500"
                                        disabled={isReasoning}
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-1 hover:bg-emerald-500/20 hover:text-emerald-500"
                                        // Wrap here too for consistency
                                        onClick={() => handleSimulation()}
                                        disabled={isReasoning || !query.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel: Data & Visualization */}
                <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                    {currentSession?.result ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            // Add key based on session ID to trigger animation on switch
                            key={currentSession.id}
                            className="flex-1 flex flex-col gap-4 overflow-hidden"
                        >
                            {/* Upper Section: Telemetry */}
                            <div className="h-[280px]">
                                <TelemetryPanel data={currentSession.result.telemetry} />
                            </div>

                            {/* Lower Section: Strategic Brief */}
                            <Card className="flex-1 bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden flex flex-col">
                                <div className="p-3 border-b border-slate-800 bg-slate-950/50 flex items-center space-x-2">
                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Strategic Output</span>
                                </div>
                                <div className="flex-1 p-6 relative overflow-hidden bg-slate-950/30">
                                    {/* Typewriter effect watermark or background could go here */}
                                    <StrategicBrief markdown={currentSession.result.strategicBrief} />
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-600 flex-col space-y-4 border border-dashed border-slate-800 rounded-lg">
                            <Bot className="h-12 w-12 opacity-50" />
                            <p className="font-mono text-sm">Awaiting Intel Data...</p>
                            <p className="text-xs text-slate-500">Select a suggestion or enter a query.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
