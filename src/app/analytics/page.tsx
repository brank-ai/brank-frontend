import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MetricCard } from '@/components/ui/MetricCard';
import { Reveal, Tooltip } from '@/components/ui';
import { ComparisonCard } from '@/components/analytics/ComparisonCard';
import { CitationCard } from '@/components/analytics/CitationCard';
import { getMetrics } from '@/lib/backend';
import { BackendMetricResponse } from '@/types/backend';
import { LLMComparison, CitationLLM } from '@/types';
import { cn } from '@/lib/utils';

// LLM metadata for icons and display names
const LLM_METADATA: Record<string, { name: string; icon: string }> = {
  chatgpt: { name: 'ChatGPT', icon: '/images/LLMs/chatgpt.svg' },
  gemini: { name: 'Gemini', icon: '/images/LLMs/gemini.svg' },
  grok: { name: 'Grok', icon: '/images/LLMs/grok.svg' },
  perplexity: { name: 'Perplexity', icon: '/images/LLMs/perplexity.svg' },
};

// Helper to convert backend LLM map to comparison array
function mapLLMDataToComparisons(
  llmData: Record<string, number | undefined> | undefined,
  isPercentage: boolean = false
): LLMComparison[] {
  // Handle case where backend doesn't return this field
  if (!llmData) {
    return Object.entries(LLM_METADATA).map(([, meta]) => ({
      llm: meta.name,
      icon: meta.icon,
      value: 0,
    }));
  }
  
  return Object.entries(LLM_METADATA).map(([key, meta]) => ({
    llm: meta.name,
    icon: meta.icon,
    value: isPercentage 
      ? Math.round((llmData[key] || 0) * 100) 
      : Math.round(llmData[key] || 0),
  }));
}

// Helper to convert backend citation data to CitationLLM format
function mapCitationData(
  citationOverview: BackendMetricResponse['citationOverview'] | undefined
): CitationLLM[] {
  if (!citationOverview) {
    return Object.entries(LLM_METADATA).map(([, meta]) => ({
      name: meta.name,
      icon: meta.icon,
      total: 0,
      subtitle: 'Showing top sources by relevance',
      sources: [],
    }));
  }
  
  return Object.entries(LLM_METADATA).map(([key, meta]) => {
    const sources = citationOverview[key as keyof typeof citationOverview] || [];
    return {
      name: meta.name,
      icon: meta.icon,
      total: sources.reduce((sum, s) => sum + s.percentage, 0),
      subtitle: 'Showing top sources by relevance',
      sources: sources.map(s => ({
        url: s.url,
        count: s.percentage, // Will display as percentage in UI
      })),
    };
  });
}

// Helper to convert rankByLLMs to array format
function mapRankingData(
  rankByLLMs: BackendMetricResponse['rankByLLMs'] | undefined
): Array<{ name: string; icon: string; rank: number }> {
  if (!rankByLLMs) {
    return Object.entries(LLM_METADATA).map(([, meta]) => ({
      name: meta.name,
      icon: meta.icon,
      rank: 0,
    }));
  }
  
  return Object.entries(LLM_METADATA).map(([key, meta]) => ({
    name: meta.name,
    icon: meta.icon,
    rank: rankByLLMs[key as keyof typeof rankByLLMs] || 0,
  }));
}

// Helper functions for dynamic AI insights
function getMentionsInsight(
  mentionRate: number, 
  brandName: string,
  topCitedSources: string[]
): string {
  const sourcesText = topCitedSources.length > 0 
    ? `${topCitedSources.slice(0, 2).join(' and ')}`
    : 'sources in Citation Overview';
  
  if (mentionRate >= 90) {
    return `Excellent visibility! Maintain by:\n1. Using Brank's engine to parse video content for LLM readability\n2. Strengthening presence on ${sourcesText}`;
  } else if (mentionRate >= 60) {
    return `Good visibility with growth potential. Actions:\n1. Use Brank's workflows to automate content creation\n2. Get featured on ${sourcesText} (see Citation Overview)`;
  } else if (mentionRate >= 30) {
    return `Needs improvement. Priorities:\n1. Run Brank's audit to optimize your website for LLM crawling\n2. Target ${sourcesText} shown in Citation Overview`;
  } else {
    return `Low visibility—act now. Steps:\n1. Run Brank's audit to make your website LLM-friendly\n2. Use Brank's workflows to create comprehensive content`;
  }
}

