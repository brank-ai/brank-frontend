export const mockAnalyticsData = {
  brand: 'Flint',
  metrics: {
    totalMentions: 32,
    totalCitations: 115,
    avgSentiment: 21,
    avgRanking: 17,
  },
  mentionsRate: {
    insight: 'Some copy to come here which gives the user brief and insight into the mentions his brand is getting.',
    comparisons: [
      { llm: 'ChatGPT', value: 92, icon: '/images/LLMs/chatgpt.svg' },
      { llm: 'Gemini', value: 92, icon: '/images/LLMs/gemini.svg' },
      { llm: 'Claude', value: 92, icon: '/images/LLMs/claude.svg' },
      { llm: 'Grok', value: 92, icon: '/images/LLMs/grok.svg' },
      { llm: 'Deepseek', value: 92, icon: '/images/LLMs/deepseek.svg' },
      { llm: 'Perplexity', value: 92, icon: '/images/LLMs/perplexity.svg' },
    ],
  },
  sentimentScore: {
    insight: 'Some copy to come here which gives the user brief and insight into the mentions his brand is getting.',
    comparisons: [
      { llm: 'ChatGPT', value: 32, icon: '/images/LLMs/chatgpt.svg' },
      { llm: 'Gemini', value: 1, icon: '/images/LLMs/gemini.svg' },
      { llm: 'Claude', value: 12, icon: '/images/LLMs/claude.svg' },
      { llm: 'Grok', value: 54, icon: '/images/LLMs/grok.svg' },
      { llm: 'Deepseek', value: 23, icon: '/images/LLMs/deepseek.svg' },
      { llm: 'Perplexity', value: 0, icon: '/images/LLMs/perplexity.svg' },
    ],
  },
  citations: {
    insight: 'Some copy to come here which gives the user brief and insight into the mentions his brand is getting.',
    llms: [
      {
        name: 'ChatGPT',
        icon: '/images/LLMs/chatgpt.svg',
        total: 169,
        subtitle: 'Showing top sources by relevance',
        sources: [
          { url: 'reddit.com', count: 32 },
          { url: 'twitter.com', count: 1 },
          { url: 'hackernews.come', count: 12 },
          { url: 'arXiv.com', count: 54 },
        ],
      },
      {
        name: 'Gemini',
        icon: '/images/LLMs/gemini.svg',
        total: 169,
        subtitle: 'Showing top sources by relevance',
        sources: [
          { url: 'reddit.com', count: 32 },
          { url: 'twitter.com', count: 1 },
          { url: 'hackernews.come', count: 12 },
          { url: 'arXiv.com', count: 54 },
        ],
      },
      {
        name: 'Grok',
        icon: '/images/LLMs/grok.svg',
        total: 169,
        subtitle: 'Showing top sources by relevance',
        sources: [
          { url: 'reddit.com', count: 32 },
          { url: 'twitter.com', count: 1 },
          { url: 'hackernews.come', count: 12 },
          { url: 'arXiv.com', count: 54 },
        ],
      },
      {
        name: 'Deepseek',
        icon: '/images/LLMs/deepseek.svg',
        total: 169,
        subtitle: 'Showing top sources by relevance',
        sources: [
          { url: 'reddit.com', count: 32 },
          { url: 'twitter.com', count: 1 },
          { url: 'hackernews.come', count: 12 },
          { url: 'arXiv.com', count: 54 },
        ],
      },
    ],
  },
  rankings: {
    insight: 'Some copy to come here which gives the user brief and insight into the mentions his brand is getting.',
    amongBrands: {
      title: 'Rank Among Brands',
      subtitle: 'Ranking other brands by relevance',
      brands: [
        { name: 'www.brand#1.com', rank: 32 },
        { name: 'www.brand#1.com', rank: 1 },
        { name: 'www.brand#1.com', rank: 12 },
        { name: 'www.brand#1.com', rank: 12 },
        { name: 'YOU', rank: 297, isUser: true },
      ],
    },
    byLLMs: {
      title: 'Rank by LLMs',
      subtitle: '',
      llms: [
        { name: 'ChatGPT', icon: '/images/LLMs/chatgpt.svg', rank: 1 },
        { name: 'Gemini', icon: '/images/LLMs/gemini.svg', rank: 2 },
        { name: 'Claude', icon: '/images/LLMs/claude.svg', rank: 3 },
        { name: 'Grok', icon: '/images/LLMs/grok.svg', rank: 4 },
        { name: 'Deepseek', icon: '/images/LLMs/deepseek.svg', rank: 5 },
        { name: 'Perplexity', icon: '/images/LLMs/perplexity.svg', rank: 6 },
      ],
    },
  },
};

