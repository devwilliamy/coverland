import LiveChat from '@/components/LiveChat';
import HeroSection from '@/components/hero/HeroSection';
// import CategoryCards from '@/pages/home/CategoryCards';
import ImageAndBlurb from '@/pages/home/ImageAndBlurb';
import SecuritySection from '@/pages/home/SecuritySection';
import SolutionSection from '@/pages/home/SolutionSection';
import TrustBanner from '@/pages/home/TrustBanner';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <CategoryCards /> */}
      <TrustBanner />
      {/* <SolutionSection /> */}
      <SecuritySection />
      {/* <SolutionSection /> */}
      <ImageAndBlurb />
    </>
  );
}
