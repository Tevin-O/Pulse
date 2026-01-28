
export interface IntelligenceData {
    id: string;
    category: "Finance Bill Context" | "Historical Baseline" | "Linguistic Intel" | "Economic Baseline";
    content: string;
    metadata?: any;
}

export interface SimulationResult {
    strategicBrief: string;
    telemetry: TelemetryData;
    steps: ReasoningStep[];
}

export interface TelemetryData {
    unrest_risk: number;
    confidence_impact: number;
    impact_curve: { time: string; value: number }[];
}

export interface ReasoningStep {
    name: string;
    status: "pending" | "active" | "completed";
    detail?: string;
}

export const MOCK_INTELLIGENCE_LIBRARY: IntelligenceData[] = [
    {
        id: "fb_001",
        category: "Finance Bill Context",
        content: "Sec 14: Eco-Levy on digital products (16% VAT). Targeted at hardware and software imports.",
    },
    {
        id: "fb_010",
        category: "Finance Bill Context",
        content: "Finance Bill 2026 Sec 10: Proposed 'Digital Nomad' tax for remote workers (Nairobi/Mombasa focus).",
    },
    {
        id: "fb_002",
        category: "Finance Bill Context",
        content: "Sec 22: Proposed tax on imported sanitary products. Estimated revenue: 1.2B KES.",
    },
    {
        id: "fb_003",
        category: "Finance Bill Context",
        content: "Sec 45: 2.5% Motor Vehicle Circulation Tax based on insurance value.",
    },
    {
        id: "sec_act_001",
        category: "Finance Bill Context",
        content: "National Security Act (Amended 2025): Protocol for digital de-escalation via community engagement.",
    },
    {
        id: "hist_001",
        category: "Historical Baseline",
        content: "Protest Trigger 01: Housing Levy announcement (June 2024). Result: Viral Velocity spiked 400% in 12hrs. Top hashtag: #RejectFinanceBill.",
    },
    {
        id: "hist_002",
        category: "Historical Baseline",
        content: "Protest Trigger 02: 2023 Fuel Tax doubling (8% to 16%). Result: 3 days of localized skirmishes in Kisumu and Nairobi.",
    },
    {
        id: "hist_tuesday",
        category: "Historical Baseline",
        content: "The 'Tuesday' Effect: 2024 data shows mobilization peak always occurs 72 hours after the first viral 'Tuesday' mention.",
    },
    {
        id: "ling_001",
        category: "Linguistic Intel",
        content: "Term: 'Salimia Watu.' Context: Ironic code for Doxing/Public pressure. Threat Level: High.",
    },
    {
        id: "ling_002",
        category: "Linguistic Intel",
        content: "Term: 'Anguka Nayo.' Context: To fail with it/Reject completely. Contextual Sentiment: Defiance.",
    },
    {
        id: "eco_001",
        category: "Economic Baseline",
        content: "KNBS 2025 Stats: 18.2% youth unemployment in urban centers. Confidence baseline: 22%.",
    },
    {
        id: "eco_002",
        category: "Economic Baseline",
        content: "CPI Inflation 2025: 6.8%. Food basket costs up 14% YoY.",
    },
    {
        id: "eco_003",
        category: "Economic Baseline",
        content: "KNBS Q1 2026: Youth inflation in urban centers hit 8.4%.",
    },
    {
        id: "soc_001",
        category: "Economic Baseline",
        content: "Social Impact Baseline: 65% of Gen-Z respondents prefer direct digital dialogue over televised addresses.",
    }
];

export class ReasoningWorkflow {
    async runSimulation(query: string): Promise<SimulationResult> {
        // Step 1: Retrieve
        const drivers = this.retrieve(query);

        // Step 2: Compare
        const twinEvent = this.compare(drivers);

        // Step 3: Simulate
        const telemetry = this.simulate(drivers, twinEvent);

        // Step 4: Advise
        const brief = this.advise(drivers, twinEvent, telemetry);

        return {
            strategicBrief: brief,
            telemetry: telemetry,
            steps: [
                { name: "Retrieve", status: "completed", detail: `Identified drivers: ${drivers.join(", ")}` },
                { name: "Compare", status: "completed", detail: `Twin Event: ${twinEvent?.content ? twinEvent.content.substring(0, 30) + "..." : "None"}` },
                { name: "Simulate", status: "completed", detail: `Risk Projection: ${telemetry.unrest_risk}%` },
                { name: "Advise", status: "completed", detail: "Strategy generated." }
            ]
        };
    }

    private retrieve(query: string): string[] {
        const drivers = [];
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes("vat") || lowerQuery.includes("tax")) drivers.push("Taxation");
        if (lowerQuery.includes("eco-levy") || lowerQuery.includes("digital")) drivers.push("Eco-Levy");
        if (lowerQuery.includes("nomad") || lowerQuery.includes("remote")) drivers.push("Digital Nomad Tax");
        if (lowerQuery.includes("sanitary") || lowerQuery.includes("pads")) drivers.push("Sanitary Products Tax");
        if (lowerQuery.includes("vehicle") || lowerQuery.includes("car")) drivers.push("Motor Vehicle Tax");

