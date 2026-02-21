import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all standard search crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/progress'],
      },

      // === OpenAI ===
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },

      // === Google ===
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },

      // === Anthropic ===
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'claude-web',
        allow: '/',
      },

      // === Perplexity ===
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },

      // === Apple Intelligence ===
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },

      // === Meta AI ===
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalFetcher',
        allow: '/',
      },

      // === Microsoft / Bing ===
      {
        userAgent: 'bingbot',
        allow: '/',
      },

      // === Amazon ===
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },

      // === ByteDance / TikTok ===
      {
        userAgent: 'Bytespider',
        allow: '/',
      },

      // === Common Crawl (LLM training data source) ===
      {
        userAgent: 'CCBot',
        allow: '/',
      },

      // === Cohere AI ===
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },

      // === You.com ===
      {
        userAgent: 'YouBot',
        allow: '/',
      },

      // === Diffbot (AI knowledge graph) ===
      {
        userAgent: 'Diffbot',
        allow: '/',
      },

      // === Huawei Petal Search ===
      {
        userAgent: 'PetalBot',
        allow: '/',
      },

      // === AI Search Engines ===
      {
        userAgent: 'PhindBot',
        allow: '/',
      },
      {
        userAgent: 'ImagesiftBot',
        allow: '/',
      },
      {
        userAgent: 'webzio-extended',
        allow: '/',
      },
    ],
    sitemap: 'https://www.brank.ai/sitemap.xml',
  };
}
