// components/Pagination.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jumpToPage, setJumpToPage] = useState('');

  useEffect(() => {
    setJumpToPage('');
  }, [currentPage]);

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `/?${params.toString()}`;
  };

  const handleJump = (e: FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage, 10);
    if (pageNum > 0 && pageNum <= totalPages) {
      router.push(createPageURL(pageNum));
    }
  };

  return (
   <nav className="flex items-center justify-center gap-4 p-4 flex-wrap" suppressHydrationWarning>
      <Button variant="outline" size="icon" onClick={() => router.push(createPageURL(currentPage - 1))} disabled={currentPage <= 1} suppressHydrationWarning>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm text-slate-400">Page {currentPage} of {totalPages}</span>
      
      <Button variant="outline" size="icon" onClick={() => router.push(createPageURL(currentPage + 1))} disabled={currentPage >= totalPages} suppressHydrationWarning>
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <form onSubmit={handleJump} className="flex items-center gap-2 ml-4">
        <Input type="number" min="1" max={totalPages} value={jumpToPage} onChange={(e) => setJumpToPage(e.target.value)} placeholder="Jump..." className="w-20 h-9" suppressHydrationWarning />
        <Button type="submit" variant="secondary" size="sm" suppressHydrationWarning>Go</Button>
      </form>
    </nav>
  );
}