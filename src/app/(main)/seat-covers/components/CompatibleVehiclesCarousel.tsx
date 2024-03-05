import React, { useCallback, useEffect, useState } from 'react';
import list1 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/seat-list-1.webp';
import list2 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/seat-list-2.webp';
import list3 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/seat-list-3.webp';
import list4 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/seat-list-4.webp';
import list5 from '@/images/PDP/Product-Details-Redesign-2/seat-covers/compatability/seat-list-5.webp';
import Image, { StaticImageData } from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const seatLists: { image: StaticImageData }[] = [
  {
    image: list1,
  },
  {
    image: list2,
  },
  {
    image: list3,
  },
  {
    image: list4,
  },
  {
    image: list5,
  },
];

export default function CompatibleVehiclesCarousel() {
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

  return (
    <section className="flex flex-col ">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="ml-0  gap-4 pl-0">
          {seatLists.map((i, index) => (
            <CarouselItem key={'SheetItem: ' + index} className="pl-0">
              <Image
                alt={`list-image-${index}`}
                src={i.image}
                quality={100}
                className="flex  object-contain "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <ChevronLeft
          onClick={() => api?.scrollPrev()}
          className={`absolute cursor-pointer ${api?.canScrollPrev() ? 'text-black' : 'hidden'} left-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 max-lg:hidden`}
        />
        <ChevronRight
          onClick={() => api?.scrollNext()}
          className={`absolute cursor-pointer ${api?.canScrollNext() ? 'text-black' : 'hidden'} right-[-10vw] top-1/2 h-9 w-9 -translate-y-1/2 max-lg:hidden`}
        />
      </Carousel>

      <section className="w-full items-center justify-center lg:hidden">
        <div className="flex w-full items-center justify-center gap-[10px] pt-7">
          {seatLists.map((i, index) => (
            <div
              key={`carousel-position-item-${index}`}
              onClick={() => scrollTo(index)}
              className={`rounded-full ${index === current && 'bg-black'} h-3.5 w-3.5 cursor-pointer outline outline-[0.5px] `}
            ></div>
          ))}
        </div>
      </section>
    </section>
  );
}