function getSentimentInsight(
  sentimentScore: number, 
  brandName: string,
  topCitedSources: string[]
): string {
  const sourcesText = topCitedSources.length > 0
    ? `${topCitedSources.slice(0, 2).join(' and ')}`
    : 'sources in Citation Overview';
  
  if (sentimentScore >= 80) {
    return `Strong positive sentiment! Maintain by:\n1. Using Brank's workflows to publish customer success stories\n2. Monitoring reputation on ${sourcesText}`;
  } else if (sentimentScore >= 60) {
    return `Moderate sentiment—room to improve. Actions:\n1. Use Brank's deeper analysis to identify root causes of negative sentiment\n2. Address issues on ${sourcesText}`;
  } else if (sentimentScore >= 40) {
    return `Mixed signals detected. Priorities:\n1. Run Brank's deeper analysis to source root causes of negative sentiment\n2. Fix issues on ${sourcesText} (Citation Overview)`;
  } else {
    return `Sentiment needs urgent attention. Steps:\n1. Use Brank's deeper analysis to identify negative sentiment drivers\n2. Launch PR campaigns addressing root issues`;
  }
}

function getRankingInsight(
  avgRank: number, 
  brandName: string,
  topCitedSources: string[]
): string {
  const sourcesText = topCitedSources.length > 0
    ? `${topCitedSources.slice(0, 2).join(' and ')}`
    : 'key sources';
  
  if (avgRank <= 2) {
    return `Top-tier ranking! Defend by:\n1. Using Brank's engine to parse video content and expand LLM-readable formats\n2. Monitoring competitors on ${sourcesText}`;
  } else if (avgRank <= 5) {
    return `Good ranking with upside. Climb higher by:\n1. Using Brank's workflows to create targeted use-case content\n2. Strengthening presence on ${sourcesText} (Citation Overview)`;
  } else if (avgRank <= 10) {
    return `Ranking needs work. Actions:\n1. Use Brank's workflows to automate comparison content creation\n2. Get featured on ${sourcesText} (see Citation Overview)`;
  } else {
    return `Low ranking—strategic focus needed. Steps:\n1. Use Brank's audit to optimize website structure\n2. Target ${sourcesText} (Citation Overview) for citations`;
  }
}

function getCitationInsight(
  totalCitations: number,
  topSources: Array<{url: string, count: number}>,
  brandName: string
): string {
  const hasHighAuthoritySources = topSources.some(source => 
    ['wikipedia', 'forbes', 'techcrunch', 'nytimes', 'wsj', 'g2', 'capterra', 'trustpilot']
      .some(auth => source.url.toLowerCase().includes(auth))
  );
  
  const topSourcesList = topSources.slice(0, 2).map(s => {
    try {
      const url = new URL(s.url.startsWith('http') ? s.url : `https://${s.url}`);
      return url.hostname.replace('www.', '');
    } catch {
      return s.url;
    }
  }).join(' and ');
  
  if (totalCitations >= 50 && hasHighAuthoritySources) {
    return `Strong citations from trusted sources (${topSourcesList}). Next steps:\n1. Use Brank's engine to parse video content for broader LLM coverage\n2. Keep existing profiles updated`;
  } else if (totalCitations >= 25) {
    return `Moderate coverage. LLMs source from ${topSourcesList}. Actions:\n1. Use Brank's workflows to create content for tier-1 publications\n2. Update info on existing platforms`;
  } else if (totalCitations >= 10) {
    return `Limited citations. Currently on ${topSourcesList}. Priorities:\n1. Run Brank's audit to optimize website for citations\n2. Target similar authoritative platforms`;
  } else {
    return `Minimal citations—limits visibility. Actions:\n1. Use Brank's workflows to create content for authoritative publications\n2. Run Brank's audit to identify high-impact citation opportunities`;
  }
}

