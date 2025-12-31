"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RADAR_DATA } from "@/lib/mockData";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

export function EmotionalRadar() {
    return (
        <Card className="col-span-1 row-span-2 border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Emotional Flavor
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Emotion"
                            dataKey="A"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fill="#8b5cf6"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
