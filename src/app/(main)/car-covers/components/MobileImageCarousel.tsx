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

  const CarouselPositionItem = ({ index }: { index: number }) => (
    <button
      className={`relative flex min-h-[80px] min-w-[80px] rounded-[4px] ${index === current && 'outline outline-1  '} `}
      onClick={() => scrollTo(index)}
    >
      <Image
        className="rounded-[4px]"
        width={80}
        height={80}
        src={productImages[index]}
        alt=""
      />
    </button>
  );

  return (
    <div className="flex max-w-full flex-col">
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
          <CarouselItem>
            <ProductVideo />
          </CarouselItem>
          {productImages.map((image, index) => (
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
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-row gap-[6px] overflow-x-auto whitespace-nowrap p-[6px]">
        {productImages.map((_, index) => (
          <CarouselPositionItem key={index} index={index} />
        ))}
      </div>
    </div>
  );
};
