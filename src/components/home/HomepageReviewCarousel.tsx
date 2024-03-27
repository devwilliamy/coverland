'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from '@/components/ui/carousel';
import { useCallback, useEffect, useState } from 'react';

const Dot = ({ index, api }: { index: number }) => (
  <button className="relative flex h-2 w-2" onClick={() => api.scrollTo(index)}>
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#767676] outline outline-[1px]"></span>
  </button>
);

const ActiveDot = () => (
  <div className="relative flex h-2.5 w-2.5">
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1A1A1A] outline outline-[1px]"></span>
  </div>
);

export default function HomepageReviewCarousel({ children }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi}>
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
      <div className="flex w-full items-center justify-center gap-2 bg-[#ECECEC] py-2 pb-[62px]">
        {scrollSnaps.map((_, index) =>
          index === current ? (
            <ActiveDot key={index} />
          ) : (
            <Dot key={index} index={index} api={api} />
          )
        )}
      </div>
    </>
  );
}
