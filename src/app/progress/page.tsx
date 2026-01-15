'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reveal } from '@/components/ui';

const steps = [
  {
    name: 'Fetching Rank',
    insight: 'Track where your brand appears in LLM-generated recommendations. Move higher in rankings by optimizing your brand\'s authority signals and content structure.',
  },
  {
    name: 'Calculating Sentiment Score',
    insight: 'Understand how LLMs perceive your brand. Improve sentiment by refining your messaging and publishing content that shapes positive AI narratives.',
  },
  {
    name: 'Sourcing Citations',
    insight: 'Discover which sources LLMs reference in your category. Strengthen citations by publishing in high-authority sources that AI models trust.',
  },
  {
    name: 'Aggregating Mentions',
    insight: 'See how often LLMs mention your brand. Increase mentions by creating high-signal content that AI systems are more likely to ingest.',
  },
] as const;

function ProgressContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'your brand';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const totalDuration = 8000; // 8 seconds total
    const updateInterval = 50; // Update every 50ms
    const totalUpdates = totalDuration / updateInterval;
    const progressIncrement = 100 / totalUpdates;
    
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return newProgress;
      });
    }, updateInterval);

    // Update current step every 2 seconds
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    // Redirect after completion with replace to fix back button
    const redirectTimer = setTimeout(() => {
      router.replace(`/analytics?brand=${encodeURIComponent(brand)}`);
    }, totalDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(redirectTimer);
    };
  }, [router, brand]);

  const currentStepData = steps[currentStep] ?? steps[0]!;

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-6">
      <Reveal variant="fadeIn" initiallyVisible className="max-w-2xl w-full">
        {/* Main Heading */}
        <h1 className="text-gray-200 text-4xl font-light mb-6">
          Analyzing {brand}...
        </h1>

        {/* Progress Bar - 3x larger */}
        <div className="w-full h-3 bg-gray-800 mb-8 overflow-hidden rounded-sm">
          <div
            className="h-full bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Step Name - Larger and Bold */}
        <h2 className="text-white text-xl font-semibold mb-8">
          {currentStepData.name}
        </h2>

        {/* Insight Paragraph */}
        <p className="text-gray-400 text-base leading-relaxed">
          {currentStepData.insight}
        </p>
      </Reveal>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <ProgressContent />
    </Suspense>
  );
}

