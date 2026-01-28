
export interface Suggestion {
    id: string;
    label: string;
    prompt: string;
    category: "Fiscal" | "Security" | "Social";
}

export class SuggestionAgent {
    getSuggestions(): Suggestion[] {
        // In a real system, this would read live sentiment.
        // For now, we return the 3 high-value scenarios requested.
        return [
            {
                id: "sug_01",
                label: "Fiscal De-escalation",
                category: "Fiscal",
                prompt: "What if we postpone the implementation of Finance Bill Section 10 for 90 days?"
            },
            {
                id: "sug_02",
                label: "Security Response",
                category: "Security",
                prompt: "What is the impact of removing roadblocks in the CBD in exchange for a digital town hall?"
            },
            {
                id: "sug_03",
                label: "Social Intervention",
                category: "Social",
                prompt: "Simulate the impact of a 1-billion KES 'Talent Fund' announcement specifically targeting Gen-Z artists."
            }
        ];
    }
}
