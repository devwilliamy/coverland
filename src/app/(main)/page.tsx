import HeroSection from '@/components/hero/HeroSection';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import SecuritySection from '@/components/home/SecuritySection';
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
      {/* <CategoryCards /> */}
      <TrustBanner />
      {/* <SolutionSection /> */}
      <BuyWithConfidenceSection />
      <SecuritySection />
      {/* <SolutionSection /> */}
      <ImageAndBlurb />
    </>
  );
}
