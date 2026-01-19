// Backend API response types

export interface CitationSource {
  url: string;
  percentage: number;
}

export interface CitationOverview {
  chatgpt?: CitationSource[];
  gemini?: CitationSource[];
  grok?: CitationSource[];
  perplexity?: CitationSource[];
}

export interface MentionRateByLLM {
  chatgpt?: number;
  gemini?: number;
  grok?: number;
  perplexity?: number;
  [key: string]: number | undefined;
}

export interface SentimentScoreByLLM {
  chatgpt?: number;
  gemini?: number;
  grok?: number;
  perplexity?: number;
  [key: string]: number | undefined;
}

export interface RankByLLMs {
  chatgpt?: number;
  gemini?: number;
  grok?: number;
  perplexity?: number;
  [key: string]: number | undefined;
}

export interface CitationsByLLM {
  chatgpt?: number;
  gemini?: number;
  grok?: number;
  perplexity?: number;
  [key: string]: number | undefined;
}

export interface BrandRanking {
  brand: string;
  rank: number;
}

export interface RankingOverview {
  currentBrand: {
    brand: string;
    rank: number;
  };
  topBrands: BrandRanking[];
}

export interface BackendMetricResponse {
  averageMentionRate: number;
  averageRanking: number;
  averageSentiment: number;
  brand_id: string;
  cached: boolean;
  citationOverview?: CitationOverview;
  citations: number;
  citationsByLLM?: CitationsByLLM;
  computed_at: string;
  mentionRateByLLM?: MentionRateByLLM;
  sentimentScoreByLLM?: SentimentScoreByLLM;
  rankByLLMs?: RankByLLMs;
  rankingOverview?: RankingOverview;
  website: string;
}

export interface LandingPageResponse {
  asics: number;
  coinbase: number;
  'cult.fit': number;
  decathlon: number;
  leetcode: number;
  nothing: number;
  zerodha: number;
}

