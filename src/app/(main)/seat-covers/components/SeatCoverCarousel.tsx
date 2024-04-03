'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Asset } from 'next-video/dist/assets.js';
import SeatCover from '@/images/PDP/Product-Details-Redesign-2/seat-covers/featured-cover.webp';
import { useState, useEffect, useCallback, useContext } from 'react';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';

export default function SeatCoverCarousel() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const galleryImages = selectedProduct?.product?.split(',');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  const CarouselPositionItem = ({
    index,
    src,
  }: {
    index: number;
    src: string | StaticImport;
    video?: string | Asset;
  }) => (
    <button
      className={`w-25% relative flex h-full min-h-[25%] min-w-[25%] items-center justify-center rounded-[4px] ${index === current && 'outline outline-1'} p-[2px]`}
      onClick={() => scrollTo(index)}
    >
      <Image
        className="h-full w-full rounded-[4px]"
        src={src}
        alt={`carousel-position-item-${index}`}
        width={100}
        height={100}
      />
    </button>
  );
  return (
    <section className="flex h-full lg:hidden ">
      <div className="flex max-w-full flex-col bg-white  ">
        <Carousel setApi={setApi}>
          <CarouselContent id={'carousel-content'} className="no-scrollbar">
            {galleryImages?.map((image, index) => {
              // if (index == 3) {
              //   return (
              //     <CarouselItem
              //       key={`seat-video-${index}`}
              //       className="h-full w-full"
              //     >
              //       <ProductVideo
              //         src={SeatVideo}
              //         imgSrc={FeaturedVideoThumbnail}
              //       />
              //     </CarouselItem>
              //   );
              // }

              return (
                <CarouselItem key={`carousel-item-${index}`}>
                  <Image
                    src={image}
                    alt={`seat-cover-image`}
                    width={500}
                    height={500}
                    onError={() => console.log('Failed image:', `${SeatCover}`)}
                    className=" h-full w-full"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <section className="flex h-full w-full items-center pt-1">
          <span className="no-scrollbar flex flex-[80%] flex-row gap-1 overflow-x-auto whitespace-nowrap px-[6px] py-1">
            {galleryImages?.map((image, index) => (
              <CarouselPositionItem
                key={`position-item-${index}`}
                src={image}
                index={index}
              />
            ))}
          </span>
          {/* <div
            className={`flex h-full min-h-[20%] min-w-[20%] max-w-[20%] flex-[20%] items-center justify-center rounded-[4px] bg-[#F2F2F2]  `}
            // onClick={() => scrollTo(index)}
          >
            <div className=" flex w-full flex-col items-center justify-center gap-2 ">
              <p className="text-center text-[10px] font-[600] leading-[12px] underline">
                Customer <br /> Images
              </p>
              <FaCamera
                color={'#3C3C3C'}
                className="flex min-h-[24px] min-w-[27px]"
              />
            </div>
          </div> */}
          {/* ------------ SEAT COVER REVIEWS START ------------- */}
          {/* <ReviewImagesSheet>
              <div
                className={`mx-1 flex h-full min-h-[80px] w-1/4 min-w-[80px] max-w-[25%] items-center justify-center rounded-[4px] bg-[#F2F2F2] `}
                // onClick={() => scrollTo(index)}
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
            </ReviewImagesSheet> */}
          {/* ------------ SEAT COVER REVIEWS END ------------- */}
        </section>
      </div>
    </section>
  );
}
