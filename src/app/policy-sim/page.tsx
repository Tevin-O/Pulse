import { PolicySimulator } from "@/components/policy/PolicySimulator";

export default function PolicyPage() {
    return (
        <div className="p-6 h-[calc(100vh-4rem)] overflow-hidden">
            <PolicySimulator />
        </div>
    );
}
