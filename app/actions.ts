// app/actions.ts
'use server';

import { HnHit, fetchStories } from "@/lib/api";
import { calculateQualityScore } from "@/lib/scoring";

const API_BASE = "https://hn.algolia.com/api/v1";

export async function fetchAndScoreStories(page: number, query?: string): Promise<HnHit[]> {
    try {
        let url = `${API_BASE}/search_by_date?tags=story&page=${page}&hitsPerPage=20`;
        if (query) {
            url = `${API_BASE}/search?tags=story&page=${page}&hitsPerPage=20&query=${encodeURIComponent(query)}`;
        }

        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error("Failed to fetch stories");
        
        const data = await res.json();
        const hits: HnHit[] = data.hits || [];

        return hits
            .map(hit => ({ ...hit, qualityScore: calculateQualityScore(hit) }))
            .sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));

    } catch (error) {
        console.error("Server Action Error:", error);
        return [];
    }
}