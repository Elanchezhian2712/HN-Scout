// app/page.tsx

import { notFound } from 'next/navigation';
import { fetchStories, HnHit } from '@/lib/api';
import { calculateQualityScore } from '@/lib/scoring';
import { StoryItem } from '@/components/StoryItem';
import { Pagination } from '@/components/Pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterBar } from '@/components/FilterBar';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;

  const page =
    typeof resolved?.page === 'string' ? parseInt(resolved.page, 10) : 1;
  const domain =
    typeof resolved?.domain === 'string' ? resolved.domain : '';

  if (isNaN(page) || page < 1) notFound();

  const { hits, nbPages } = await fetchStories(page - 1, domain);

  if (!hits.length && page > 1) notFound();

  const scoredAndSortedHits: HnHit[] = hits
    .map((hit) => ({
      ...hit,
      qualityScore: calculateQualityScore(hit),
    }))
    .sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));

  return (
    <Card className="border-slate-700 bg-slate-900/50">
      <CardHeader>
        <CardTitle>Top Stories {domain && `from ${domain}`}</CardTitle>
        <FilterBar />
      </CardHeader>
      <CardContent className="p-0">
        {scoredAndSortedHits.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {scoredAndSortedHits.map((story, i) => (
              <StoryItem
                key={story.objectID}
                story={story}
                index={(page - 1) * 20 + i + 1}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            No stories found {domain && `for "${domain}"`}.
          </div>
        )}
      </CardContent>

      {nbPages > 1 && <Pagination currentPage={page} totalPages={nbPages} />}
    </Card>
  );
}