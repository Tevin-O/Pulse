
"use client";

import { SimulationResult } from "./intelligence-engine";

export interface Session {
    id: string;
    timestamp: number;
    title: string;
    messages: { role: string; content: string }[];
    result: SimulationResult | null;
}

const STORAGE_KEY = "pulse_policy_sessions";

export class SessionManager {
    saveSession(session: Session): void {
        if (typeof window === "undefined") return;

        const sessions = this.getHistory();
        const existingIndex = sessions.findIndex(s => s.id === session.id);

        if (existingIndex >= 0) {
            sessions[existingIndex] = session;
        } else {
            sessions.unshift(session);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }

    getHistory(): Session[] {
        if (typeof window === "undefined") return [];

        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Failed to parse session history", e);
            return [];
        }
    }

    loadSession(id: string): Session | null {
        const sessions = this.getHistory();
        return sessions.find(s => s.id === id) || null;
    }

    // Create a new empty session
    createSession(): Session {
        return {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            title: "New Simulation",
            messages: [{ role: "system", content: "NIS Digital Operations Center: Reasoning Agent Online." }],
            result: null
        };
    }
}
