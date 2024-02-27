import { useCallback, useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { FaCamera } from 'react-icons/fa';
import ReviewImagesSheet from '@/components/PDP/components/ReviewImagesSheet';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
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

  const carouselItems = [...productImages];
  carouselItems.splice(3, 0, String(SevenSecVideoThumbnail));

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
        alt=""
      />
    </button>
  );

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
        </CarouselContent>
      </Carousel>
      <div className="flex h-full w-full items-center">
        <div className=" flex w-3/4 flex-row gap-[6px] overflow-x-auto whitespace-nowrap p-[6px]">
          {carouselItems.map((item, index) => {
            if (index < 1)
              return (
                <div
                  key={selectedProduct.mainImage}
                  className={`relative flex min-h-[80px]  min-w-[80px] cursor-pointer items-center justify-center rounded-[4px] ${0 === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    src={selectedProduct.mainImage as string}
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
                  key={String(SevenSecVideoThumbnail)}
                  id="video-thumbnail"
                  className={`relative flex aspect-square min-h-[80px] min-w-[80px] cursor-pointer items-center justify-center rounded-[4px] ${index === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    id="video-thumbnail"
                    alt="Video Thumbnail"
                    slot="poster"
                    src={SevenSecVideoThumbnail}
                    width={74}
                    height={74}
                    aria-hidden="true"
                  />
                </div>
              );
            }
            return (
              <CarouselPositionItem
                key={String(carouselItems[index])}
                src={item}
                index={index}
              />
            );
          })}
        </div>
        <ReviewImagesSheet>
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
        </ReviewImagesSheet>
      </div>
    </div>
  );
};
