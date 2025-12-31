"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { THREAT_METRICS } from "@/lib/mockData";
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FileText, Lock } from "lucide-react";
import { useState, useEffect } from "react";

// PDF Styles
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 20, borderBottom: '2px solid #000', paddingBottom: 10 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 10, fontFamily: 'Courier' },
    stamp: { color: 'red', fontSize: 14, textAlign: 'center', border: '2px solid red', padding: 5, alignSelf: 'center', marginBottom: 20 },
    section: { margin: 10, padding: 10 },
    text: { fontSize: 12, marginBottom: 5, fontFamily: 'Courier' },
    metric: { fontSize: 14, marginBottom: 5, fontFamily: 'Courier', fontWeight: 'bold' },
});

// PDF Document Component
export function ReportGenerator() {
    const [isOpen, setIsOpen] = useState(false);

    const [dateStr, setDateStr] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDateStr(new Date().toLocaleDateString());
    }, []);

    // Dynamic Summary Generation
    const criticalMetrics = THREAT_METRICS.filter(m => m.type === "critical");
    const warningMetrics = THREAT_METRICS.filter(m => m.type === "warning");

    if (!mounted) return null;

    const summaryText = `
    SITUATION REPORT: ${dateStr}
    
    EXECUTIVE SUMMARY:
    The current threat level is ELEVATED. ${criticalMetrics.length} metrics are in CRITICAL state, primarily driven by ${criticalMetrics.map(m => m.label).join(" and ")}. 
    
    Civil unrest probability stands at ${THREAT_METRICS.find(m => m.label === "Civil Unrest Probability")?.value}%, indicating a high likelihood of coordinated action within the next 48 hours.
    
    RECOMMENDATIONS:
    1. Immediate deployment of de-escalation units to identified hotspots.
    2. Counter-narrative operations targeting "Agenda Velocity" (${THREAT_METRICS.find(m => m.label === "Agenda Velocity")?.value}).
    3. Enhanced monitoring of key influencers in the "Dissenters" cluster.
    `;

    const IntelDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>REPUBLIC OF KENYA</Text>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>NATIONAL INTELLIGENCE SERVICE</Text>
                </View>

                <View style={styles.stamp}>
                    <Text>CONFIDENTIAL / EYES ONLY</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{ fontSize: 16, marginBottom: 10, textDecoration: 'underline' }}>THREAT MATRIX</Text>
                    {THREAT_METRICS.map((metric) => (
                        <View key={metric.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.metric}>{metric.label}</Text>
                            <Text style={{ ...styles.metric, color: metric.type === 'critical' ? 'red' : 'black' }}>
                                {metric.value}% ({metric.trend})
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{summaryText}</Text>
                </View>

                <View style={{ position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: '1px solid #000', paddingTop: 10 }}>
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>CLASSIFIED DOCUMENT - UNAUTHORIZED DISTRIBUTION IS A CRIMINAL OFFENSE</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <Card className="col-span-1 border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span>Intel Reports</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-48 space-y-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-border hover:bg-accent text-foreground">
                            <Lock className="mr-2 h-4 w-4 text-red-500" />
                            Generate Classified Brief
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center text-red-500">
                                <Lock className="mr-2 h-5 w-5" />
                                CONFIDENTIAL ACCESS
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Generating dynamic threat assessment based on live telemetry...
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center py-6">
                            <div className="h-32 w-24 bg-white shadow-lg flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-red-500 opacity-20" />
                                <div className="text-[6px] text-black text-center mb-2 font-bold">REPUBLIC OF KENYA</div>
                                <div className="border border-red-500 text-[4px] text-red-500 px-1 mb-2 font-bold">TOP SECRET</div>
                                <div className="w-full space-y-1">
                                    <div className="w-full h-0.5 bg-slate-300" />
                                    <div className="w-[90%] h-0.5 bg-slate-300" />
                                    <div className="w-[95%] h-0.5 bg-slate-300" />
                                    <div className="w-[80%] h-0.5 bg-slate-300" />
                                </div>
                                <div className="absolute bottom-2 right-2">
                                    <div className="h-4 w-4 rounded-full border border-red-500 flex items-center justify-center">
                                        <div className="h-2 w-2 bg-red-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PDFDownloadLink document={<IntelDocument />} fileName={`NIS_SITREP_${new Date().toISOString().split('T')[0]}.pdf`}>
                                {({ blob, url, loading, error }) => (
                                    <Button disabled={loading} className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                                        {loading ? 'Encrypting Data...' : 'Download Secure PDF'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
            <div className="px-6 pb-6 space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Reports</h4>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border text-xs">
                            <div className="flex items-center space-x-2">
                                <FileText className="h-3 w-3 text-slate-500" />
                                <span className="text-foreground">SITREP_2024-06-{20 - i}.pdf</span>
                            </div>
                            <span className="text-muted-foreground">24h Summary</span>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                    View All Archives
                </Button>
            </div>
        </Card>
    );
}
