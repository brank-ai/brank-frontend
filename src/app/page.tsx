import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import VisibilitySection from '@/components/sections/VisibilitySection';
import AIExposureSection from '@/components/sections/AIExposureSection';
import { Reveal } from '@/components/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Reveal variant="fadeIn" amount={0.4} initiallyVisible duration={1.0}>
          <HeroSection />
        </Reveal>
        <Reveal delay={0.12} duration={1.0}>
          <VisibilitySection />
        </Reveal>
        <Reveal delay={0.12} duration={1.0}>
          <AIExposureSection />
        </Reveal>
      </main>
      <Reveal delay={0.12} duration={1.0}>
        <Footer />
      </Reveal>
    </div>
  );
}
