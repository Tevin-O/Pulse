
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TelemetryData } from "@/lib/intelligence-engine";
import { Activity, ShieldAlert, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TelemetryPanelProps {
    data: TelemetryData;
}

export function TelemetryPanel({ data }: TelemetryPanelProps) {
    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            {/* Top Stats */}
            <Card className="col-span-2 bg-slate-900/30 border-slate-800">
                <CardContent className="p-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Unrest Risk</p>
                            <p className="text-2xl font-bold text-slate-100">{data.unrest_risk}%</p>
                            <p className="text-[10px] text-red-400 flex items-center">
                                <Activity className="h-3 w-3 mr-1" /> Projected Spike
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 border-l border-slate-800 pl-4">
                        <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Confidence Impact</p>
                            <p className="text-2xl font-bold text-slate-100">{data.confidence_impact > 0 ? "+" : ""}{data.confidence_impact}%</p>
                            <p className="text-[10px] text-amber-400">Baseline Deviation</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Chart */}
            <Card className="col-span-2 flex-1 bg-slate-900/30 border-slate-800 flex flex-col min-h-[250px]">
                <CardHeader className="py-3 px-4 border-b border-slate-800">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        24-Hour Volatility Forecast
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0">
                    <div className="h-full w-full min-h-[200px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.impact_curve}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                                    itemStyle={{ color: "#f8fafc" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    fill="url(#colorRisk)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
