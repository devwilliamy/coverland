'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
// Refactor TODO: Pass this in
import FloorMat from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-cover.webp';
// Refactor TODO: Pass this in
import FloorMatVideo from '@/videos/7_sec_seat_cover.mp4';
// Refactor TODO: Pass this in
import FloorMatThumbnail from '@/images/PDP/seat-covers-v2/seat-covers-listing-thumbnail.webp';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStore } from 'zustand';
import ProductVideo from '@/components/PDP/ProductVideo';
import { Play } from 'lucide-react';

import useStoreContext from '@/hooks/useStoreContext';
import { CarouselPositionItem } from '@/app/(main)/[productType]/components/MobileCarouselPositionItem';

export default function FloorMatCarousel() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Refactor TODO: This needs to be hoisted out?
  //   const isFrontCover =
  //     isFullSet(selectedProduct?.display_set || '') === 'front' ? true : false;

  // Refactor TODO: Pass in gallery
  //   const galleryImages = useMemo(
  //     () =>
  //       isFrontCover
  //         ? selectedProduct?.product?.split(',').slice(0, -3)
  //         : selectedProduct?.product?.split(','),
  //     [selectedProduct, isFrontCover]
  //   );
  const galleryImages = useMemo(
    () => selectedProduct?.product?.split(','),
    [selectedProduct]
  );
  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleCarouselItemClick = (index: number) => {
    scrollTo(index);
  };

  return (
    <section className="flex h-full lg:hidden ">
      <div className="flex max-w-full flex-col bg-white  ">
        <Carousel setApi={setApi}>
          <CarouselContent id={'carousel-content'} className="no-scrollbar">
            {galleryImages?.map((image, index) => {
              if (index == 3) {
                return (
                  <CarouselItem
                    key={`seat-video-${index}`}
                    className="h-full w-full"
                  >
                    <ProductVideo
                      src={FloorMatVideo}
                      imgSrc={FloorMatThumbnail}
                      autoPlay
                    />
                  </CarouselItem>
                );
              }

              return (
                <CarouselItem key={`carousel-item-${index}`}>
                  <Image
                    src={image}
                    alt={`seat-cover-image`}
                    width={500}
                    height={500}
                    onError={() => console.log('Failed image:', `${FloorMat}`)}
                    className=" h-full w-full"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <section className="flex h-full w-full items-center pt-1">
          <span className="no-scrollbar flex flex-[80%] flex-row gap-1 overflow-x-auto whitespace-nowrap px-[6px] py-1">
            {galleryImages?.map((image, index) => {
              if (index === 3) {
                return (
                  <div
                    key={`position-item-${index}`}
                    id="video-thumbnail"
                    className={`w-25% relative flex h-full min-h-[25%] min-w-[25%] items-center justify-center `}
                    onClick={() => scrollTo(index)}
                  >
                    <Image
                      id="video-thumbnail"
                      alt="Video Thumbnail"
                      slot="poster"
                      src={FloorMatThumbnail.src}
                      width={1600}
                      height={1600}
                      aria-hidden="true"
                    />
                    <Play className="absolute rounded-full fill-white text-white" />
                  </div>
                );
              }
              return (
                <CarouselPositionItem
                  key={`position-item-${index}`}
                  src={image}
                  index={index}
                  handleClick={handleCarouselItemClick}
                  className={`w-25% relative flex h-full min-h-[25%] min-w-[25%] items-center justify-center rounded-[4px] ${index === current && 'outline outline-1'} p-[2px]`}
                />
              );
            })}
          </span>
        </section>
      </div>
    </section>
  );
}
