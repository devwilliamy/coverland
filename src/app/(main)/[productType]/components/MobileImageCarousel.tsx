'use client';
import ReviewImagesSheet from '@/components/PDP/components/ReviewImagesSheet';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

// --------- Listing Videos
import CarListing from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import SUVListing from '@/videos/7sec Listing Video_Compressed.mp4';
import TruckListingVideo from '@/videos/Truck Listing Video.mp4';
import ChallengerListingVideo from '@/videos/Challenger 360 Square.mp4';
import CorvetteListingVideo from '@/videos/Corvette 360 Video Square.mp4';

// --------- Listing Thumbnails
import Car360Thumb from '@/images/PDP/Product-Details-Redesign-2/car-360-thumb.webp';
import TruckListingThumb from '@/images/PDP/Product-Details-Redesign-2/truck-7-thumb.webp';
import SUVListingThumb from '@/video/7second image.webp';
import ChallengerListingThumb from '@/images/PDP/PDP-Redesign-v3/challenger-thumbnail.webp';
import CorvetteListingThumb from '@/images/PDP/PDP-Redesign-v3/corvette-thumbnail.webp';

import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useDetermineType from '@/hooks/useDetermineType';
import { Play } from 'lucide-react';
import { Asset } from 'next-video/dist/assets.js';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaCamera } from 'react-icons/fa';
import { useStore } from 'zustand';
import { removeWwwFromUrl } from '@/utils';
import { CarouselPositionItem } from './MobileCarouselPositionItem';
import ReactPlayer from 'react-player';
import { useMediaQuery } from '@mantine/hooks';

const ProductVideo = dynamic(() => import('@/components/PDP/ProductVideo'), {
  loading: () => (
    <div className="flex h-full">
      <Skeleton />
    </div>
  ),
  ssr: false,
});

const MobileImageCarousel = () => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const productImages = selectedProduct?.productImages as string[];
  const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { productType, model } = useDetermineType();
  let baseListingVideo = CarListing;
  let baseListingVideoThumbnail = Car360Thumb;

  const isCorvette = model === 'corvette';
  const isChallenger = model === 'challenger';
  const ChallengerOrDefaultVideo = isChallenger
    ? ChallengerListingVideo
    : baseListingVideo;
  const ChallengerOrDefaultThumbnail = isChallenger
    ? ChallengerListingThumb
    : baseListingVideoThumbnail;
  const featured360 = isCorvette
    ? CorvetteListingVideo
    : ChallengerOrDefaultVideo;
  const listingVideoThumbnail = isCorvette
    ? CorvetteListingThumb
    : ChallengerOrDefaultThumbnail;
  // const mainListing =
  //   !isChallenger && !isCorvette ? baseListingVideo : featured360;

  const carouselItems = useMemo(() => {
    const items = [...productImages];
    items.splice(3, 0, String(baseListingVideoThumbnail));
    return items;
  }, [productImages, baseListingVideoThumbnail]);

  useEffect(() => {
    if (!api) {
      return;
    }
    switch (productType) {
      case 'truck-covers': {
        baseListingVideo = TruckListingVideo;
        baseListingVideoThumbnail = TruckListingThumb;
        break;
      }
      case 'suv-covers': {
        baseListingVideo = SUVListing;
        baseListingVideoThumbnail = SUVListingThumb;
        break;
      }
      default: {
        baseListingVideo = CarListing;
        baseListingVideoThumbnail = Car360Thumb;
        break;
      }
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

  const handleCarouselItemClick = (index: number) => {
    scrollTo(index);
  };

  useEffect(() => {
    console.log('Selected Product:', selectedProduct);
  }, []);

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
                        '?v=1') as string
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
                <CarouselItem key={String(baseListingVideo)} className='bg-black'>
                  {/* <ProductVideo
                    src={featured360}
                    imgSrc={listingVideoThumbnail}
                    autoplay
                    loop
                  /> */}
                  <Suspense>
                    <ReactPlayer
                      controls={true}
                      muted
                      autoplay
                      loop
                      playsinline
                      playing
                      width="100%"
                      height="100%"
                      url={(selectedProduct?.product_video_carousel as string).substring((selectedProduct?.product_video_carousel as string).indexOf('/video'))  || ''}
                      // light={
                      //   selectedProduct?.product_video_carousel_thumbnail || ''
                      // }
                    />
                  </Suspense>
                </CarouselItem>
              );
            }
            return (
              <CarouselItem key={image}>
                <Image
                  src={removeWwwFromUrl(image) + '?v=1'}
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
        <span
          id="carousel-position-item-selector"
          className=" flex w-3/4 flex-row gap-[4px] overflow-x-auto whitespace-nowrap py-[6px] pl-[6px]"
        >
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
                        '?v=1') as string
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
                    src={
                      selectedProduct?.product_video_carousel_thumbnail || ''
                    }
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
                current={current}
                handleClick={handleCarouselItemClick}
              />
            );
          })}
        </span>
        <ReviewImagesSheet>
          <div
            className={` flex h-full min-h-[80px] w-1/4 min-w-[80px] max-w-[25%] items-center justify-center rounded-[4px] bg-[#F2F2F2] `}
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
export default MobileImageCarousel;
