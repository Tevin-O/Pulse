# PulseKE Project Documentation

## Overview
PulseKE is a real-time sentiment analysis and threat monitoring dashboard designed to track social and political trends in Kenya. It visualizes data related to civil unrest, government confidence, and social media trends (e.g., Sheng slang, hashtags).

It has been expanded to include an **Intelligence Engine** for simulating policy outcomes and a **Geointel Query Interface** for granular social media analysis.

## Architecture

### Frontend
-   **Framework**: Next.js 14+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, PostCSS
-   **UI Components**: Radix UI (primitives), Lucide React (icons), Framer Motion (animations)
-   **Visualizations**: Recharts (charts), Custom SVG/D3 (Sankey, Network Graph), Maps (Geointel).
-   **Feature logic**: Custom TS classes for simulation (`ReasoningWorkflow`) and suggestions (`SuggestionAgent`).

### Data Flow (Current State)
The application operates in a **sophisticated demo mode** with distinct data silos:
1.  **Dashboard Data**: `src/lib/mockData.ts` contains static alerts, theat metrics, velocity data, and influencer nodes.
2.  **Geointel Data**: `src/lib/mock-queries.ts` generates mock tweets with geolocation and metadata for the query engine.
3.  **Simulation Logic**: `src/lib/intelligence-engine.ts` implements a pseudo-probabilistic model that matches "Policy Drivers" (e.g., "Taxation") against "Historical Twin Events" to project Unrest Risk curves.
4.  **Persistence**: `localStorage` is used in `src/app/queries` to save query history (`pulse_geoint_history_v2`).

**Note**: There is NO backend API integration. All logic runs client-side.

## Directory Structure

### Root
-   `datasets/`, `models/`, `notebooks/`: Data Science & ML artifacts (Python ecosystem).
-   `src/`: Main Next.js application.

### `src/` Layout
-   `app/`: App Router pages.
    -   `page.tsx`: **Home Dashboard** (Heatmap, Threat Gauge, Velocity).
    -   `policy-sim/`: **Policy Simulator** (uses Intelligence Engine).
    -   `war-room/`: **War Room** (Influencer Graph, Sheng Decoder).
    -   `queries/`: **[NEW] Geointel Interface** (Map, Query Builder, Tweet Stream).
    -   `reports/`: **Report Generator**.
-   `components/`: Reusable UI modules by feature.
    -   `dashboard/`: Home widgets.
    -   `queries/`: Geointel components (`GeoIntMap`, `QueryBuilder`, etc.).
    -   `policy/`, `war-room/`: Feature-specific components.
    -   `ui/`: Shared primitives (Radix UI wrappers).
    -   `layout/`: `Sidebar`, `Header`.
-   `lib/`: Core Logic & Data.
    -   `intelligence-engine.ts`: **Core Simulation Logic** (Risk calculation, Twin Event matching).
    -   `suggestion-agent.ts`: Helper for generating strategic recommendations.
    -   `mockData.ts`: Static data for Dashboard/War Room.
    -   `mock-queries.ts`: Static data for Geointel.

## Key Features

1.  **Dashboard**: Real-time monitoring of "Civil Unrest Probability" and "Viral Velocity".
2.  **War Room**: Network graph of influencer relationships and "Sheng Decoder" for slang sentiment analysis.
3.  **Policy Simulator**:
    -   Users input natural language queries (e.g., "Impact of increasing mock tax").
    -   `ReasoningWorkflow` processes this to generate a "Strategic Brief" with risk curves and recommendations.
4.  **Geointel (Queries)**:
    -   Interactive map showing tweet clusters.
    -   Boolean query builder (Category, User, Hashtag, Text).
    -   Thematic summary of filtered results.
