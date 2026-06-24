import type { CollectionEntry } from 'astro:content';

function countWords(text: string): number {
  const cleaned = text
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim();
  return cleaned ? cleaned.split(/\s+/).filter(Boolean).length : 0;
}

export function getPostWordCount(post: CollectionEntry<'blog'>): number {
  return countWords(post.body ?? '');
}

export function getTotalWordCount(posts: CollectionEntry<'blog'>[]): number {
  return posts.reduce((sum, p) => sum + getPostWordCount(p), 0);
}

export function formatWordCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(0)}K` : `${count}`;
}
