'use client';
import ReviewImagesSheet from '@/components/PDP/components/ReviewImagesSheet';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useDetermineType from '@/hooks/useDetermineType';
import { Play } from 'lucide-react';
import { Asset } from 'next-video/dist/assets.js';
import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useStore } from 'zustand';
import { removeWwwFromUrl } from '@/utils';
import { CarouselPositionItem } from './MobileCarouselPositionItem';
import useDetermineContent from '@/hooks/useDetermineContent';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
  ssr: false,
});

const MobileImageCarousel = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const productImages = selectedProduct?.productImages as string[];
  const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { productType, model, make, year } = useDetermineType();
  console.log('Type Data: ', { productType, model, make, year });

  const { carouselSquare360, carouselThumb } = useDetermineContent();

  const carouselItems = useMemo(() => {
    const items = [...productImages];
    items.splice(3, 0, String(carouselThumb));
    return items;
  }, [productImages, carouselThumb]);

  useEffect(() => {
    if (!api) {
      return;
    }
   
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  const handleCarouselItemClick = (index: number) => {
    scrollTo(index);
  };

  return (
    <div className="flex max-w-full flex-col bg-white lg:hidden ">
      <Carousel setApi={setApi}>
        <CarouselContent id={'carousel-content'} className="no-scrollbar">
          {carouselItems.map((image, index) => {
            if (index < 1)
              return (
                <CarouselItem
                  key={selectedProduct.mainImage}
                  className="bg-[#F2F2F2]"
                >
                  <Image
                    src={
                      (removeWwwFromUrl(selectedProduct.mainImage as string) +
                        '?v=11') as string
                    }
                    alt={`Additional images of the ${selectedProduct.display_id} cover`}
                    width={500}
                    height={500}
                    priority
                    // placeholder="blur"
                    className="h-auto w-full"
                  />
                </CarouselItem>
              );
            if (index === 3) {
              return (
                <CarouselItem key={String(carouselThumb)}>
                  <ProductVideo
                    src={carouselSquare360}
                    imgSrc={carouselThumb}
                    autoplay
                    loop
                  />
                </CarouselItem>
              );
            }
            return (
              <CarouselItem key={image}>
                <Image
                  src={removeWwwFromUrl(image) + '?v=11'}
                  alt={`Additional images of the ${selectedProduct.display_id} cover`}
                  width={500}
                  height={500}
                  onError={() => {
                    console.log('Failed image:', `${image}`);
                  }}
                  className="h-auto w-full"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex h-full w-full items-center">
        <span
          id="carousel-position-item-selector"
          className=" flex w-3/4 flex-row gap-[4px] overflow-x-auto whitespace-nowrap py-[6px] pl-[6px]"
        >
          {carouselItems.map((item, index) => {
            if (index < 1)
              return (
                <div
                  key={selectedProduct.mainImage}
                  className={`relative flex min-h-[80px]  min-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px] ${0 === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    src={
                      (removeWwwFromUrl(selectedProduct.mainImage as string) +
                        '?v=11') as string
                    }
                    alt={`Additional images of the ${selectedProduct.display_id} cover`}
                    width={74}
                    height={74}
                    priority
                    // placeholder="blur"
                  />
                </div>
              );
            if (index === 3) {
              return (
                <div
                  key={String(carouselThumb)}
                  id="video-thumbnail"
                  className={`relative flex aspect-square min-h-[80px] min-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px] p-0.5  ${productType === 'car-covers' && ''} ${index === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    id="video-thumbnail"
                    alt="Video Thumbnail"
                    slot="poster"
                    src={carouselThumb as StaticImport}
                    width={1600}
                    height={1600}
                    className="flex h-full w-full overflow-hidden rounded-[4px] object-cover"
                    aria-hidden="true"
                  />
                  <Play className="absolute rounded-full fill-white text-white" />
                </div>
              );
            }
            return (
              <CarouselPositionItem
                key={String(carouselItems[index])}
                src={item}
                index={index}
                current={current}
                handleClick={handleCarouselItemClick}
              />
            );
          })}
        </span>
        <ReviewImagesSheet>
          <div
            className={` flex h-full min-h-[80px] w-1/4 min-w-[80px] max-w-[25%] items-center justify-center rounded-[4px] bg-[#F2F2F2] `}
          >
            <div className="m-auto flex h-full flex-col items-center justify-center gap-2 ">
              <p className="text-[10px] font-[600] leading-[12px] underline">
                Customer <br /> Images
              </p>
              <FaCamera
                color={'#3C3C3C'}
                className="flex min-h-[24px] min-w-[27px]"
              />
            </div>
          </div>
        </ReviewImagesSheet>
      </div>
    </div>
  );
};
export default MobileImageCarousel;
