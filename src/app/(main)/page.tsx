import HeroSection from '@/components/hero/HeroSection';
import BestSellingSection from '@/components/home/BestSellingSection';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import CoversGrid from '@/components/home/CoversGrid';
import SecuritySection from '@/components/home/SecuritySection';
import TrendingCarsSection from '@/components/home/TrendingCarsSection';
// import CategoryCards from '@/pages/home/CategoryCards';
import ImageAndBlurb from '@/pages/home/ImageAndBlurb';
import TrustBanner from '@/pages/home/TrustBanner';

import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Suspense>
        <HeroSection />
      </Suspense>
      <CoversGrid />
      <BestSellingSection />
      <TrendingCarsSection />
      <TrustBanner />
      {/* <SolutionSection /> */}
      <BuyWithConfidenceSection />
      <SecuritySection />
      {/* <SolutionSection /> */}
      <ImageAndBlurb />
    </>
  );
}
