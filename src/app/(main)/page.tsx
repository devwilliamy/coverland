import HeroSection from '@/components/hero/HeroSection';
// import CategoryCards from '@/pages/home/CategoryCards';
import ImageAndBlurb from '@/pages/home/ImageAndBlurb';
import SecuritySection from '@/pages/home/SecuritySection';
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
      <SecuritySection />
      {/* <SolutionSection /> */}
      <ImageAndBlurb />
    </>
  );
}
