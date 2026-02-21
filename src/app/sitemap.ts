import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.brank.ai/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://www.brank.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.brank.ai/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.brank.ai/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
    // Upcoming pages — uncomment when live
    // {
    //   url: 'https://www.brank.ai/terms',
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.3,
    // },
    // {
    //   url: 'https://www.brank.ai/about-us',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ];
}
