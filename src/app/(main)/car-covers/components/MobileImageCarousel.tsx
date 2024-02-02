import { useCallback, useEffect, useState } from 'react';
import { TCarCoverData } from './CarPDP';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { TProductData } from '@/lib/db';
import SevenSecVideo from '@/videos/7sec Listing Video_2.mp4';

const ActiveDot = () => (
  <div className="relative flex h-2.5 w-2.5">
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-600"></span>
  </div>
);
import dynamic from 'next/dynamic';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  ssr: false,
});

export const MobileImageCarousel = ({
  selectedProduct,
  productImages,
}: {
  selectedProduct: TCarCoverData | TProductData;
  productImages: string[];
}) => {
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
  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  const Dot = ({ index }: { index: number }) => (
    <button className="relative flex h-2 w-2" onClick={() => scrollTo(index)}>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-300"></span>
    </button>
  );

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent className="bg-[#F2F2F2] p-2">
          <CarouselItem>
            <Image
              src={selectedProduct.feature as string}
              alt={`Additional images of the ${selectedProduct.display_id} cover`}
              width={500}
              height={500}
              priority
              // placeholder="blur"
            />
          </CarouselItem>
          {productImages.map((image, index) => (
            <>
              {index === 2 ? (
                <>
                  <CarouselItem key={index}>
                    <ProductVideo src={SevenSecVideo} autoplay loop />
                  </CarouselItem>
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={`Additional images of the ${selectedProduct.display_id} cover`}
                      width={500}
                      height={500}
                      // placeholder="blur"
                      onError={() => console.log('Failed image:', `${image}`)}
                    />
                  </CarouselItem>
                </>
              ) : (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt={`Additional images of the ${selectedProduct.display_id} cover`}
                    width={500}
                    height={500}
                    // placeholder="blur"
                    onError={() => console.log('Failed image:', `${image}`)}
                  />
                </CarouselItem>
              )}
            </>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex w-full items-center justify-center gap-2 bg-white py-2">
        {scrollSnaps.map((_, index) =>
          index === current ? (
            <ActiveDot key={index} />
          ) : (
            <Dot key={index} index={index} />
          )
        )}
      </div>
    </div>
  );
};
