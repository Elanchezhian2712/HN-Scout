// components/StoryItem.tsx

'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HnHit } from "@/lib/api";
import { getDomainFromUrl } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Star, ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { NoSsr } from "./NoSsr";

interface StoryItemProps {
  story: HnHit;
  index: number;
}

export function StoryItem({ story, index }: StoryItemProps) {
  const domain = getDomainFromUrl(story.url);
  const timeAgo = formatDistanceToNow(new Date(story.created_at_i * 1000), { addSuffix: true });

  const [readingList, setReadingList] = useLocalStorage<HnHit[]>('readingList', []);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(readingList.some(item => item.objectID === story.objectID));
  }, [readingList, story.objectID]);

  const handleToggleSave = () => {
    setReadingList(prevList => 
      isSaved
        ? prevList.filter(item => item.objectID !== story.objectID)
        : [...prevList, story]
    );
  };

  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 p-4 transition-colors hover:bg-slate-800/50">
      <div className="text-center text-sm text-slate-400 row-span-2">{index}</div>
      <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-slate-50 text-base md:text-lg hover:underline">
        {story.title}
        {domain && <span className="text-slate-400 text-sm ml-2">({domain}) <ArrowUpRight className="inline h-3 w-3" /></span>}
      </a>
      <div className="flex items-center gap-1 row-span-2">
        <Badge variant="secondary" className="text-base h-fit w-20 justify-center py-1">
          {story.qualityScore}
        </Badge>
        <NoSsr>
          <Button variant="ghost" size="icon" onClick={handleToggleSave} aria-label={isSaved ? "Remove from reading list" : "Save to reading list"}>
            {isSaved ? <BookmarkCheck className="h-5 w-5 text-green-400" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </NoSsr>
      </div>
      <div className="text-slate-400 text-sm flex items-center gap-4 flex-wrap">
        <span>by {story.author}</span>
        <span suppressHydrationWarning>{timeAgo}</span>
        <Link href={`/item/${story.objectID}`} className="hover:underline flex items-center gap-1.5 transition-colors hover:text-slate-50">
          <MessageSquare className="h-3.5 w-3.5" /> {story.num_comments || 0}
        </Link>
        <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {story.points || 0}</span>
      </div>
    </article>
  );
}