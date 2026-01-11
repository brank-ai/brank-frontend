'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MetricCard } from '@/components/ui/MetricCard';
import { ProModal } from '@/components/ui';
import { ComparisonCard } from '@/components/analytics/ComparisonCard';
import { CitationCard } from '@/components/analytics/CitationCard';
import { mockAnalyticsData } from '@/constants/mockAnalyticsData';

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const brandName = searchParams.get('brand') || 'Unknown Brand';
  const [isRankingProModalOpen, setIsRankingProModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowRankingProButton = (llmName: string) => {
    return llmName === 'Grok' || llmName === 'Perplexity';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-light mb-4">
            AEO Analytics -{' '}
            <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">{brandName}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Here&apos;s what we learnt about your brand.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Mentions", value: mockAnalyticsData.metrics.totalMentions, info: "Total number of mentions across all LLMs" },
            { label: "Total Citations", value: mockAnalyticsData.metrics.totalCitations, info: "Total number of citations from sources" },
            { label: "Avg Sentiment", value: mockAnalyticsData.metrics.avgSentiment, info: "Average sentiment score across platforms" },
            { label: "Avg Ranking", value: mockAnalyticsData.metrics.avgRanking, info: "Average ranking position" }
          ].map((metric, index) => (
            <div key={index} className="relative">
              <div className={isLoading ? 'blur-sm' : ''}>
                <MetricCard
                  label={metric.label}
                  value={metric.value}
                  info={metric.info}
                />
              </div>
              {isLoading && (
                <div className="absolute inset-0 bg-[#2F2F2F33] border border-gray-800 animate-shimmer" />
              )}
            </div>
          ))}
        </div>

        {/* Comparison Sections - Stacked Vertically */}
        <div className="space-y-8 mb-16">
          {[
            { title: "Mentions Rate", comparisons: mockAnalyticsData.mentionsRate.comparisons, insight: mockAnalyticsData.mentionsRate.insight },
            { title: "Sentiment Score", comparisons: mockAnalyticsData.sentimentScore.comparisons, insight: mockAnalyticsData.sentimentScore.insight }
          ].map((card, index) => (
            <div key={index} className="relative">
              <div className={isLoading ? 'blur-sm' : ''}>
                <ComparisonCard
                  title={card.title}
                  comparisons={card.comparisons}
                  insight={card.insight}
                />
              </div>
              {isLoading && (
                <div className="absolute inset-0 bg-[#0a0a0a] border border-[#2a2a2a] animate-shimmer" />
              )}
            </div>
          ))}
        </div>

        {/* Ranking Overview */}
        <div className="mb-16 relative">
          <div className={isLoading ? 'blur-sm' : ''}>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side: Title + AI Insight */}
              <div className="flex flex-col justify-between pr-6 bg-[#2F2F2F33] -m-12 p-12 mr-0">
                {/* Title with Info Icon */}
                <div className="flex items-center gap-2 mb-8">
                  <h3 className="text-white text-2xl font-normal">Ranking Overview</h3>
                  <button
                    className="text-gray-600 hover:text-gray-500 transition-colors"
                    title="Information about Ranking Overview"
                  >
                    <svg
                      width="20"
                      height="20"
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
                <div className="flex flex-col gap-3 mt-auto">
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
                  <p className="text-gray-400 text-sm leading-relaxed">{mockAnalyticsData.rankings.insight}</p>
                </div>
              </div>

              {/* Right Side: Rank by LLMs */}
              <div className="pl-12">
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
                  {mockAnalyticsData.rankings.byLLMs.llms.map((llm, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={llm.icon}
                          alt={llm.name}
                          width={18}
                          height={18}
                          className="object-contain opacity-70"
                        />
                        <span className="text-gray-500 text-sm uppercase tracking-wide">
                          {llm.name}
                        </span>
                      </div>
                      {shouldShowRankingProButton(llm.name) ? (
                        <button
                          onClick={() => setIsRankingProModalOpen(true)}
                          className="px-4 py-1.5 bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] text-black text-xs font-medium hover:opacity-90 transition-opacity rounded-md"
                        >
                          Pro
                        </button>
                      ) : (
                        <span className="text-white text-sm font-normal">
                          #{llm.rank}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-[#0a0a0a] border border-[#2a2a2a] animate-shimmer" />
          )}
        </div>

        {/* Citation Overview */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-light mb-2">
              Citation Overview
            </h2>
          </div>

          {/* AI Insight */}
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-12 mb-8">
            <div className="flex items-start gap-3">
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
                  {mockAnalyticsData.citations.insight}
                </p>
              </div>
            </div>
          </div>

          {/* Citation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAnalyticsData.citations.llms.map((llm, index) => (
              <div key={index} className="relative">
                <div className={isLoading ? 'blur-sm' : ''}>
                  <CitationCard llm={llm} />
                </div>
                {isLoading && (
                  <div className="absolute inset-0 bg-[#2F2F2F33] border border-gray-800 animate-shimmer" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      
      <ProModal
        isOpen={isRankingProModalOpen}
        onClose={() => setIsRankingProModalOpen(false)}
      />
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <AnalyticsContent />
    </Suspense>
  );
}

