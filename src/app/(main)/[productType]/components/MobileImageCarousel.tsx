import ReviewImagesSheet from '@/components/PDP/components/ReviewImagesSheet';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import Car360Thumb from '@/images/PDP/Product-Details-Redesign-2/car-360-thumb.webp';
import TruckListingThumb from '@/images/PDP/Product-Details-Redesign-2/truck-7-thumb.webp';
import SUVListingThumb from '@/video/7second image.webp';
import Car360 from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import TruckListingVideo from '@/videos/Truck Listing Video.mp4';
import SUVListing from '@/videos/7sec Listing Video_Compressed.mp4';
import { Play } from 'lucide-react';
import { FaCamera } from 'react-icons/fa';
import { Asset } from 'next-video/dist/assets.js';
import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { IProductData, removeWwwFromUrl } from '../../utils';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
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
  const params = useParams();
  const productType = params?.productType;
  let carouselVideo: Asset;
  let carouselVideoThumb: StaticImageData;

  switch (productType) {
    case 'truck-covers': {
      carouselVideo = TruckListingVideo;
      carouselVideoThumb = TruckListingThumb;
      break;
    }
    case 'suv-covers': {
      carouselVideo = SUVListing;
      carouselVideoThumb = SUVListingThumb;
      break;
    }
    default: {
      carouselVideo = Car360;
      carouselVideoThumb = Car360Thumb;
      break;
    }
  }

  const carouselItems = [...productImages];
  carouselItems.splice(3, 0, String(carouselVideoThumb));

  useEffect(() => {
    if (!api) {
      return;
    }

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
        src={removeWwwFromUrl(src as string) + '?v=5'}
        sizes="(max-width: 768px) 100vw"
        alt={`carousel-position-item-${index}`}
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
                    src={
                      (removeWwwFromUrl(selectedProduct.mainImage as string) +
                        '?v=5') as string
                    }
                    alt={`Additional images of the ${selectedProduct.display_id} cover`}
                    width={500}
                    height={500}
                    priority
                    // placeholder="blur"
                    className="h-auto w-full"
                  />
                </CarouselItem>
              );
            if (index === 3) {
              return (
                <CarouselItem key={String(carouselVideo)}>
                  <ProductVideo
                    src={carouselVideo}
                    imgSrc={carouselVideoThumb}
                    autoplay
                    loop
                  />
                </CarouselItem>
              );
            }
            return (
              <CarouselItem key={image}>
                <Image
                  src={removeWwwFromUrl(image) + '?v=5'}
                  alt={`Additional images of the ${selectedProduct.display_id} cover`}
                  width={500}
                  height={500}
                  onError={() => {
                    console.log('Failed image:', `${image}`);
                  }}
                  className="h-auto w-full"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex h-full w-full items-center">
        <div className=" flex w-3/4 flex-row gap-[4px] overflow-x-auto whitespace-nowrap p-[6px]">
          {carouselItems.map((item, index) => {
            if (index < 1)
              return (
                <div
                  key={selectedProduct.mainImage}
                  className={`relative flex min-h-[80px]  min-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px] ${0 === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    src={
                      (removeWwwFromUrl(selectedProduct.mainImage as string) +
                        '?v=5') as string
                    }
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
                  key={String(SUVListingThumb)}
                  id="video-thumbnail"
                  className={`relative flex aspect-square min-h-[80px] min-w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px] p-0.5  ${productType === 'car-covers' && ''} ${index === current && 'outline outline-1  '} `}
                  onClick={() => scrollTo(index)}
                >
                  <Image
                    id="video-thumbnail"
                    alt="Video Thumbnail"
                    slot="poster"
                    src={carouselVideoThumb}
                    width={1600}
                    height={1600}
                    className="flex h-full w-full overflow-hidden rounded-[4px] object-cover"
                    aria-hidden="true"
                  />
                  <Play className="absolute rounded-full fill-white text-white" />
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
