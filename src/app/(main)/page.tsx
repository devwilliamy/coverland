import HeroSection from '@/components/hero/HeroSection';
import BestSellingSection from '@/components/home/BestSellingSection';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import CoversGrid from '@/components/home/CoversGrid';
import SecuritySection from '@/components/home/SecuritySection';
import TrendingCarsSection from '@/components/home/TrendingCarsSection';
import DesignedInUSA from '@/pages/home/DesignedInUSA';
import TrustBanner from '@/pages/home/TrustBanner';
import SolutionSection from '@/pages/home/SolutionSection';
import { Suspense } from 'react';
import WhyChooseCoverland from '@/pages/home/WhyChooseCoverland';
import ReviewsSection from '@/pages/home/ReviewsSection';

export default function Home() {
  // const reviewData: TReviewData[] | null =
  //   (await fetchReviewData(searchParams, pathParams)) ?? [];

  return (
    <div className="flex flex-col gap-[60px] py-4 lg:gap-[110px]">
      <Suspense>
        <HeroSection />
      </Suspense>
      <CoversGrid />
      <>
        <BestSellingSection />
        <TrendingCarsSection />
      </>
      <SolutionSection />
      <ReviewsSection />
      <TrustBanner />
      <BuyWithConfidenceSection />
      <SecuritySection />
      <DesignedInUSA />
      <WhyChooseCoverland />
    </div>
  );
}
