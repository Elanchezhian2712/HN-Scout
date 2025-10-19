// app/item/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ItemLoading() {
  return (
    <Card className="border-slate-700 bg-slate-900/50">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}