// components/NoSsr.tsx

'use client';

import { useState, useEffect, ReactNode } from 'react';

export const NoSsr = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true) }, []);
  if (!isMounted) return null;
  return <>{children}</>;
};