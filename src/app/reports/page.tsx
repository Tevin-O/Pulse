import { ReportGenerator } from "@/components/reports/ReportGenerator";

export default function ReportsPage() {
    return (
        <div className="p-6 h-[calc(100vh-4rem)] overflow-hidden">
            <div className="grid grid-cols-3 gap-6 h-full">
                <ReportGenerator />
                {/* Future modules can go here */}
            </div>
        </div>
    );
}
