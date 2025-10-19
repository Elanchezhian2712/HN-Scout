// app/reading-list/page.tsx
'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HnHit } from '@/lib/api';
import { StoryItem } from '@/components/StoryItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NoSsr } from '@/components/NoSsr';

export default function ReadingListPage() {
  const [readingList] = useLocalStorage<HnHit[]>('readingList', []);

  return (
    <Card className="border-slate-700 bg-slate-900/50">
      <CardHeader>
        <CardTitle>Reading List</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <NoSsr>
          {readingList.length > 0 ? (
            <div className="divide-y divide-slate-800">
              {readingList.map((story, i) => (
                <StoryItem key={story.objectID} story={story} index={i + 1} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              Your reading list is empty. Save stories to see them here.
            </div>
          )}
        </NoSsr>
      </CardContent>
    </Card>
  );
}