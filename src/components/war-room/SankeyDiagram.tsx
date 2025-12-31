"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SANKEY_DATA } from "@/lib/mockData";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";

export function SankeyDiagram() {
    return (
        <Card className="col-span-2 h-full border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Narrative Origins Flow
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <Sankey
                        data={SANKEY_DATA as any}
                        node={{ strokeWidth: 0 }}
                        nodePadding={50}
                        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                        link={{ stroke: '#334155' }}
                    >
                        <Tooltip />
                    </Sankey>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
