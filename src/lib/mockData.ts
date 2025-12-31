export const TICKER_ALERTS = [
    { id: 1, type: "critical", message: "X ALERT: #RejectFinanceBill velocity > 15 tweets/min" },
    { id: 2, type: "news", message: "NEWS: 5M Youth Jobless report released by KNBS" },
    { id: 3, type: "warning", message: "INTEL: New bot farm detected in Kajiado (Cluster 4)" },
    { id: 4, type: "critical", message: "RISK: 'RutoMustGo' hashtag trending #1 nationwide" },
    { id: 5, type: "info", message: "UPDATE: Police deployed to Moi Avenue" },
];

export const THREAT_METRICS = [
    { id: 1, label: "Civil Unrest Probability", value: 65, type: "critical", trend: "+12%" },
    { id: 2, label: "Govt Confidence Index", value: 22, type: "critical", trend: "-5%" }, // 0-100, low is negative
    { id: 3, label: "Agenda Velocity", value: 88, type: "warning", trend: "HIGH" },
    { id: 4, label: "Viral Velocity", value: 92, type: "critical", trend: "+400%" },
];

export const VELOCITY_DATA = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 10 + Math.sin(i) * 5 + (i > 18 ? i * 2 : 0), // Deterministic pattern
}));

export const SHENG_WORDS = [
    { text: "Zakayo", value: 100, sentiment: "negative", meaning: "Tax Collector (President)", context: "Anti-Finance Bill" },
    { text: "Kufa Makanga", value: 80, sentiment: "critical", meaning: "Die hard/Martyr", context: "Protest calls" },
    { text: "Mambo ni Matatu", value: 60, sentiment: "warning", meaning: "Three options (Jail, Deportation, Heaven)", context: "Government threat" },
    { text: "Maandamano", value: 90, sentiment: "negative", meaning: "Protests", context: "General unrest" },
    { text: "RejectFinanceBill", value: 95, sentiment: "negative", meaning: "Reject the bill", context: "Policy opposition" },
    { text: "Lala", value: 30, sentiment: "neutral", meaning: "Sleep/Low activity", context: "Calm periods" },
    { text: "Jeshi", value: 50, sentiment: "warning", meaning: "Army/Thugs", context: "Security deployment" },
];

export const INFLUENCER_NODES = [
    { id: "activist-1", group: 1, size: 30, label: "@wanjirunjira", isBot: false, cluster: "Dissenters" },
    { id: "activist-2", group: 1, size: 15, label: "Activist B", isBot: false, cluster: "Dissenters" },
    { id: "bot-farm-1", group: 2, size: 5, label: "Bot 1", isBot: true, cluster: "Agenda Pushers" },
    { id: "bot-farm-2", group: 2, size: 5, label: "Bot 2", isBot: true, cluster: "Agenda Pushers" },
    { id: "bot-farm-3", group: 2, size: 5, label: "Bot 3", isBot: true, cluster: "Agenda Pushers" },
    { id: "gov-official", group: 3, size: 25, label: "@C_NyaKundiH", isBot: false, cluster: "Loyalists" },
];

export const INFLUENCER_LINKS = [
    { source: "activist-1", target: "activist-2" },
    { source: "bot-farm-1", target: "gov-official" },
    { source: "bot-farm-2", target: "gov-official" },
    { source: "bot-farm-3", target: "gov-official" },
];

export const POLICY_SIMULATION_DATA = [
    { year: "Day 1", sentiment: 45 },
    { year: "Day 2", sentiment: 42 },
    { year: "Day 3", sentiment: 38 },
    { year: "Day 4", sentiment: 30 },
    { year: "Day 5", sentiment: 25 },
    { year: "Day 6", sentiment: 20, projectedNoAction: 15, projectedAction: 40 },
    { year: "Day 7", sentiment: 18, projectedNoAction: 10, projectedAction: 55 },
];

export const RADAR_DATA = [
    { subject: 'Anger', A: 120, fullMark: 150 },
    { subject: 'Fear', A: 98, fullMark: 150 },
    { subject: 'Disgust', A: 86, fullMark: 150 },
    { subject: 'Joy', A: 20, fullMark: 150 },
    { subject: 'Surprise', A: 65, fullMark: 150 },
    { subject: 'Sadness', A: 85, fullMark: 150 },
];

export const SANKEY_DATA = {
    nodes: [
        { name: "TikTok" },              // Index 0
        { name: "Twitter Influencers" }, // Index 1
        { name: "Street Protests" },     // Index 2
        { name: "Mainstream Media" },    // Index 3
    ],
    links: [
        { source: 0, target: 1, value: 50 },
        { source: 1, target: 2, value: 80 },
        { source: 0, target: 2, value: 20 },
        { source: 1, target: 3, value: 30 },
    ],
};

export const TREND_DECAY = [
    { hashtag: "#RutoMustGo", status: "rising", halfLife: "48h", volume: "12.5k posts/hr" },
    { hashtag: "#OccupyParliament", status: "rising", halfLife: "24h", volume: "8.2k posts/hr" },
    { hashtag: "#FinanceBill2024", status: "decaying", halfLife: "12h", volume: "1.1k posts/hr" },
    { hashtag: "#Maandamano", status: "stable", halfLife: "72h", volume: "5.4k posts/hr" },
];
