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

export async function generateMetadata() {
  return {
    title: `Car covers for automobiles: Custom Fit - Coverland`,
    description: `Car covers, Custom Fit ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center gap-[60px] pb-4 lg:gap-[110px]">
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
