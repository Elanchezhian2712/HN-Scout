// lib/scoring.ts

import { HnHit } from './api';

export function calculateQualityScore(post: HnHit): number {
  const points = post.points || 1;
  const comments = post.num_comments || 0;
  const createdAt = post.created_at_i * 1000;
  const hoursAgo = (Date.now() - createdAt) / (1000 * 60 * 60);

  const prominence = points + (comments * 2);
  const gravity = 1.8;

  const score = prominence / Math.pow(hoursAgo + 2, gravity);
  
  return Math.round(score);
}