'use client';

import { useState } from 'react';
import { MobileImageCarousel } from './MobileImageCarousel';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
// import ProductVideo from '@/components/PDP/ProductVideo';
import { SelectedProductImages } from './SelectedProductImages';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Thumbnail from '@/video/Thumbnail.webp';
import { IProductData } from '../../utils';
// import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import { Skeleton } from '@/components/ui/skeleton';
import SixMinVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4.json';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
});

export function PrimaryImageDisplay({
  productImages,
  selectedProduct,
  featuredImage,
  setFeaturedImage,
}: {
  productImages: string[];
  selectedProduct: IProductData;
  featuredImage: string | undefined;
  setFeaturedImage: (image: string) => void;
}) {
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div className=" -ml-4 flex  w-screen flex-col items-stretch justify-center lg:w-3/5 lg:pb-0 ">
      <div className="relative mb-4 flex h-full w-full items-center justify-center bg-[#F2F2F2] lg:h-[650px] lg:rounded-xl">
        <MobileImageCarousel
          selectedProduct={selectedProduct}
          productImages={productImages}
          setFeaturedImage={setFeaturedImage}
        />
        <Image
          id="featured-image"
          src={featuredImage + '?v=2' ?? ''}
          alt="a car with a car cover on it"
          fill={true}
          className="hidden object-cover lg:block"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Video */}
      {!isMobile && (
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
      )}
      {/* Gallery Images */}
      <SelectedProductImages
        showMore={showMore}
        productImages={productImages}
        setFeaturedImage={setFeaturedImage}
      />
      <Button
        className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
        onClick={() => setShowMore((p) => !p)}
      >
        {showMore ? 'show less images' : 'show more images'}
      </Button>
    </div>
  );
}
