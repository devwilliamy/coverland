import Thumbnail from '@/video/Thumbnail.webp';
import SixMinVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import ProductVideo from '../ProductVideo';
import ProductDetailsHeader from './ProductDetailsHeader';
import FabricMattersSection from './FabricMattersSection';
import DifferenceGrid from '@/app/(main)/[productType]/components/DifferenceGrid';
import CustomFitSection from './CustomFitSection';
import WetFabric from '@/images/PDP/Product-Details-Redesign-2/fabric-with-water.webp';
import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section
      className={`relative flex h-max flex-col items-center justify-center`}
    >
      <Image
        alt="Wet Fabric"
        src={WetFabric}
        className="absolute top-0  -mx-4 h-full object-cover"
      />
      <ProductDetailsHeader />
      <div className="relative flex flex-col items-center justify-center lg:w-[850px]">
        <FabricMattersSection />
        <DifferenceGrid />
        <CustomFitSection />
      </div>
    </section>
  );
}
