import { BlogData } from '@/types/blog';

export const blogData: BlogData = {
  posts: [
    {
      slug: 'the-rise-of-generative-engine-optimization',
      title: 'The Rise of Generative Engine Optimization',
      excerpt:
        'AI-referred sessions jumped from 17,000 to over 107,000 in just five months. Traditional SEO built the map — GEO reads it differently. Learn how the RAG pipeline decides what gets cited and what gets skipped.',
      coverImage:
        'https://storage.googleapis.com/brank-blogs/cover-image/From_Search_Rankings_to_AI_Citations.png',
      contentPath: 'content/blog/the-rise-of-generative-engine-optimization.md',
      author: {
        name: 'Brank Team',
        avatar: '/images/brank-logo.svg',
      },
      publishedAt: '2025-06-15',
      tags: ['GEO', 'AI Search', 'SEO', 'LLMs'],
      readingTime: 6,
      featured: true,
    },
  ],
};
