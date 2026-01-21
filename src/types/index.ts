// Common types used across the application

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Analytics types
export interface LLMComparison {
  llm: string;
  value: number;
  icon: string;
}

export interface LLMSource {
  url: string;
  count: number;
}

export interface CitationLLM {
  name: string;
  icon: string;
  total: number;
  subtitle: string;
  sources: LLMSource[];
}

export interface BrandRank {
  name: string;
  rank: number;
  isUser?: boolean;
}

export interface LLMRank {
  name: string;
  icon: string;
  rank: number;
}

export interface MetricData {
  totalMentions: number;
  totalCitations: number;
  avgSentiment: number;
  avgRanking: number;
}

export interface ComparisonData {
  insight: string;
  comparisons: LLMComparison[];
}

export interface CitationData {
  insight: string;
  llms: CitationLLM[];
}

export interface RankingData {
  insight: string;
  amongBrands: {
    title: string;
    subtitle: string;
    brands: BrandRank[];
  };
  byLLMs: {
    title: string;
    subtitle: string;
    llms: LLMRank[];
  };
}

export interface AnalyticsData {
  brand: string;
  metrics: MetricData;
  mentionsRate: ComparisonData;
  sentimentScore: ComparisonData;
  citations: CitationData;
  rankings: RankingData;
}

// Component prop types for analytics
export interface MetricCardProps {
  label: string;
  value: number | string;
  info?: string;
  className?: string;
}

export interface ComparisonCardProps {
  title: string;
  comparisons: LLMComparison[];
  insight: string;
  tooltip?: string;
  className?: string;
}

export interface CitationCardProps {
  llm: CitationLLM;
  className?: string;
}

export interface RankingCardProps {
  title: string;
  subtitle?: string;
  items: (BrandRank | LLMRank)[];
  type: 'brand' | 'llm';
  className?: string;
}