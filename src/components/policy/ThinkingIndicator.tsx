
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Brain, Database, FileText, Scale } from "lucide-react";

interface ThinkingIndicatorProps {
    currentStep: string;
}

const steps = [
    { id: "Retrieve", icon: Database, label: "Retrieving Context" },
    { id: "Compare", icon: FileText, label: "Cross-Ref History" },
    { id: "Simulate", icon: Brain, label: "Running Simulation" },
    { id: "Advise", icon: Scale, label: "Formulating Strategy" },
];

export function ThinkingIndicator({ currentStep }: ThinkingIndicatorProps) {
    return (
        <div className="flex flex-col space-y-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg backdrop-blur-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Reasoning Engine Active
            </h3>
            <div className="grid grid-cols-4 gap-4">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                    return (
                        <div key={step.id} className="flex flex-col items-center space-y-2">
                            <div className="relative">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        borderColor: isActive ? "#10b981" : isCompleted ? "#334155" : "#1e293b",
                                        backgroundColor: isActive ? "rgba(16, 185, 129, 0.1)" : "transparent"
                                    }}
                                    className={cn(
                                        "h-10 w-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                                        isCompleted && "text-slate-600 border-slate-700",
                                        !isActive && !isCompleted && "text-slate-700 border-slate-800",
                                        isActive && "text-emerald-400 border-emerald-500"
                                    )}
                                >
                                    <step.icon className="h-5 w-5" />
                                </motion.div>
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-emerald-500"
                                        animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] uppercase font-medium text-center",
                                isActive ? "text-emerald-400" : "text-slate-600"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-full">
                <motion.div
                    className="h-full bg-emerald-500"
                    layoutId="progress"
                    initial={{ width: "0%" }}
                    animate={{
                        width: currentStep === "Retrieve" ? "25%"
                            : currentStep === "Compare" ? "50%"
                                : currentStep === "Simulate" ? "75%"
                                    : "100%"
                    }}
                />
            </div>
        </div>
    );
}
