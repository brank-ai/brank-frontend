import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-10 md:py-12 relative">
        {/* Page Header Skeleton */}
        <div className="mb-8 sm:mb-12 animate-pulse">
          <div className="h-10 sm:h-12 w-2/3 md:w-1/2 bg-bg-surface rounded-lg mb-4" />
          <div className="h-6 w-1/3 bg-bg-surface/50 rounded-lg" />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle p-6 h-32 animate-pulse"
            />
          ))}
        </div>

        {/* Comparison Sections Skeleton */}
        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle h-64 animate-pulse"
            />
          ))}
        </div>

        {/* Ranking Skeleton */}
        <div className="mb-10 sm:mb-16">
          <div className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle p-6 h-80 animate-pulse" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
