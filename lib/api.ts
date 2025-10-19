// lib/api.ts

export interface HnHit {
  objectID: string;
  title: string;
  url: string;
  points: number;
  author: string;
  created_at_i: number;
  num_comments: number;
  qualityScore?: number;
}

export interface HnItem extends HnHit {
  id: number;
  children: Array<{
    id: number;
    author: string | null;
    text: string | null;
    created_at_i: number;
  }>;
}

const API_BASE = "https://hn.algolia.com/api/v1";

export async function fetchStories(page: number, query?: string): Promise<{ hits: HnHit[], nbPages: number }> {
  try {
    const params = new URLSearchParams({
      tags: 'story',
      page: page.toString(),
      hitsPerPage: '20',
    });
    
    const endpoint = query ? 'search' : 'search_by_date';
    if (query) {
      params.set('query', query);
    }

    const res = await fetch(`${API_BASE}/${endpoint}?${params.toString()}`, { next: { revalidate: 300 } });
    
    if (!res.ok) throw new Error("Failed to fetch stories");
    
    return res.json();
  } catch (error) {
    console.error("API Error in fetchStories:", error);
    return { hits: [], nbPages: 0 };
  }
}

export async function fetchItem(id: string): Promise<HnItem | null> {
  try {
    const res = await fetch(`${API_BASE}/items/${id}`, { next: { revalidate: 300 } });
    
    if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
    return res.json();
  } catch (error)
  {
    console.error("API Error in fetchItem:", error);
    return null;
  }
}