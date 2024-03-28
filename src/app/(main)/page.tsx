import HeroSection from '@/components/hero/HeroSection';
import CoversGrid from '@/components/home/CoversGrid';
import BestSellingSection from '@/components/home/BestSellingSection';
import TrendingCarsSection from '@/components/home/TrendingCarsSection';
import HomepageVideoSection from '@/components/home/HomepageVideoSection';
import HomepageReviews from '@/components/home/HomepageReviews';
import TrustBanner from '@/components/home/TrustBanner';
import BuyWithConfidenceSection from '@/components/home/BuyWithConfdienceSection';
import SecuritySection from '@/components/home/SecuritySection';
import DesignedInUSA from '@/components/home/DesignedInUSA';
import WhyChooseCoverland from '@/components/home/WhyChooseCoverland';

export async function generateMetadata() {
  return {
    title: `Car covers for automobiles: Custom Fit - Coverland`,
    description: `Car covers, Custom Fit ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

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
