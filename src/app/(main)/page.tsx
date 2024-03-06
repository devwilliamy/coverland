import HeroSection from '@/components/hero/HeroSection';
import BestSellingSection from '@/components/home/BestSellingSection';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import CoversGrid from '@/components/home/CoversGrid';
import SecuritySection from '@/components/home/SecuritySection';
import TrendingCarsSection from '@/components/home/TrendingCarsSection';
import DesignedInUSA from '@/pages/home/DesignedInUSA';
import TrustBanner from '@/pages/home/TrustBanner';
import HomepageVideoSection from '@/pages/home/HomepageVideoSection';
import WhyChooseCoverland from '@/pages/home/WhyChooseCoverland';
import HomepageReviews from '@/pages/home/HomepageReviews';

export default function Home() {
  return (
    <div className="flex flex-col gap-[60px] pb-4 lg:gap-[110px]">
      <HeroSection />
      <CoversGrid />
      <div className="flex flex-col gap-[60px] bg-[#F9F9FB] lg:gap-[110px] lg:py-[44px]">
        <BestSellingSection />
        <TrendingCarsSection />
      </div>
      <HomepageVideoSection />
      <HomepageReviews />
      <TrustBanner />
      <BuyWithConfidenceSection />
      <div className="flex flex-col gap-[60px] bg-[#F9F9FB] lg:gap-[110px] lg:py-[110px]">
        <SecuritySection />
        <DesignedInUSA />
        <WhyChooseCoverland />
      </div>
    </div>
  );
}
