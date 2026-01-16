import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MetricCard } from '@/components/ui/MetricCard';
import { Reveal } from '@/components/ui';
import { ComparisonCard } from '@/components/analytics/ComparisonCard';
import { CitationCard } from '@/components/analytics/CitationCard';
import { getMetrics } from '@/lib/backend';
import { BackendMetricResponse } from '@/types/backend';
import { LLMComparison, CitationLLM } from '@/types';

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
      <div className="min-h-screen bg-black">
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
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] text-black text-sm font-medium hover:opacity-90 transition-all duration-150 rounded-md"
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

  const shouldShowRankingProButton = (llmName: string) => {
    return llmName === 'Grok' || llmName === 'Perplexity';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-10 md:py-12 relative">
        {/* Page Header */}
        <Reveal variant="fadeIn" initiallyVisible duration={1.0}>
          <div className="mb-8 sm:mb-12">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 sm:mb-4">
              AEO Analytics -{' '}
              <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">
                {brandName}
              </span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
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
              info="Total number of mentions across all LLMs"
            />
          </Reveal>
          <Reveal delay={0.15} duration={0.6}>
            <MetricCard
              label="Total Citations"
              value={Math.round(metricsData.citations)}
              info="Total number of citations from sources"
            />
          </Reveal>
          <Reveal delay={0.2} duration={0.6}>
            <MetricCard
              label="Avg Sentiment"
              value={Math.round(metricsData.averageSentiment)}
              info="Average sentiment score across platforms"
            />
          </Reveal>
          <Reveal delay={0.25} duration={0.6}>
            <MetricCard
              label="Avg Ranking"
              value={metricsData.averageRanking.toFixed(1)}
              info="Average ranking position"
            />
          </Reveal>
        </div>

        {/* Comparison Sections - Stacked Vertically */}
        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
          <Reveal delay={0.1} duration={0.6}>
            <ComparisonCard
              title="Mentions Rate"
              comparisons={mentionsRateComparisons}
              insight="Track how often your brand appears in LLM-generated recommendations across different platforms."
            />
          </Reveal>
          <Reveal delay={0.15} duration={0.6}>
            <ComparisonCard
              title="Sentiment Score"
              comparisons={sentimentScoreComparisons}
              insight="Understand how LLMs perceive your brand sentiment across different AI platforms."
            />
          </Reveal>
        </div>

        {/* Ranking Overview */}
        <Reveal delay={0.1} duration={0.6}>
          <div className="mb-10 sm:mb-16">
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-4 sm:p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                {/* Left Side: Title + AI Insight */}
                <div className="flex flex-col bg-[#2F2F2F33] -m-4 p-4 sm:-m-6 sm:p-6 md:-m-12 md:p-12 mr-0 md:pr-6 md:justify-between">
                  {/* Title with Info Icon */}
                  <div className="flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal">
                      Ranking Overview
                    </h3>
                    <button
                      className="text-gray-600 hover:text-gray-500 transition-all duration-150 active:scale-95"
                      title="Information about Ranking Overview"
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
                  </div>

                  {/* AI Insight with Gradient on Icon and Text */}
                  <div className="flex flex-col gap-3 md:mt-auto">
                    <div className="flex items-center gap-2">
                      {/* Icon with gradient */}
                      <div className="flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="rankingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: '#00FFBB', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#00B7FF', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          <path d="M21.2799 4.52692C21.6647 3.48715 23.1353 3.48716 23.5201 4.52692L27.8543 16.2401C27.9753 16.567 28.233 16.8247 28.5599 16.9457L40.2731 21.2799C41.3128 21.6647 41.3128 23.1353 40.2731 23.5201L28.5599 27.8543C28.233 27.9753 27.9753 28.233 27.8543 28.5599L23.5201 40.2731C23.1353 41.3128 21.6647 41.3128 21.2799 40.2731L16.9457 28.5599C16.8247 28.233 16.567 27.9753 16.2401 27.8543L4.52692 23.5201C3.48715 23.1353 3.48716 21.6647 4.52692 21.2799L16.2401 16.9457C16.567 16.8247 16.8247 16.567 16.9457 16.2401L21.2799 4.52692Z" fill="url(#rankingGradient)"/>
                          <path d="M34.777 5.29256C34.8625 5.06157 35.1892 5.06157 35.2747 5.29256L36.2375 7.89468C36.2644 7.96731 36.3217 8.02456 36.3943 8.05144L38.9964 9.01431C39.2274 9.09978 39.2274 9.42649 38.9964 9.51196L36.3943 10.4748C36.3217 10.5017 36.2644 10.559 36.2375 10.6316L35.2747 13.2337C35.1892 13.4647 34.8625 13.4647 34.777 13.2337L33.8141 10.6316C33.7873 10.559 33.73 10.5017 33.6574 10.4748L31.0553 9.51196C30.8243 9.42649 30.8243 9.09978 31.0553 9.01431L33.6574 8.05144C33.73 8.02456 33.7873 7.96731 33.8141 7.89468L34.777 5.29256Z" fill="url(#rankingGradient)"/>
                        </svg>
                      </div>
                      {/* Text with gradient */}
                      <h4 className="text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent whitespace-nowrap">
                        AI INSIGHT
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Your brand ranks #{metricsData.averageRanking.toFixed(1)} on average across AI platforms. Higher rankings mean better visibility in AI-generated recommendations.
                    </p>
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
                      className="text-gray-600"
                    >
                      <path
                        d="M3 13h8v8H3v-8zm10-10h8v18h-8V3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-600 text-xs uppercase tracking-wider">
                      RANK BY LLMs
                    </span>
                  </div>

                  {/* Rankings List */}
                  <div className="space-y-4">
                    {rankingLLMs.map((llm, index) => (
                      <Reveal key={index} delay={0.15 + index * 0.05} duration={0.5}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <Image
                              src={llm.icon}
                              alt={llm.name}
                              width={16}
                              height={16}
                              className="object-contain opacity-70"
                            />
                            <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide truncate">
                              {llm.name}
                            </span>
                          </div>
                          {shouldShowRankingProButton(llm.name) ? (
                            <span className="text-gray-600 text-xs sm:text-sm font-normal">
                              Pro
                            </span>
                          ) : llm.rank > 0 ? (
                            <span className="text-white text-xs sm:text-sm font-normal">
                              #{llm.rank.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-gray-600 text-xs sm:text-sm font-normal">
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
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-light mb-2">
              Citation Overview
            </h2>
          </div>
        </Reveal>

        {/* AI Insight */}
        <Reveal delay={0.15} duration={0.6}>
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-4 sm:p-6 md:p-12 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <div className="flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="citationGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#00FFBB', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#00B7FF', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M21.2799 4.52692C21.6647 3.48715 23.1353 3.48716 23.5201 4.52692L27.8543 16.2401C27.9753 16.567 28.233 16.8247 28.5599 16.9457L40.2731 21.2799C41.3128 21.6647 41.3128 23.1353 40.2731 23.5201L28.5599 27.8543C28.233 27.9753 27.9753 28.233 27.8543 28.5599L23.5201 40.2731C23.1353 41.3128 21.6647 41.3128 21.2799 40.2731L16.9457 28.5599C16.8247 28.233 16.567 27.9753 16.2401 27.8543L4.52692 23.5201C3.48715 23.1353 3.48716 21.6647 4.52692 21.2799L16.2401 16.9457C16.567 16.8247 16.8247 16.567 16.9457 16.2401L21.2799 4.52692Z" fill="url(#citationGradient1)"/>
                  <path d="M34.777 5.29256C34.8625 5.06157 35.1892 5.06157 35.2747 5.29256L36.2375 7.89468C36.2644 7.96731 36.3217 8.02456 36.3943 8.05144L38.9964 9.01431C39.2274 9.09978 39.2274 9.42649 38.9964 9.51196L36.3943 10.4748C36.3217 10.5017 36.2644 10.559 36.2375 10.6316L35.2747 13.2337C35.1892 13.4647 34.8625 13.4647 34.777 13.2337L33.8141 10.6316C33.7873 10.559 33.73 10.5017 33.6574 10.4748L31.0553 9.51196C30.8243 9.42649 30.8243 9.09978 31.0553 9.01431L33.6574 8.05144C33.73 8.02456 33.7873 7.96731 33.8141 7.89468L34.777 5.29256Z" fill="url(#citationGradient1)"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent text-sm font-medium mb-2 uppercase tracking-wider">
                  AI INSIGHT
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover which sources LLMs reference when mentioning your brand. Strengthen your presence by publishing in high-authority sources that AI models trust.
                </p>
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
