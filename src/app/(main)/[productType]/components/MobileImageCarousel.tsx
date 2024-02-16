import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { IProductData } from '../../utils';
import dynamic from 'next/dynamic';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Asset } from 'next-video/dist/assets.js';
import SevenSecVideoThumbnail from '@/video/7second image.webp';
import SevenSecVideo from '@/videos/7sec Listing Video_2.mp4';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  ssr: false,
});

export const MobileImageCarousel = ({
  selectedProduct,
  productImages,
}: {
  selectedProduct: IProductData;
  productImages: string[];
  setFeaturedImage?: (img: string) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  console.log(productImages);

  const carouselItems = productImages.toSpliced(
    3,
    0,
    String(SevenSecVideoThumbnail)
  );

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
    <div className="flex max-w-full flex-col bg-white ">
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
                    src={selectedProduct.mainImage as string}
                    alt={`Additional images of the ${selectedProduct.display_id} cover`}
                    width={500}
                    height={500}
                    priority
                    // placeholder="blur"
                  />
                </CarouselItem>
              );
            if (index === 3) {
              return (
                <CarouselItem key={String(SevenSecVideo)}>
                  <ProductVideo src={SevenSecVideo} autoplay loop />
                </CarouselItem>
              );
            }
            return (
              <CarouselItem key={image}>
                <Image
                  src={image}
                  alt={`Additional images of the ${selectedProduct.display_id} cover`}
                  width={500}
                  height={500}
                  // placeholder="blur"
                  onError={() => console.log('Failed image:', `${image}`)}
                />
              </CarouselItem>
            );
          })}
          {/* {productImages.map((image, index) => {
            if (index < 1) return;
            if (index === 2) {
              return (
                <>
                  <CarouselItem key={`carousel-image-${index}`}>
                    <Image
                      src={image}
                      alt={`Additional images of the ${selectedProduct.display_id} cover`}
                      width={500}
                      height={500}
                      // placeholder="blur"
                      onError={() => console.log('Failed image:', `${image}`)}
                    />
                  </CarouselItem>
                  <CarouselItem
                    key={'carousel-first-image'}
                    className="bg-[#F2F2F2]"
                  >
                    <Image
                      src={image}
                      alt={`Additional images of the ${selectedProduct.display_id} cover`}
                      width={500}
                      height={500}
                      priority
                      // placeholder="blur"
                    />
                  </CarouselItem>
                  <CarouselItem key={`carousel-video-${index}`}>
                    <ProductVideo src={SevenSecVideo} autoplay loop />
                  </CarouselItem>
                </>
              );
            }

            return (
              <CarouselItem key={`carousel-image-${index}`}>
                <Image
                  src={image}
                  alt={`Additional images of the ${selectedProduct.display_id} cover`}
                  width={500}
                  height={500}
                  // placeholder="blur"
                  onError={() => console.log('Failed image:', `${image}`)}
                />
              </CarouselItem>
            );
            // }
          })} */}
        </CarouselContent>
      </Carousel>
      <div className="mb-[16px] flex flex-row gap-[6px] overflow-x-auto whitespace-nowrap p-[6px]">
        {carouselItems.map((_, index) => {
          if (index < 1)
            return (
              <button
                key={selectedProduct.mainImage}
                className={`relative  flex min-h-[80px] min-w-[80px] rounded-[4px] ${0 === current && 'outline outline-1  '} `}
                onClick={() => scrollTo(0)}
              >
                <Image
                  src={selectedProduct.mainImage as string}
                  alt={`Additional images of the ${selectedProduct.display_id} cover`}
                  width={80}
                  height={80}
                  priority
                  // placeholder="blur"
                />
              </button>
            );
          if (index === 3) {
            return (
              <button
                key={String(SevenSecVideoThumbnail)}
                id="video-thumbnail"
                className={`relative flex aspect-square min-h-[80px] min-w-[80px] items-center justify-center rounded-[4px] ${index === current && 'outline outline-1  '} `}
                onClick={() => scrollTo(index)}
              >
                <Image
                  id="video-thumbnail"
                  alt="Video Thumbnail"
                  slot="poster"
                  src={SevenSecVideoThumbnail}
                  width={80}
                  height={80}
                  aria-hidden="true"
                />
              </button>
            );
          }
          return (
            <CarouselPositionItem
              key={String(productImages[index])}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
