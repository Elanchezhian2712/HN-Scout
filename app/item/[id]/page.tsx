// app/item/[id]/page.tsx
import { fetchItem } from "@/lib/api";
import { getDomainFromUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, MessageSquare, Star, User, Clock, Link as LinkIcon } from "lucide-react";

function Comment({ comment }: { comment: any }) {
    if (!comment || !comment.author || !comment.text) return null;
    const timeAgo = formatDistanceToNow(new Date(comment.created_at_i * 1000), { addSuffix: true });
    return (
      <div className="py-4 border-t border-slate-800">
        <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
          <User className="h-4 w-4" /> 
          <span>{comment.author}</span>
          <span>•</span>
          <span suppressHydrationWarning>{timeAgo}</span>
        </div>
        <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: comment.text }} />
      </div>
    );
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await fetchItem(id);

  if (!item) notFound();

  const timeAgo = formatDistanceToNow(new Date(item.created_at_i * 1000), { addSuffix: true });
  const latestComments = item.children?.filter(c => c.text && c.author).slice(-5).reverse() ?? [];
  const domain = item.url ? getDomainFromUrl(item.url) : null;

  return (
    <div className="space-y-8">
        <Card className="border-slate-700 bg-slate-900/50">
            <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-50">{item.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-slate-400">
                    <span className="flex items-center gap-1.5"><Star className="h-4 w-4" /> {item.points || 0} points</span>
                    <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> by {item.author}</span>
                    <span className="flex items-center gap-1.5" suppressHydrationWarning><Clock className="h-4 w-4" /> {timeAgo}</span>
                    {domain && <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-50 transition-colors"><LinkIcon className="h-4 w-4" /> {domain}</a>}
                </CardDescription>
                <div className="pt-4 flex items-center gap-3">
                    {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer"><Button variant="secondary"><ExternalLink className="mr-2 h-4 w-4" /> Read Article</Button></a>}
                    <a href={`https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer"><Button variant="outline">View on HN</Button></a>
                </div>
            </CardHeader>
        </Card>
        <Card className="border-slate-700 bg-slate-900/50">
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6" /> Latest Comments</CardTitle></CardHeader>
            <CardContent>
                {latestComments.length > 0 ? <div className="-mt-4">{latestComments.map(comment => <Comment key={comment.id} comment={comment} />)}</div> : <p className="text-slate-400">No comments to display.</p>}
            </CardContent>
        </Card>
    </div>
  );
}