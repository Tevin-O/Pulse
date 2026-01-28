
export interface Tweet {
    id: string;
    username: string;
    user_type: "Organic" | "Bot" | "Official" | "Influencer";
    text: string;
    hashtags: string[];
    location: string;
    countyId: string;
    category: "Politics" | "Finance" | "News" | "Security" | "Sports" | "Drama";
    timestamp: string;
    quotes: number;
    retweets: number;
    likes: number;
    influence_score: number;
    viral_velocity: number; // 0-100 scale for pulse speed
}

export interface CountyNode {
    id: string;
    label: string;
    x: number; // 0-100
    y: number; // 0-100
    base_velocity: number;
}

// Full 47 Counties List (Approximated positions for abstract map)
export const KENYA_COUNTIES: CountyNode[] = [
    { id: "mombasa", label: "Mombasa", x: 88, y: 85, base_velocity: 65 },
    { id: "kwale", label: "Kwale", x: 88, y: 92, base_velocity: 30 },
    { id: "kilifi", label: "Kilifi", x: 88, y: 75, base_velocity: 35 },
    { id: "tana_river", label: "Tana River", x: 80, y: 65, base_velocity: 25 },
    { id: "lamu", label: "Lamu", x: 92, y: 68, base_velocity: 40 },
    { id: "taita_taveta", label: "Taita Taveta", x: 75, y: 90, base_velocity: 30 },
    { id: "garissa", label: "Garissa", x: 80, y: 50, base_velocity: 45 },
    { id: "wajir", label: "Wajir", x: 80, y: 30, base_velocity: 35 },
    { id: "mandera", label: "Mandera", x: 90, y: 15, base_velocity: 30 },
    { id: "marsabit", label: "Marsabit", x: 50, y: 20, base_velocity: 35 },
    { id: "isiolo", label: "Isiolo", x: 55, y: 45, base_velocity: 40 },
    { id: "meru", label: "Meru", x: 60, y: 50, base_velocity: 55 },
    { id: "tharaka_nithi", label: "Tharaka Nithi", x: 62, y: 53, base_velocity: 30 },
    { id: "embu", label: "Embu", x: 60, y: 56, base_velocity: 40 },
    { id: "kitui", label: "Kitui", x: 65, y: 65, base_velocity: 45 },
    { id: "machakos", label: "Machakos", x: 55, y: 65, base_velocity: 60 },
    { id: "makueni", label: "Makueni", x: 60, y: 72, base_velocity: 50 },
    { id: "nyandarua", label: "Nyandarua", x: 45, y: 55, base_velocity: 40 },
    { id: "nyeri", label: "Nyeri", x: 50, y: 53, base_velocity: 60 },
    { id: "kirinyaga", label: "Kirinyaga", x: 55, y: 55, base_velocity: 45 },
    { id: "muranga", label: "Murang'a", x: 52, y: 58, base_velocity: 55 },
    { id: "kiambu", label: "Kiambu", x: 50, y: 60, base_velocity: 75 },
    { id: "turkana", label: "Turkana", x: 20, y: 20, base_velocity: 45 },
    { id: "west_pokot", label: "West Pokot", x: 25, y: 35, base_velocity: 30 },
    { id: "samburu", label: "Samburu", x: 45, y: 35, base_velocity: 35 },
    { id: "trans_nzoia", label: "Trans Nzoia", x: 20, y: 40, base_velocity: 40 },
    { id: "uasin_gishu", label: "Uasin Gishu", x: 25, y: 45, base_velocity: 70 },
    { id: "elgeyo_marakwet", label: "Elgeyo Marakwet", x: 30, y: 42, base_velocity: 35 },
    { id: "nandi", label: "Nandi", x: 25, y: 48, base_velocity: 50 },
    { id: "baringo", label: "Baringo", x: 35, y: 40, base_velocity: 40 },
    { id: "laikipia", label: "Laikipia", x: 45, y: 45, base_velocity: 50 },
    { id: "nakuru", label: "Nakuru", x: 40, y: 55, base_velocity: 75 },
    { id: "narok", label: "Narok", x: 35, y: 75, base_velocity: 50 },
    { id: "kajiado", label: "Kajiado", x: 50, y: 75, base_velocity: 60 },
    { id: "kericho", label: "Kericho", x: 30, y: 55, base_velocity: 50 },
    { id: "bomet", label: "Bomet", x: 30, y: 60, base_velocity: 45 },
    { id: "kakamega", label: "Kakamega", x: 15, y: 45, base_velocity: 55 },
    { id: "vihiga", label: "Vihiga", x: 15, y: 50, base_velocity: 40 },
    { id: "bungoma", label: "Bungoma", x: 12, y: 40, base_velocity: 50 },
    { id: "busia", label: "Busia", x: 10, y: 48, base_velocity: 45 },
    { id: "siaya", label: "Siaya", x: 12, y: 55, base_velocity: 50 },
    { id: "kisumu", label: "Kisumu", x: 18, y: 55, base_velocity: 70 },
    { id: "homa_bay", label: "Homa Bay", x: 15, y: 65, base_velocity: 50 },
    { id: "migori", label: "Migori", x: 15, y: 75, base_velocity: 50 },
    { id: "kisii", label: "Kisii", x: 20, y: 65, base_velocity: 55 },
    { id: "nyamira", label: "Nyamira", x: 22, y: 60, base_velocity: 40 },
    { id: "nairobi", label: "Nairobi", x: 52, y: 63, base_velocity: 95 },
];

