import { Heatmap } from "@/components/dashboard/Heatmap";
import { ThreatGauge } from "@/components/dashboard/ThreatGauge";
import { VelocityChart } from "@/components/dashboard/VelocityChart";
import { EmotionalRadar } from "@/components/dashboard/RadarChart";
import { THREAT_METRICS } from "@/lib/mockData";

export default function Home() {
    return (
        <div className="p-6 space-y-6 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
            {/* Top Row: Threat Meters */}
            <div className="grid grid-cols-4 gap-6 shrink-0">
                {THREAT_METRICS.map((metric) => (
                    <ThreatGauge
                        key={metric.id}
                        label={metric.label}
                        value={metric.value}
                        type={metric.type as "critical" | "warning" | "stable"}
                        trend={metric.trend}
                    />
                ))}
            </div>

            {/* Main Content: Heatmap & Velocity */}
            <div className="grid grid-cols-4 gap-6 flex-1 min-h-0">
                <Heatmap />
                <VelocityChart />
                <EmotionalRadar />
            </div>
        </div>
    );
}
