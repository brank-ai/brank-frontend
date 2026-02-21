import fs from 'fs';
import path from 'path';
import { blogData } from '@/constants/blogData';
import { BlogPost } from '@/types/blog';

export function getAllPosts(): BlogPost[] {
  return [...blogData.posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogData.posts.find((post) => post.slug === slug);
}

export function getPostContent(contentPath: string): string {
  const fullPath = path.join(process.cwd(), contentPath);
  return fs.readFileSync(fullPath, 'utf-8');
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogData.posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
