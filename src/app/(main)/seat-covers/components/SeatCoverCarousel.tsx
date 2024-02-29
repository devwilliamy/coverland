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
import SeatCover from '@/images/PDP/Product-Details-Redesign-2/seat-covers/seat-cover.webp';
import { FaCamera } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';

export default function SeatCoverCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const seatCoverArray = [...Array(9)];
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
      className={`relative flex min-h-[80px] min-w-[80px] items-center justify-center rounded-[4px] ${index === current && 'outline outline-1  '} `}
      onClick={() => scrollTo(index)}
    >
      <Image
        className="rounded-[4px]"
        width={74}
        height={74}
        src={src}
        sizes="(max-width: 768px) 100vw"
        alt={`carousel-position-item-${index}`}
      />
    </button>
  );
  return (
    <section className="flex h-full ">
      <div className="flex max-w-full flex-col bg-white lg:hidden ">
        <Carousel setApi={setApi}>
          <CarouselContent id={'carousel-content'} className="no-scrollbar">
            {seatCoverArray.map((image, index) => (
              <CarouselItem key={`carousel-item-${index}`}>
                <Image
                  src={SeatCover}
                  alt={`seat-cover-image`}
                  width={500}
                  height={500}
                  // placeholder="blur"
                  onError={() => console.log('Failed image:', `${SeatCover}`)}
                  className=" h-full w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex h-full w-full items-center">
          <div className=" flex flex-[80%] flex-row gap-[4px] overflow-x-auto whitespace-nowrap p-[6px]">
            {seatCoverArray.map((_, index) => (
              <CarouselPositionItem key={''} src={SeatCover} index={index} />
            ))}
          </div>
          <div
            className={`mx-1 flex h-full min-h-[80px] min-w-[80px] max-w-[25%] flex-[20%] items-center justify-center rounded-[4px] bg-[#F2F2F2] `}
            // onClick={() => scrollTo(index)}
          >
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2 ">
              <p className="text-center text-[10px] font-[600] leading-[12px] underline">
                Customer <br /> Images
              </p>
              <FaCamera
                color={'#3C3C3C'}
                className="flex min-h-[24px] min-w-[27px]"
              />
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}
