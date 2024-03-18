import { SelectedProductImages } from './SelectedProductImages';
import dynamic from 'next/dynamic';
import Thumbnail from '@/video/Thumbnail.webp';
import { Skeleton } from '@/components/ui/skeleton';
import SixMinVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import FeatureImage from './FeatureImage';
const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
});

const MobileImageCarousel = dynamic(() => import('./MobileImageCarousel'), {
  loading: () => <div className="h-[500px]"></div>,
});

export function PrimaryImageDisplay() {
  return (
    <div className=" -ml-4 flex  w-screen flex-col items-stretch justify-center lg:w-3/5 lg:pb-0 ">
      <div className="relative mb-4 flex h-full w-full items-center justify-center bg-[#F2F2F2] lg:h-[650px] lg:rounded-xl">
        <MobileImageCarousel />
        <FeatureImage />
      </div>

      {/* Product Video */}
      <div className=" min-h hidden lg:block lg:max-h-[420px] lg:min-h-80">
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
      </div>

      {/* Gallery Images */}
      <SelectedProductImages />
    </div>
  );
}