        if (drivers.length === 0) drivers.push("General Economic Policy");
        return drivers;
    }

    private compare(drivers: string[]): IntelligenceData | null {
        // Simple mock matching
        if (drivers.includes("Taxation") || drivers.includes("Eco-Levy")) {
            return MOCK_INTELLIGENCE_LIBRARY.find(d => d.id === "hist_001") || null;
        }
        if (drivers.includes("Digital Nomad Tax")) {
            return MOCK_INTELLIGENCE_LIBRARY.find(d => d.id === "fb_010") || null;
        }
        if (drivers.includes("Motor Vehicle Tax")) {
            return MOCK_INTELLIGENCE_LIBRARY.find(d => d.id === "hist_002") || null;
        }
        return null; // Fallback
    }

    private simulate(drivers: string[], twinEvent: IntelligenceData | null): TelemetryData {
        // Probabilistic mock logic
        let baseRisk = 45;
        let baseConfidence = -5;

        if (drivers.includes("Sanitary Products Tax")) {
            baseRisk += 35; // Highly emotive
            baseConfidence -= 15;
        } else if (drivers.includes("Eco-Levy")) {
            baseRisk += 20;
            baseConfidence -= 8;
        } else if (drivers.includes("Digital Nomad Tax")) {
            baseRisk += 25;
            baseConfidence -= 10;
        }

        if (twinEvent?.id === "hist_001") { // Housing Levy Twin
            baseRisk += 15; // Proven volatility
        }

        // Generate curve
        const curve = [
            { time: "0h", value: baseRisk },
            { time: "6h", value: Math.min(100, baseRisk + 10) },
            { time: "12h", value: Math.min(100, baseRisk + 25) },
            { time: "24h", value: Math.min(100, baseRisk + 15) },
            { time: "48h", value: Math.min(100, baseRisk + 5) },
        ];

        return {
            unrest_risk: Math.min(95, baseRisk),
            confidence_impact: baseConfidence,
            impact_curve: curve
        };
    }

    private advise(drivers: string[], twinEvent: IntelligenceData | null, telemetry: TelemetryData): string {
        const isHighRisk = telemetry.unrest_risk > 70;
        const driverList = drivers.join(", ");

        const twinEventText = twinEvent
            ? `**Twin Event Detected:** ${twinEvent.content}`
            : "No direct historical twin found; utilizing general baseline models.";

        let strategy = "";

        // Contextual Recommendation logic
        let specificRecs = "";
        if (drivers.includes("Digital Nomad Tax")) {
            specificRecs = `
1. **Clarification Campaign:** Emphasize exemptions for local freelancers vs foreign entities.
2. **Consultation Window:** Announce a 30-day stakeholder engagement period with tech hubs (Nairobi Garage, ihub).
             `;
        } else if (drivers.includes("Sanitary Products Tax")) {
            specificRecs = `
1. **Immediate Reversal:** The social cost outweighs the 1.2B KES revenue projection.
2. **Alternative Funding:** Propose recouping via luxury goods import duties.
             `;
        } else {
            specificRecs = `
1. **Gradual Rollout:** Implement in phases to monitor sentiment.
2. **Transparency:** Publish a clear breakdown of revenue allocation.
3. **Monitoring:** Isolate and track specific hashtags related to this policy.
             `;
        }


        if (isHighRisk) {
            strategy = `
### 🚨 HIGH RISK ALERT
The proposed policy regarding **${driverList}** shows a projected Unrest Probability of **${telemetry.unrest_risk}%**.

${twinEventText}

### Actionable Recommendations:
${specificRecs}
            `;
        } else {
            strategy = `
### MODERATE RISK ASSESSMENT
The proposed policy regarding **${driverList}** is projected to have a **${telemetry.unrest_risk}%** Unrest Probability.

${twinEventText}

### Actionable Recommendations:
${specificRecs}
            `;
        }

        const sources = MOCK_INTELLIGENCE_LIBRARY.slice(0, 3).map(i => `> - [${i.category}] ${i.content}`).join("\n");

        return `
# Classified Strategic Brief
**Clearance Level:** NIS-5  
**Subject:** Digital Sentiment Simulation - ${driverList}

## 1. Probabilistic Forecast
**Unrest Probability (24h):** ${telemetry.unrest_risk}%  
**Confidence Delta:** ${telemetry.confidence_impact}%

${strategy}

---
### Intelligence Citations
${sources}

> **LIMITATION DISCLAIMER:** Prediction is probabilistic; digital signals reflect ~75% of youth sentiment, remaining 25% of offline mobilization intent is unaccounted for.
        `;
    }
}
