// lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomainFromUrl(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    return url.hostname.replace(/^www\./, '');
  } catch (error) {
    return null;
  }
}