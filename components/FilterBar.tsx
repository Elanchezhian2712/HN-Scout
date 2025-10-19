'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialDomain = searchParams.get('domain') || '';
  const [filter, setFilter] = useState(initialDomain);
  const [debouncedFilter] = useDebounce(filter, 500);

  useEffect(() => {
    if (debouncedFilter === initialDomain) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedFilter) {
      params.set('domain', debouncedFilter);
    } else {
      params.delete('domain');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
    
  }, [debouncedFilter, router, searchParams, initialDomain]);

  return (
    <div className="pt-4" suppressHydrationWarning>
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by domain (e.g., github.com)..."
        className="bg-slate-800 border-slate-700"
      />
    </div>
  );
}