const CATEGORIES = ["Politics", "Finance", "News", "Security", "Sports", "Drama"] as const;
const TOP_HASHTAGS = ["#RejectFinanceBill", "#Maandamano", "#FinanceBill2026", "#RutoMustGo", "#KenyaRising", "#Zakayo", "#OccupyParliament", "#Eurobond", "#KRA", "#FuelPrices"];

// Initial Seed Data
const MOCK_TWEETS_BASE: Tweet[] = [
    {
        id: "tw_001",
        username: "@GenZ_Sentinel",
        user_type: "Organic",
        text: "The situation in Nairobi CBD is intense regarding #RejectFinanceBill. #Maandamano",
        hashtags: ["#RejectFinanceBill", "#Maandamano"],
        location: "Nairobi",
        countyId: "nairobi",
        category: "Politics",
        timestamp: new Date().toISOString(),
        quotes: 450,
        retweets: 1200,
        likes: 3500,
        influence_score: 95,
        viral_velocity: 90
    },
    {
        id: "tw_002",
        username: "@GenZ_Sentinel",
        user_type: "Organic",
        text: "Mombasa is joining the chant! #RejectFinanceBill is valid. We are watching.",
        hashtags: ["#RejectFinanceBill", "#Mombasa"],
        location: "Mombasa",
        countyId: "mombasa",
        category: "Politics",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        quotes: 200,
        retweets: 800,
        likes: 2100,
        influence_score: 88,
        viral_velocity: 75
    },
    {
        id: "tw_003",
        username: "@MaandamanoHQ",
        user_type: "Influencer",
        text: "Mobilization detected in Kisumu. Stay safe. #Maandamano",
        hashtags: ["#Maandamano", "#Kisumu"],
        location: "Kisumu",
        countyId: "kisumu",
        category: "Security",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        quotes: 300,
        retweets: 600,
        likes: 1500,
        influence_score: 92,
        viral_velocity: 80
    }
];

export function getMockTweets(count: number = 500, filters?: any): Tweet[] {
    const tweets = [...MOCK_TWEETS_BASE];

    // Generate scale
    for (let i = tweets.length; i < count; i++) {
        const county = KENYA_COUNTIES[Math.floor(Math.random() * KENYA_COUNTIES.length)];
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const tag = TOP_HASHTAGS[Math.floor(Math.random() * TOP_HASHTAGS.length)];

        let velocity = Math.random() * 100;
        if (county.id === "nairobi" || county.id === "kisumu") velocity += 20; // Bias high
        if (tag === "#RejectFinanceBill") velocity += 30; // Viral bias

        tweets.push({
            id: `tw_${i}`,
            username: `@User_${Math.floor(Math.random() * 5000)}`,
            user_type: Math.random() > 0.9 ? "Bot" : Math.random() > 0.8 ? "Influencer" : "Organic",
            text: `Generated chatter about ${tag} in ${county.label}. This is a critical ${category.toLowerCase()} update. Sent by @User_${Math.floor(Math.random() * 5000)}`,
            hashtags: [tag],
            location: county.label,
            countyId: county.id,
            category: category,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
            quotes: Math.floor(Math.random() * 50),
            retweets: Math.floor(Math.random() * 500),
            likes: Math.floor(Math.random() * 2000),
            influence_score: Math.min(100, Math.floor(velocity * 0.8 + Math.random() * 20)),
            viral_velocity: Math.min(100, velocity)
        });
    }

    // Sort by influence
    return tweets.sort((a, b) => b.influence_score - a.influence_score);
}

export function getCountyStats(countyId: string, tweets: Tweet[]) {
    const countyTweets = tweets.filter(t => t.countyId === countyId);

    // Most common category
    const categories: Record<string, number> = {};
    countyTweets.forEach(t => categories[t.category] = (categories[t.category] || 0) + 1);
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

    // Bot ratio
    const bots = countyTweets.filter(t => t.user_type === "Bot" || t.user_type === "Official").length;

    // Velocity
    const avgVelocity = countyTweets.reduce((acc, t) => acc + (t.viral_velocity || 0), 0) / (countyTweets.length || 1);

    // Sentiment (Mock logic based on category/keywords)
    const criticalCount = countyTweets.filter(t => t.text.toLowerCase().includes("reject") || t.text.toLowerCase().includes("protest")).length;
    const sentiment = criticalCount > (countyTweets.length * 0.3) ? "Critical" : "Neutral";

    return {
        total: countyTweets.length,
        topCategory,
        botRatio: countyTweets.length > 0 ? (bots / countyTweets.length) * 100 : 0,
        volume: `${(countyTweets.length * 12.5).toFixed(1)}k`,
        activeVoices: countyTweets.slice(0, 3).map(t => t.username),
        velocity: Math.round(avgVelocity),
        sentiment
    };
}

export function getTopLocations(tweets: Tweet[], limit: number = 7) {
    const locationCounts: Record<string, number> = {};
    tweets.forEach(t => {
        if (t.countyId) {
            locationCounts[t.countyId] = (locationCounts[t.countyId] || 0) + 1;
        }
    });

    return Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([id, count]) => {
            const staticNode = KENYA_COUNTIES.find(c => c.id === id);
            return {
                ...staticNode, // Keep useful labels/ids
                count,
                // We will ignore static x/y in the new dynamic map, or use them as gravity centers
            };
        })
        .filter(n => n.id); // Ensure found
}
