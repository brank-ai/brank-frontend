import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import MetricsSection from '@/components/sections/MetricsSection';
import { getLandingPageData } from '@/lib/backend';

export default async function Home() {
  // Fetch landing page data server-side
  let brandData;
  try {
    brandData = await getLandingPageData();
  } catch (error) {
    console.error('Failed to fetch landing page data:', error);
    // brandData will be undefined, Hero will use fallback mock data
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection brandData={brandData} />
        <MetricsSection />
      </main>
    </div>
  );
}
