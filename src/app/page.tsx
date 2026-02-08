import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import MainContentSection from '@/components/sections/MainContentSection';
import ChatGPTDemoSection from '@/components/sections/ChatGPTDemoSection';
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
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main>
        <HeroSection brandData={brandData} />
        <MainContentSection />
        <ChatGPTDemoSection />
      </main>
      <Footer />
    </div>
  );
}
