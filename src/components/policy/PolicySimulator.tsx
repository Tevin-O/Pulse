
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { POLICY_SIMULATION_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PolicySimulator() {
    const [messages, setMessages] = useState([
        { role: "system", content: "Policy Impact Simulation Agent online. Awaiting query..." }
    ]);
    const [input, setInput] = useState("");
    const [isSimulating, setIsSimulating] = useState(false);
    const [showPrediction, setShowPrediction] = useState(false);

    // Slider states
    const [taxRate, setTaxRate] = useState([16]);
    const [jobsBudget, setJobsBudget] = useState([10]);
    const [policePresence, setPolicePresence] = useState([50]);

    const handleSimulate = () => {
        if (!input) return;

        setMessages(prev => [...prev, { role: "user", content: input }]);
        setInput("");
        setIsSimulating(true);
        setShowPrediction(false);

        // Simulate AI processing
        setTimeout(() => {
            setMessages(prev => [...prev, { role: "system", content: "Analyzing historical sentiment data..." }]);
        }, 1000);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: "system", content: "Projecting impact on civil unrest probability..." }]);
        }, 2500);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: "system", content: "Simulation complete. Visualizing projected outcomes." }]);
            setIsSimulating(false);
            setShowPrediction(true);
        }, 4000);
    };

    return (
        <div className="grid grid-cols-2 gap-6 h-full">
            {/* Scenario Builder (Left) */}
            <Card className="col-span-1 border-slate-800 bg-slate-900/50 backdrop-blur-sm flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-slate-400">
                        <Bot className="h-4 w-4 text-emerald-500" />
                        <span>Scenario Builder</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
                    {/* Sliders */}
                    <div className="space-y-4 p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>VAT Tax Rate</span>
                                <span className="font-mono text-slate-200">{taxRate}%</span>
                            </div>
                            <Slider value={taxRate} onValueChange={setTaxRate} max={30} step={1} className="py-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Jobs Creation Budget (Billion KES)</span>
                                <span className="font-mono text-emerald-400">{jobsBudget}B</span>
                            </div>
                            <Slider value={jobsBudget} onValueChange={setJobsBudget} max={100} step={5} className="py-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Police Presence Level</span>
                                <span className="font-mono text-amber-400">{policePresence}%</span>
                            </div>
                            <Slider value={policePresence} onValueChange={setPolicePresence} max={100} step={10} className="py-2" />
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 min-h-0">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={cn(
                                    "p-3 rounded-lg text-sm max-w-[80%]",
                                    msg.role === "system"
                                        ? "bg-slate-800/50 text-emerald-400 border border-emerald-500/20 self-start font-mono"
                                        : "bg-slate-700/50 text-slate-200 self-end ml-auto"
                                )}
                            >
                                {msg.content}
                            </motion.div>
                        ))}
                        {isSimulating && (
                            <div className="flex space-x-1 p-3">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="h-2 w-2 bg-emerald-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="h-2 w-2 bg-emerald-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="h-2 w-2 bg-emerald-500 rounded-full" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-slate-800">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSimulate()}
                            placeholder="Describe scenario..."
                            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <button
                            onClick={handleSimulate}
                            className="p-2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/50 hover:bg-emerald-500/20 transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Predictive Chart (Right) */}
            <Card className="col-span-1 border-slate-800 bg-slate-900/50 backdrop-blur-sm flex flex-col">
                <CardHeader>
                    <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-400">
                        Projected Sentiment Impact
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 flex flex-col">
                    <div className="flex-1 h-[60%]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={POLICY_SIMULATION_DATA}>
                                <defs>
                                    <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                                    itemStyle={{ color: "#f8fafc" }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="sentiment"
                                    stroke="#64748b"
                                    strokeWidth={2}
                                    fill="url(#colorSentiment)"
                                    name="Historical"
                                />

                                {showPrediction && (
                                    <>
                                        <Area
                                            type="monotone"
                                            dataKey="projectedNoAction"
                                            stroke="#ef4444"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            fill="transparent"
                                            name="No Action"
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="projectedAction"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            fill="transparent"
                                            name="Policy Enacted"
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                        />
                                    </>
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gantt / Timeline */}
                    {showPrediction && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 pt-4 border-t border-slate-800 h-[30%]"
                        >
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Intervention Timeline</h4>
                            <div className="space-y-2">
                                <div className="flex items-center text-xs">
                                    <span className="w-16 text-slate-400">Day 1</span>
                                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[20%] bg-blue-500" />
                                    </div>
                                    <span className="ml-2 text-blue-400">Press Release</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <span className="w-16 text-slate-400">Day 3</span>
                                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[40%] bg-amber-500" />
                                    </div>
                                    <span className="ml-2 text-amber-400">Parliament Debate</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <span className="w-16 text-slate-400">Day 7</span>
                                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-emerald-500" />
                                    </div>
                                    <span className="ml-2 text-emerald-400">Policy Rollout</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