interface AnalyticsPageProps {
  searchParams?: {
    brand?: string;
  };
}

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const brandName = searchParams?.brand || 'Unknown Brand';
  
  let metricsData: BackendMetricResponse | null = null;
  let error: string | null = null;

  try {
    metricsData = await getMetrics(brandName);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load analytics';
    console.error('Analytics fetch error:', err);
  }

  // Error state
  if (error || !metricsData) {
    return (
      <div className="min-h-screen bg-bg-base">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 relative">
          <div className="text-center py-20">
            <h1 className="text-white text-3xl font-light mb-4">
              Couldn&apos;t load analytics
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              {error || 'Please try again later.'}
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-white text-black text-sm font-medium hover:opacity-90 transition-all duration-150 rounded-md"
            >
              Go Home
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Map backend data to UI format
  const mentionsRateComparisons = mapLLMDataToComparisons(metricsData.mentionRateByLLM, true);
  const sentimentScoreComparisons = mapLLMDataToComparisons(metricsData.sentimentScoreByLLM, false);
  const rankingLLMs = mapRankingData(metricsData.rankByLLMs);
  const citationLLMs = mapCitationData(metricsData.citationOverview);

  // Extract top cited sources across all LLMs
  const topCitedSources = citationLLMs
    .flatMap(llm => llm.sources)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(source => {
      // Extract domain name for readability
      try {
        const url = new URL(source.url.startsWith('http') ? source.url : `https://${source.url}`);
        return url.hostname.replace('www.', '');
      } catch {
        return source.url;
      }
    });

  // Generate dynamic insights based on actual metrics
  const mentionsInsight = getMentionsInsight(
    Math.round(metricsData.averageMentionRate * 100),
    brandName,
    topCitedSources
  );

  const sentimentInsight = getSentimentInsight(
    Math.round(metricsData.averageSentiment),
    brandName,
    topCitedSources
  );

  const rankingInsight = getRankingInsight(
    metricsData.averageRanking || 0,
    brandName,
    topCitedSources
  );

  const citationInsight = getCitationInsight(
    Math.round(metricsData.citations),
    citationLLMs.flatMap(llm => llm.sources).slice(0, 5),
    brandName
  );

  const shouldShowRankingProButton = (llmName: string) => {
    return llmName === 'Grok' || llmName === 'Perplexity';
  };

  // Determine ranking performance level
  const getRankingPerformanceLevel = (rank: number): { label: string; color: string } => {
    if (rank <= 2) {
      return { label: 'Excellent', color: 'text-green-500' };
    } else if (rank > 2 && rank < 5) {
      return { label: 'Fair', color: 'text-orange-400' };
    } else {
      return { label: 'Poor', color: 'text-red-500' };
    }
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-10 md:py-12 relative">
        {/* Page Header */}
        <Reveal variant="fadeIn" initiallyVisible duration={1.0}>
          <div className="mb-8 sm:mb-12">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 sm:mb-4">
              AEO Analytics -{' '}
              <span className="text-text-primary italic">
                {brandName}
              </span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg">
              Here&apos;s what we learnt about your brand.
            </p>
          </div>
        </Reveal>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
          <Reveal delay={0.1} duration={0.6}>
            <MetricCard
              label="Total Mentions"
              value={`${Math.round(metricsData.averageMentionRate * 100)}%`}
              info={`Out of 100 user prompts related to ${brandName}, AI models mention ${brandName} in 45 responses.`}
            />
          </Reveal>
          <Reveal delay={0.15} duration={0.6}>
            <MetricCard
              label="Total Citations"
              value={Math.round(metricsData.citations)}
              info={`The total number of external resources LLMs referenced when generating responses about ${brandName}.`}
            />
          </Reveal>
          <Reveal delay={0.2} duration={0.6}>
            <MetricCard
              label="Average Sentiment Score"
              value={`${Math.round(metricsData.averageSentiment)}%`}
              info={`The average sentiment score out of 100 across LLMs when users ask questions directly about ${brandName}.`}
            />
          </Reveal>
          <Reveal delay={0.25} duration={0.6}>
            <MetricCard
              label="Overall Ranking"
              value={metricsData.averageRanking ? metricsData.averageRanking.toFixed(1) : 'N/A'}
              info={`The average position of ${brandName} within its category across all LLMs.`}
            />
          </Reveal>
        </div>

        {/* Comparison Sections - Stacked Vertically */}
        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
          <Reveal delay={0.1} duration={0.6}>
            <ComparisonCard
              title="Mentions Rate"
              comparisons={mentionsRateComparisons}
              insight={mentionsInsight}
              tooltip={`The number of times each LLM recommends ${brandName} across 100 relevant user prompts.`}
            />
          </Reveal>
          <Reveal delay={0.15} duration={0.6}>
            <ComparisonCard
              title="Sentiment Score"
              comparisons={sentimentScoreComparisons}
              insight={sentimentInsight}
              tooltip={`Sentiment score for ${brandName} across individual LLMs.`}
            />
          </Reveal>
        </div>

        {/* Ranking Overview */}
        <Reveal delay={0.1} duration={0.6}>
          <div className="mb-10 sm:mb-16">
            <div className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle p-4 sm:p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                {/* Left Side: Title + AI Insight */}
                <div className="flex flex-col bg-bg-depressed -m-4 p-4 sm:-m-6 sm:p-6 md:-m-12 md:p-12 mr-0 md:pr-6 md:justify-between rounded-l-xl shadow-deep-field">
                  {/* Title with Info Icon */}
                  <div className="flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
                    <h3 className="text-text-primary text-lg sm:text-xl md:text-2xl font-normal">
                      Ranking Overview
                    </h3>
                    <Tooltip content={`The position of ${brandName} within its category for each LLM.`}>
                      <button
                        className="text-text-subtle hover:text-text-muted transition-all duration-150 active:scale-95"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>

                  {/* AI Insight with Gradient on Icon and Text */}
                  <div className="flex flex-col gap-3 md:mt-auto">
                    <div className="flex items-center gap-2">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.2799 4.52692C21.6647 3.48715 23.1353 3.48716 23.5201 4.52692L27.8543 16.2401C27.9753 16.567 28.233 16.8247 28.5599 16.9457L40.2731 21.2799C41.3128 21.6647 41.3128 23.1353 40.2731 23.5201L28.5599 27.8543C28.233 27.9753 27.9753 28.233 27.8543 28.5599L23.5201 40.2731C23.1353 41.3128 21.6647 41.3128 21.2799 40.2731L16.9457 28.5599C16.8247 28.233 16.567 27.9753 16.2401 27.8543L4.52692 23.5201C3.48715 23.1353 3.48716 21.6647 4.52692 21.2799L16.2401 16.9457C16.567 16.8247 16.8247 16.567 16.9457 16.2401L21.2799 4.52692Z" fill="#EAEAEA"/>
                          <path d="M34.777 5.29256C34.8625 5.06157 35.1892 5.06157 35.2747 5.29256L36.2375 7.89468C36.2644 7.96731 36.3217 8.02456 36.3943 8.05144L38.9964 9.01431C39.2274 9.09978 39.2274 9.42649 38.9964 9.51196L36.3943 10.4748C36.3217 10.5017 36.2644 10.559 36.2375 10.6316L35.2747 13.2337C35.1892 13.4647 34.8625 13.4647 34.777 13.2337L33.8141 10.6316C33.7873 10.559 33.73 10.5017 33.6574 10.4748L31.0553 9.51196C30.8243 9.42649 30.8243 9.09978 31.0553 9.01431L33.6574 8.05144C33.73 8.02456 33.7873 7.96731 33.8141 7.89468L34.777 5.29256Z" fill="#EAEAEA"/>
                        </svg>
                      </div>
                      {/* Text */}
                      <h4 className="text-xs font-medium uppercase tracking-wider text-white whitespace-nowrap">
                        AI INSIGHT
                      </h4>
                    </div>
                    <div className="text-text-muted text-sm leading-relaxed space-y-1">
                      {rankingInsight.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Rank by LLMs */}
                <div className="pl-0 md:pl-12">
                  {/* Rank Header */}
                  <div className="flex items-center gap-2 mb-6">
                    {/* Bar Chart Icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-text-subtle"
                    >
                      <path
                        d="M3 13h8v8H3v-8zm10-10h8v18h-8V3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-text-subtle text-xs uppercase tracking-wider">
                      RANK BY LLMs
                    </span>
                  </div>

                  {/* Rankings List - Enhanced Card Style */}
                  <div className="space-y-3">
                    {rankingLLMs.map((llm, index) => (
                      <Reveal key={index} delay={0.15 + index * 0.05} duration={0.5}>
                        <div className="
                          flex items-center justify-between
                          bg-bg-elevated
                          border border-subtle
                          rounded-xl
                          px-4 py-3
                          shadow-soft-tile-xs
                          hover:shadow-soft-tile-sm
                          transition-all duration-300
                        ">
                          <div className="flex items-center gap-3 min-w-0">
                            <Image
                              src={llm.icon}
                              alt={llm.name}
                              width={20}
                              height={20}
                              className="object-contain opacity-90 flex-shrink-0"
                            />
                            <span className="text-text-primary text-xs sm:text-sm uppercase tracking-wide truncate font-medium">
                              {llm.name}
                            </span>
                          </div>
                          {shouldShowRankingProButton(llm.name) ? (
                            <button className="
                              px-4 py-1.5
                              bg-bg-elevated
                              text-text-primary
                              text-xs font-medium
                              border border-subtle
                              rounded-lg
                              shadow-soft-tile-xs
                              hover:bg-bg-surface
                              hover:border-text-muted/20
                              active:scale-[0.98]
                              transition-all duration-300
                            ">
                              Pro
                            </button>
                          ) : llm.rank > 0 ? (
                            <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                              <span className="text-text-primary text-sm font-medium">
                                #{llm.rank.toFixed(1)}
                              </span>
                              <span className={cn(
                                'flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide',
                                getRankingPerformanceLevel(llm.rank).color,
                                getRankingPerformanceLevel(llm.rank).color === 'text-green-500' && 'bg-green-500/10',
                                getRankingPerformanceLevel(llm.rank).color === 'text-orange-400' && 'bg-orange-400/10',
                                getRankingPerformanceLevel(llm.rank).color === 'text-red-500' && 'bg-red-500/10'
                              )}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  getRankingPerformanceLevel(llm.rank).color === 'text-green-500' ? 'bg-green-500' :
                                  getRankingPerformanceLevel(llm.rank).color === 'text-orange-400' ? 'bg-orange-400' :
                                  'bg-red-500'
                                }`} />
                                {getRankingPerformanceLevel(llm.rank).label}
                              </span>
                            </div>
                          ) : (
                            <span className="text-text-muted text-xs sm:text-sm font-normal">
                              N/A
                            </span>
                          )}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Citation Overview */}
        <Reveal delay={0.1} duration={0.6}>
          <div className="mb-4 sm:mb-8">
            <h2 className="text-text-primary text-xl sm:text-2xl md:text-3xl font-light mb-2">
              Citation Overview
            </h2>
          </div>
        </Reveal>

        {/* AI Insight */}
        <Reveal delay={0.15} duration={0.6}>
          <div className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle p-4 sm:p-6 md:p-12 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <div className="flex-shrink-0 text-text-primary">
                <svg width="20" height="20" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.2799 4.52692C21.6647 3.48715 23.1353 3.48716 23.5201 4.52692L27.8543 16.2401C27.9753 16.567 28.233 16.8247 28.5599 16.9457L40.2731 21.2799C41.3128 21.6647 41.3128 23.1353 40.2731 23.5201L28.5599 27.8543C28.233 27.9753 27.9753 28.233 27.8543 28.5599L23.5201 40.2731C23.1353 41.3128 21.6647 41.3128 21.2799 40.2731L16.9457 28.5599C16.8247 28.233 16.567 27.9753 16.2401 27.8543L4.52692 23.5201C3.48715 23.1353 3.48716 21.6647 4.52692 21.2799L16.2401 16.9457C16.567 16.8247 16.8247 16.567 16.9457 16.2401L21.2799 4.52692Z" fill="currentColor"/>
                  <path d="M34.777 5.29256C34.8625 5.06157 35.1892 5.06157 35.2747 5.29256L36.2375 7.89468C36.2644 7.96731 36.3217 8.02456 36.3943 8.05144L38.9964 9.01431C39.2274 9.09978 39.2274 9.42649 38.9964 9.51196L36.3943 10.4748C36.3217 10.5017 36.2644 10.559 36.2375 10.6316L35.2747 13.2337C35.1892 13.4647 34.8625 13.4647 34.777 13.2337L33.8141 10.6316C33.7873 10.559 33.73 10.5017 33.6574 10.4748L31.0553 9.51196C30.8243 9.42649 30.8243 9.09978 31.0553 9.01431L33.6574 8.05144C33.73 8.02456 33.7873 7.96731 33.8141 7.89468L34.777 5.29256Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-text-primary text-sm font-medium mb-2 uppercase tracking-wider">
                  AI INSIGHT
                </h4>
                <div className="text-text-muted text-sm leading-relaxed space-y-1">
                  {citationInsight.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Citation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {citationLLMs.map((llm, index) => (
            <Reveal key={index} delay={0.1 + index * 0.05} duration={0.5}>
              <CitationCard llm={llm} />
            </Reveal>
          ))}
        </div>
      </main>

      <Reveal delay={0.1} duration={0.6}>
        <Footer />
      </Reveal>
    </div>
  );
}
