import { BlogData } from '@/types/blog';

export const blogData: BlogData = {
  posts: [
    {
      slug: 'how-ai-recommends-your-brand',
      title: 'How AI Recommends Your Brand — And Why It Matters',
      excerpt:
        'AI models like ChatGPT and Gemini are becoming the new search engines. Here is how they decide which brands to recommend and what you can do about it.',
      coverImage: '/images/blog/covers/ai-recommends.jpg',
      contentPath: 'content/blog/how-ai-recommends-your-brand.md',
      author: {
        name: 'Brank Team',
        avatar: '/images/brank-logo.svg',
      },
      publishedAt: '2026-02-15',
      tags: ['AI', 'Brand Visibility', 'LLMs'],
      readingTime: 6,
      featured: true,
    },
    {
      slug: 'optimizing-brand-presence-in-llms',
      title: 'A Guide to Optimizing Your Brand Presence in LLMs',
      excerpt:
        'Learn the strategies and techniques to ensure your brand gets recommended by AI assistants like ChatGPT, Gemini, and Claude.',
      coverImage: '/images/blog/covers/optimize-llm.jpg',
      contentPath: 'content/blog/optimizing-brand-presence-in-llms.md',
      author: {
        name: 'Brank Team',
        avatar: '/images/brank-logo.svg',
      },
      publishedAt: '2026-02-10',
      tags: ['Strategy', 'LLMs', 'Optimization'],
      readingTime: 8,
    },
    {
      slug: 'the-rise-of-ai-search',
      title: 'The Rise of AI Search: What It Means for Brands',
      excerpt:
        'Traditional SEO is evolving. As users shift to AI-powered search, brands need new strategies to stay visible and relevant.',
      coverImage: '/images/blog/covers/ai-search.jpg',
      contentPath: 'content/blog/the-rise-of-ai-search.md',
      author: {
        name: 'Brank Team',
        avatar: '/images/brank-logo.svg',
      },
      publishedAt: '2026-02-05',
      tags: ['AI Search', 'SEO', 'Trends'],
      readingTime: 5,
    },
  ],
};
