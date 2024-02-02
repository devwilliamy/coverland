'use client';

import { useState } from 'react';
import { MobileImageCarousel } from './MobileImageCarousel';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
// import ProductVideo from '@/components/PDP/ProductVideo';
import { SelectedProductImages } from './SelectedProductImages';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { IProductData } from '../../utils';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  ssr: false,
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
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className=" -ml-4 mt-[17px]  flex  w-screen flex-col items-stretch justify-center pb-2 lg:w-3/5 lg:pb-0 ">
      {/* Featured Image */}
      <div
        className={`${
          showMore ? 'overflow-scroll' : 'max-h-[1775px] overflow-hidden'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center bg-[#F2F2F2] md:h-[500px] lg:h-[650px] lg:rounded-xl">
          {isMobile ? (
            <MobileImageCarousel
              selectedProduct={selectedProduct}
              productImages={productImages}
              setFeaturedImage={setFeaturedImage}
            />
          ) : (
            <Image
              id="featured-image"
              src={featuredImage ?? ''}
              alt="a car with a car cover on it"
              width={400}
              height={400}
              className="h-full w-full md:h-[250px] md:w-[250px] lg:h-[500px] lg:w-[500px]"
              priority
              // onClick={console.log(selectedImage)}
            />
          )}
        </div>

        {/* Product Video */}
        {!isMobile && <ProductVideo />}
        {/* Gallery Images */}
        <SelectedProductImages
          productImages={productImages}
          setFeaturedImage={setFeaturedImage}
        />
      </div>
      <Button
        className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
        onClick={() => setShowMore((p) => !p)}
      >
        {showMore ? 'show less images' : 'show more images'}
      </Button>
    </div>
  );
}
