'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reveal, SlowProgressBar } from '@/components/ui';

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
  const brand = searchParams.get('brand');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brand) return;

    let isMounted = true;

    // Step Rotation Logic
    // Total variable time ~100s. With 4 steps, we allocate ~20-25s per step.
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 20000);

    // Data Fetching Logic
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/prefetch-metric?website=${encodeURIComponent(brand)}`);
        
        if (!response.ok) {
           console.log('Prefetch failed, redirecting anyway...');
           // Force hard navigation to clear any router state issues
           if (isMounted) window.location.assign(`/analytics?brand=${encodeURIComponent(brand)}`);
           return;
        }

        // Success - Redirect immediately
        console.log('Prefetch success, redirecting...');
        if (isMounted) {
          // Force hard navigation to ensure we leave this page
          window.location.assign(`/analytics?brand=${encodeURIComponent(brand)}`);
        }
      } catch (err) {
        // Network error or other fatal issue
        console.error("Prefetch error:", err);
        if (isMounted) {
           setError('Failed to connect to analysis server. Please try again.');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      clearInterval(stepTimer);
    };
  }, [router, brand]);

  if (!brand) {
     return null; // content effectively hidden until redirect or manual entry
  }

  return (
    <div className="min-h-screen w-full bg-bg-base flex items-center justify-center px-6">
      <Reveal variant="fadeIn" initiallyVisible className="max-w-xl w-full">
        {error ? (
          // Error State - Design System
          <div className="bg-bg-surface border border-accent-error/20 rounded-xl p-8 text-center shadow-soft-tile-sm">
             <div className="w-12 h-12 bg-accent-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <h2 className="text-text-primary text-xl font-medium mb-2">Analysis Failed</h2>
             <p className="text-text-muted mb-6">{error}</p>
             <button 
               onClick={() => window.location.href = '/'}
               className="px-6 py-2 bg-text-primary text-bg-base rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
             >
               Return Home
             </button>
          </div>
        ) : (
          // Loading State
          <>
            {/* Main Heading */}
            <h1 className="text-text-primary text-3xl sm:text-4xl font-light mb-8 text-center">
              Analyzing <span className="text-glow font-normal">{brand}</span>...
            </h1>

            {/* Slow Progress Bar */}
            <div className="mb-8">
               <SlowProgressBar className="h-2 rounded-full bg-bg-surface border border-subtle" />
            </div>

            {/* Current Step Name */}
            <h2 className="text-text-primary text-xl font-medium mb-3 text-center">
              {steps[currentStep].name}
            </h2>

            {/* Insight Paragraph */}
            <p className="text-text-muted text-sm sm:text-base leading-relaxed text-center h-20">
              {steps[currentStep].insight}
            </p>
          </>
        )}
      </Reveal>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-bg-base flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-text-muted border-t-text-primary rounded-full animate-spin" />
      </div>
    }>
      <ProgressContent />
    </Suspense>
  );
}
