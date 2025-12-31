import { InfluencerGraph } from "@/components/war-room/InfluencerGraph";
import { ShengDecoder } from "@/components/war-room/ShengDecoder";
import { SankeyDiagram } from "@/components/war-room/SankeyDiagram";
import { TrendDecay } from "@/components/war-room/TrendDecay";

export default function WarRoomPage() {
    return (
        <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
                <ShengDecoder />
                <InfluencerGraph />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                <SankeyDiagram />
                <TrendDecay />
            </div>
        </div>
    );
}
