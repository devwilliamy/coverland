import { MobileImageCarousel } from './MobileImageCarousel';
import Image from 'next/image';
// import ProductVideo from '@/components/PDP/ProductVideo';
import { SelectedProductImages } from './SelectedProductImages';
import dynamic from 'next/dynamic';
import Thumbnail from '@/video/Thumbnail.webp';
import { IProductData } from '../../utils';
// import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import { Skeleton } from '@/components/ui/skeleton';
import SixMinVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4.json';
import FeatureImage from './FeatureImage';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
});

export function PrimaryImageDisplay() {
  // const store = useContext(CarSelectionContext);
  // if (!store) throw new Error('Missing CarContext.Provider in the tree');
  // const productImages = selectedProduct?.productImages as string[];
  // const selectedProduct = useStore(store, (s) => s.selectedProduct);
  // const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);

  console.log(
    'PrimaryImageDisplay is a server component: ',
    typeof window === 'undefined'
  );

  return (
    <div className=" -ml-4 flex  w-screen flex-col items-stretch justify-center lg:w-3/5 lg:pb-0 ">
      <div className="relative mb-4 flex h-full w-full items-center justify-center bg-[#F2F2F2] lg:h-[650px] lg:rounded-xl">
        <MobileImageCarousel />
        <FeatureImage />
      </div>

      {/* Product Video */}
      {/* {!isMobile && (
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
      )} */}
      {/* Gallery Images */}
      <SelectedProductImages />
    </div>
  );
}
