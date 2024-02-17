'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { ChevronDown, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { TReviewData } from '@/lib/db';
import { ReviewChevronLeft, ReviewChevronRight } from './icons';
import WouldReccomend from './WouldReccomend';
import { Rating } from '@mui/material';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const ReviewImagesSheet = ({
  setReviewsOpen,
}: {
  setReviewsOpen: (e: boolean) => void;
}) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewsWithImages = useStore(store, (s) => s.reviewImages);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<TReviewData | null>(null);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [currentTop, setCurrentTop] = useState(-100);
  const maxTop = 80;

  const container = document.getElementById('customer-review-gallery');
  function onMouseDrag({ movementY }: { movementY: number }) {
    const topValue = parseInt(String(container?.style.top));
    if (topValue > maxTop || topValue < maxTop) {
      return;
    }
    if (container) {
      container.style.top = `${topValue + movementY}px`;
      setCurrentTop(topValue + movementY);
    }
  }
  container?.addEventListener('mousedown', () => {
    container?.addEventListener('mousemove', onMouseDrag);
  });
  document.addEventListener('mouseup', () => {
    container?.removeEventListener('mousemove', onMouseDrag);
  });
  if (!reviewsWithImages) return null;

  return (
    <>
      <div className="flex items-center justify-between px-2 pb-3.5">
        <p className="text-[18px] font-[700] leading-6">Review Images</p>
        <div onClick={() => setReviewsOpen(false)}>
          <X />
        </div>
      </div>

      <span className="grid h-fit max-h-fit grid-cols-3 gap-2 overflow-y-scroll px-2 pb-2 lg:grid-cols-6 lg:gap-[15px]">
        {reviewsWithImages.map((item, index) => {
          return (
            <>
              {item.review_image?.split(',').map(
                (image) =>
                  image && (
                    <Image
                      id={`customer-tabs-image-${index}`}
                      key={`placeholder-customer-image-${index}`}
                      alt={`customer-tabs-image-${index}`}
                      width={109}
                      height={109}
                      className="aspect-square h-full w-full cursor-pointer rounded-[3px]"
                      src={image}
                      onClick={() => {
                        setReviewDialogOpen(true);
                        setCurrentReview(item);
                      }}
                      onError={() => {
                        console.log('image error', image);
                      }}
                    />
                  )
              )}
            </>
          );
        })}
      </span>
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent
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
                  .map(() => (
                    <Separator key={''} className="h-0.5 bg-slate-200" />
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
                    value={5}
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
                <WouldReccomend />
              </div>

              <div className="flex flex-col pt-1.5 lg:mt-0 lg:gap-[104px]">
                <div
                  className={` ${!moreDetailsOpen && 'line-clamp-3'}  text-[16px] leading-[28px] text-[#DBDBDB] lg:flex lg:text-[18px] `}
                >
                  {currentReview.review_description}
                </div>
                <ChevronDown
                  color="white"
                  className={`mb-[30px] ${moreDetailsOpen ? 'hidden' : 'flex'} mt-[10px] self-end justify-self-end`}
                  onClick={() => {
                    setMoreDetailsOpen(true);
                  }}
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="my-2 leading-6 text-[#767676] ">
                  {currentReview.review_author}
                </div>
                <div className="flex items-center gap-1.5 text-[#DBDBDB]">
                  <ThumbsUpIcon />
                  <p>Helpful</p>
                  <p>({currentReview.helpful})</p>
                </div>
              </div> */}
              <div className={`${moreDetailsOpen ? 'hidden' : 'block'}`}>
                <Carousel>
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
                    className="absolute left-4  border-none bg-transparent  "
                  >
                    <ReviewChevronLeft />
                  </CarouselPrevious>
                  <CarouselNext
                    variant={'link'}
                    className="absolute right-4  border-none bg-transparent "
                  >
                    <ReviewChevronRight />
                  </CarouselNext>
                </Carousel>
              </div>

              <div
                className={`absolute bottom-[${currentTop}px] w-full px-4`}
                id="customer-reviews-gallery"
              >
                <p className="py-4 text-[14px] font-[500] leading-[16px] text-white">
                  Customer Reviews
                </p>
                <span className="no-scrollbar flex w-full gap-2 overflow-x-auto ">
                  {reviewsWithImages.map(
                    (item, index) =>
                      item && (
                        <Image
                          id={`customer-tabs-image-${index}`}
                          key={`placeholder-customer-image-${index}`}
                          alt={`customer-tabs-image-${index}`}
                          width={109}
                          height={109}
                          className={`aspect-square h-full w-full ${item === currentReview && 'border-w border-2'} cursor-pointer rounded-[3px]`}
                          src={String(item.review_image?.split(',')[0])}
                          onClick={() => {
                            setReviewDialogOpen(true);
                            setCurrentReview(item);
                          }}
                          onError={() => {
                            console.log('image error', item);
                          }}
                        />
                      )
                  )}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewImagesSheet;
