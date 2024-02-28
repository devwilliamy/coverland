'use client';

import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { TReviewData } from '@/lib/db';
import { ReviewChevronLeft, ReviewChevronRight, ThumbsUpIcon } from './icons';
import WouldRecomend from './WouldRecomend';
import { Rating } from '@mui/material';
import { Separator } from '@/components/ui/separator';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const ReviewImageGallery = ({
  setReviewsOpen,
}: {
  setReviewsOpen: (e: boolean) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('scroll', (e) => setCurrentReviewImage(e.selectedScrollSnap()));
  });

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<TReviewData | null>(null);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [currentReviewImage, setCurrentReviewImage] = useState(0);

  if (!reviewImages) return null;

  return (
    <>
      <div className="flex items-center justify-between px-2 pb-3.5">
        <p className="text-[18px] font-[700] leading-6">Review Images</p>
        <div onClick={() => setReviewsOpen(false)}>
          <X />
        </div>
      </div>

      <span className="grid h-fit max-h-fit grid-cols-3 gap-2 overflow-y-scroll px-2 pb-2 lg:grid-cols-6 lg:gap-[15px]">
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
                        setReviewDialogOpen(true);
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
      </span>
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent
          id="review-modal"
          onClick={() => {
            moreDetailsOpen && setMoreDetailsOpen(false);
          }}
          className="absolute top-0 h-screen w-screen bg-black/95"
        >
          {currentReview && (
            <div className="flex flex-col px-2">
              <div className="grid grid-flow-col grid-rows-1 gap-[10px] px-5 py-6">
                {currentReview.review_image
                  ?.split(',')
                  .map((i, index) => (
                    <Separator
                      key={i + '-separator'}
                      className={`h-0.5  ${index === currentReviewImage ? 'bg-white' : 'bg-[#4E4E4E]'} `}
                    />
                  ))}
              </div>
              <div className="flex justify-end">
                <div
                  className="right-0 top-0 z-10"
                  onClick={() => {
                    setReviewDialogOpen(false);
                  }}
                >
                  <X color="white" />
                </div>
              </div>
              <div className="mt-2 text-[16px] leading-[18.75px] text-white">
                {currentReview.review_title
                  ? currentReview.review_title.charAt(0).toUpperCase() +
                    currentReview.review_title?.slice(1)
                  : ''}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 text-yellow-300 lg:my-0">
                  <Rating
                    name="read-only"
                    value={currentReview.rating_stars}
                    readOnly
                    style={{
                      height: '25px',
                    }}
                  />
                </div>
                <div className="text-sm font-light normal-case text-neutral-500 lg:hidden">
                  {currentReview?.reviewed_at &&
                    new Date(
                      currentReview?.reviewed_at ?? ''
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </div>
              </div>
              <div className="flex gap-4 text-[12px] leading-[24px]">
                <p className="text-[#1D8044]">Verified Purchase</p>
                <WouldRecomend />
              </div>

              <div className="flex flex-col pt-1.5 lg:mt-0 lg:gap-[104px]">
                <div
                  className={` ${!moreDetailsOpen && 'line-clamp-3'}  text-[16px] leading-[28px] text-[#DBDBDB] lg:flex lg:text-[18px] `}
                >
                  {currentReview.review_description}
                </div>
                {moreDetailsOpen && (
                  <div className="flex items-center justify-between">
                    <div className="my-2 leading-6 text-[#767676] ">
                      {currentReview.review_author}
                    </div>
                    <div className="flex items-center gap-1.5 text-white">
                      <ThumbsUpIcon fill="white" />
                      <p>Helpful</p>
                      <p>({currentReview.helpful})</p>
                    </div>
                  </div>
                )}
                {moreDetailsOpen ? (
                  <ChevronUp
                    color="white"
                    className={`mb-[30px]  mt-[10px] self-end justify-self-end`}
                  />
                ) : (
                  <ChevronDown
                    color="white"
                    className={`mb-[30px]  mt-[10px] self-end justify-self-end`}
                    onClick={() => {
                      setMoreDetailsOpen(true);
                    }}
                  />
                )}
              </div>

              <div className={`${moreDetailsOpen ? 'hidden' : 'block'}`}>
                <Carousel setApi={setApi}>
                  <CarouselContent className="relative ">
                    {currentReview.review_image
                      ?.split(',')
                      .map((img, index) => (
                        <CarouselItem
                          key={img}
                          className="flex place-items-center"
                        >
                          <Image
                            id={`customer-modal-image-${index}`}
                            alt={`customer-modal-image-${index}`}
                            width={109}
                            height={109}
                            className="aspect-square h-full w-full cursor-pointer rounded-[3px]"
                            src={img}
                            onError={() => {
                              console.log('image error', img);
                            }}
                          />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious
                    variant={'link'}
                    className={` absolute left-4 border-none`}
                    onClick={() => {
                      api?.scrollPrev();
                      setCurrentReviewImage((i) => i - 1);
                    }}
                  >
                    <ReviewChevronLeft />
                  </CarouselPrevious>
                  {/* {api?.canScrollPrev() && (
                    
                  )} */}
                  <CarouselNext
                    variant={'link'}
                    className="absolute right-4 border-none bg-transparent "
                    onClick={() => {
                      api?.scrollNext();
                      setCurrentReviewImage((i) => i + 1);
                    }}
                  >
                    <ReviewChevronRight />
                  </CarouselNext>
                  {/* {api?.canScrollNext() && (
                  )} */}
                </Carousel>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewImageGallery;
