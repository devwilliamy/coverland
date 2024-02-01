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
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Asset } from 'next-video/dist/assets.js';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  ssr: false,
});

export const MobileImageCarousel = ({
  selectedProduct,
  productImages,
  setFeaturedImage,
}: {
  selectedProduct: TCarCoverData | TProductData;
  productImages: string[];
  setFeaturedImage?: (img: string) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    src?: string | StaticImport;
    video?: string | Asset;
  }) => (
    <button
      className={`relative flex min-h-[80px] min-w-[80px] rounded-[4px] ${index === current && 'outline outline-1  '} `}
      onClick={() => scrollTo(index)}
    >
      <Image
        className="rounded-[4px]"
        width={80}
        height={80}
        src={src ? src : productImages[index]}
        alt=""
      />
    </button>
  );

  return (
    <div className=" flex  max-w-full flex-col  bg-white pb-[16px]">
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem className="bg-[#F2F2F2]">
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
      <div className="mb-[16px] flex flex-row gap-[6px] overflow-x-auto whitespace-nowrap p-[6px]">
        <button
          className={`relative  flex min-h-[80px] min-w-[80px] rounded-[4px] ${0 === current && 'outline outline-1  '} `}
          onClick={() => scrollTo(0)}
        >
          <Image
            src={selectedProduct.feature as string}
            alt={`Additional images of the ${selectedProduct.display_id} cover`}
            width={80}
            height={80}
            priority
            // placeholder="blur"
          />
        </button>
        <button
          className={`relative flex aspect-square min-h-[80px] min-w-[80px] items-center justify-center rounded-[4px] ${1 === current && 'outline outline-1  '} `}
          onClick={() => scrollTo(1)}
        >
          
        </button>
        {productImages.map((_, index) => (
          <CarouselPositionItem
            key={`Carousel-Caption-Item-${index + 2}`}
            index={index + 2}
          />
        ))}
      </div>
      <span
        id="seperator"
        className="flex h-[1px] w-full max-w-[89%] self-center bg-[#C8C7C7]"
      />
    </div>
  );
};
