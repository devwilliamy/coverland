import HeroSection from '@/components/hero/HeroSection';
import BestSellingSection from '@/components/home/BestSellingSection';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import CoversGrid from '@/components/home/CoversGrid';
import SecuritySection from '@/components/home/SecuritySection';
import TrendingCarsSection from '@/components/home/TrendingCarsSection';
import ImageAndBlurb from '@/pages/home/ImageAndBlurb';
import TrustBanner from '@/pages/home/TrustBanner';
import SolutionSection from '@/pages/home/SolutionSection';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col gap-[110px]">
      <Suspense>
        <HeroSection />
      </Suspense>
      <CoversGrid />
      <>
        <BestSellingSection />
        <TrendingCarsSection />
      </>
      <SolutionSection />
      <TrustBanner />
      <BuyWithConfidenceSection />
      <SecuritySection />
      <ImageAndBlurb />
    </div>
  );
}
