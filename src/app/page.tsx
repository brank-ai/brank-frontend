import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import VisibilitySection from '@/components/sections/VisibilitySection';
import AIExposureSection from '@/components/sections/AIExposureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <VisibilitySection />
        <AIExposureSection />
      </main>
      <Footer />
    </div>
  );
}
