'use client';

import { Fragment, useContext, useEffect, useState } from 'react';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import ReviewImagesSheet from './ReviewImagesSheet';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, X } from 'lucide-react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ReviewChevronLeft, ReviewChevronRight } from './icons';
import { TReviewData } from '@/lib/db/review';
import ReviewCard from './ReviewCard';

export default function ReviewHeaderGallery() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  let imageCount = 0;

  for (const obj of reviewImages) {
    if (obj && obj.review_image) {
      obj.review_image.split(',').map(() => {
        imageCount++;
      });
    }
  }

  // const reviewImageKeys = Object.keys(reviewImages);

  return (
    <div className="flex flex-col items-center">
      {reviewImages && (
        <div className=" flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676] lg:pb-[14px]  lg:pt-[70px]">
          {imageCount} Review Images
        </div>
      )}
      {/* {reviewImages.length > 0 && (
        <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
          {reviewImages?.slice(0, 3).map((image, index) => {
            return (
              <div key={`review-header-image-${index}`}>
                <Image
                  src={String(image.review_image?.split(',')[0])}
                  alt="Car Cover Review Image"
                  width={207}
                  height={207}
                  className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                />
              </div>
            );
          })}
          {reviewImages.length > 0 ? (
            <div className="flex h-full w-full items-center justify-center border border-black">
              <div className="font-normalc text-center text-base normal-case underline ">
                <SeeMoreImages />
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      )} */}
      {reviewImages?.length > 0 && (
        <>
          <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
            {reviewImages?.slice(0, 3).map((image, index) => {
              return (
                <div key={`review-header-image-${index}`}>
                  <Image
                    src={String(image.review_image?.split(',')[0])}
                    alt="Car Cover Review Image"
                    width={207}
                    height={207}
                    className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                  />
                </div>
              );
            })}
            {reviewImages?.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center border border-black">
                <div className="font-normalc text-center text-base normal-case underline ">
                  <SeeMoreImages />
                </div>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section className="hidden max-h-fit w-full items-center gap-[7px] lg:grid lg:max-h-[207px] lg:grid-cols-6">
            {reviewImages?.slice(0, 5).map((image, index) => {
              return (
                <div key={`review-header-image-${index}`}>
                  <Image
                    src={String(image.review_image?.split(',')[0])}
                    alt="Car Cover Review Image"
                    width={207}
                    height={207}
                    className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                  />
                </div>
              );
            })}
            <div className="flex h-full w-full items-center justify-center border border-black">
              <div className="font-normalc text-center text-base normal-case underline ">
                <SeeMoreImages />
              </div>
            </div>
            {/* {reviewImages.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center border border-black">
                <div className="font-normalc text-center text-base normal-case underline ">
                  <SeeMoreImages />
                </div>
              </div>
            ) : (
              <></>
            )} */}
          </section>
        </>
      )}
    </div>
  );
}

const SeeMoreImages = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('scroll', () => setCurrentReviewImage(api.selectedScrollSnap()));

    api.on('init', () => {
      api && api.scrollTo(currentReviewImage, true);
      // api && api.slideNodes().at(currentReviewImage);
    });
  });
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [innerReviewDialogOpen, setInnerReviewDialogOpen] =
    useState<boolean>(false);
  const [currentReview, setCurrentReview] = useState<TReviewData | null>(null);
  const [currentReviewImage, setCurrentReviewImage] = useState(0);

  return (
    <>
      <div className="hidden lg:block">
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger className="underline">
            See more <br /> review images
          </DialogTrigger>
          <DialogContent className="flex min-h-[65vh] flex-col items-center lg:min-w-[77vw] lg:max-w-[80%]">
            {/* <CustomerReviewTabs /> */}
            {/* <div className="">
              
            </div> */}
            <div className="flex w-full justify-between">
              <div
                className="flex items-center gap-4"
                onClick={() => setInnerReviewDialogOpen(false)}
              >
                <ChevronLeft />
                {innerReviewDialogOpen ? (
                  <p className="py-3 text-[22px] font-[700] leading-[24px]">
                    All Photos
                  </p>
                ) : (
                  <p className="py-3 text-[22px] font-[700] leading-[24px]">
                    Review Images
                  </p>
                )}
              </div>
              <div className="">
                <X onClick={() => setReviewDialogOpen(false)} />
              </div>
            </div>
            {!innerReviewDialogOpen ? (
              <div className="flex w-full flex-col">
                <div className="grid w-full grid-cols-4 gap-3 overflow-y-auto">
                  {reviewImages.map((imageData) => {
                    return (
                      <Fragment key={'image-group-' + imageData.review_image}>
                        {imageData.review_image?.split(',').map(
                          (imgStr, index) =>
                            imgStr && (
                              <Image
                                id={`customer-tabs-image-${index}`}
                                key={imgStr}
                                alt={`customer-tabs-image-${index}`}
                                width={109}
                                height={109}
                                className="aspect-square h-full w-full cursor-pointer rounded-[3px]"
                                src={imgStr}
                                onClick={() => {
                                  setInnerReviewDialogOpen(true);
                                  setCurrentReview(imageData);
                                  setCurrentReviewImage(() => {
                                    api && api.scrollTo(index);
                                    return index;
                                  });
                                }}
                                onError={() => {
                                  console.log('image error', imgStr);
                                }}
                              />
                            )
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex h-full">
                <Carousel setApi={setApi}>
                  <CarouselContent className="relative flex h-full w-1/2 ">
                    {currentReview.review_image
                      ?.split(',')
                      .map((img, index) => (
                        <CarouselItem
                          key={img}
                          className="flex w-full place-items-center"
                        >
                          <Image
                            id={`customer-modal-image-${index}`}
                            alt={`customer-modal-image-${index}`}
                            width={520}
                            height={520}
                            className="aspect-square h-full w-full cursor-pointer rounded-[3px]"
                            src={img}
                            onError={() => {
                              console.log('image error', img);
                            }}
                          />
                        </CarouselItem>
                      ))}
                  </CarouselContent>

                  {api?.canScrollPrev() && (
                    <CarouselPrevious
                      variant={'link'}
                      className={`absolute left-4  border-none bg-transparent  `}
                      onClick={() => {
                        api.scrollPrev();
                        setCurrentReviewImage((i) => i - 1);
                      }}
                    >
                      <ReviewChevronLeft />
                    </CarouselPrevious>
                  )}
                  {api?.canScrollNext() && (
                    <CarouselNext
                      variant={'link'}
                      className="absolute right-4  border-none bg-transparent "
                      onClick={() => {
                        api.scrollNext();
                        setCurrentReviewImage((i) => i + 1);
                      }}
                    >
                      <ReviewChevronRight />
                    </CarouselNext>
                  )}
                </Carousel>
                <div className="w-1/2">
                  <ReviewCard review={currentReview as TReviewData} />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="lg:hidden">
        <ReviewImagesSheet />
      </div>
    </>
  );
};
