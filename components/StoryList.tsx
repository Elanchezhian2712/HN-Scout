// components/StoryList.tsx

'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { HnHit } from '@/lib/api';
import { fetchAndScoreStories } from '@/app/actions';
import { StoryItem } from './StoryItem';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

interface StoryListProps {
  initialStories: HnHit[];
}

function StoryItemSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 p-4">
      <Skeleton className="h-5 w-8 rounded-md row-span-2" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-10 w-32 rounded-md row-span-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function StoryList({ initialStories }: StoryListProps) {
  const [stories, setStories] = useState(initialStories);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500); 

  const { ref, inView } = useInView({ threshold: 0.5 });

  const loadMoreStories = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newStories = await fetchAndScoreStories(page, debouncedFilter);
    if (newStories.length > 0) {
      setStories(prev => [...prev, ...newStories]);
      setPage(prev => prev + 1);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (inView) {
      loadMoreStories();
    }
  }, [inView]);

  useEffect(() => {
    const applyFilter = async () => {
      setIsLoading(true);
      setStories([]);
      setPage(1);
      setHasMore(true);
      const newStories = await fetchAndScoreStories(0, debouncedFilter);
      setStories(newStories);
      if (newStories.length < 20) {
        setHasMore(false);
      }
      setIsLoading(false);
    }
    applyFilter();
  }, [debouncedFilter]);

  return (
    <div>
      <div className="mb-4">
        <Input 
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by domain (e.g., github.com)..."
          className="bg-slate-800 border-slate-700"
        />
      </div>
      <div className="divide-y divide-slate-800">
        {stories.map((story, i) => (
          <StoryItem key={`${story.objectID}-${i}`} story={story} index={i + 1} />
        ))}
      </div>
      
      {isLoading && [...Array(3)].map((_, i) => <StoryItemSkeleton key={i} />)}
      {hasMore && !isLoading && <div ref={ref} className="h-10" />}

      {!hasMore && !isLoading && stories.length > 0 && (
        <p className="text-center text-slate-400 py-8">You've reached the end.</p>
      )}
    </div>
  );
}