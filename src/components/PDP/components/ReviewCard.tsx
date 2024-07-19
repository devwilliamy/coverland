import { useMediaQuery } from '@mui/material';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import WouldRecomend from './WouldRecomend';
import ReviewCardGallery from './ReviewCardGallery';
import { useCallback, useEffect, useState } from 'react';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TReviewData } from '@/lib/types/review';

export default function ReviewCard({
  review,
  fullGallery,
}: {
  review: TReviewData;
  fullGallery?: boolean;
}) {
  const [pdpMoreTextOpen, setPdpMoreTextOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const reviewImagesSplit = review.review_image?.split(',');
  const [imageLoading, setImageLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 375px)');
  const isMobile2 = useMediaQuery('(max-width: 430px)');
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    // Currently if you try to click on an image, it's like it tries to scroll to it
    // But doesn't. Weird thing is when you click on it, it finishes going to it. Not sure what's going on.

    // api && scrollTo(selectedImageIndex);
    // api.on('scroll', () => {
    //   setSelectedImageIndex(api.selectedScrollSnap());
    // });

    const onSelect = () => {
      setSelectedImageIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, selectedImageIndex, setSelectedImageIndex, scrollTo]);
  // const store = useContext(CarSelectionContext);

  function ReadMore() {
    return (
      <div className="flex items-center gap-1">
        {pdpMoreTextOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        <p className="text-[14px]">
          {pdpMoreTextOpen ? 'Read Less' : 'Read More'}
        </p>
        {pdpMoreTextOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>
    );
  }

  const determineMaxReviewLength = () => {
    switch (true) {
      case isMobile:
        if (review && review.review_description) {
          return review?.review_description?.length > 148;
        }
      case isMobile2:
        if (review && review.review_description) {
          return review?.review_description?.length > 153;
        }
      default:
        if (review && review.review_description) {
          return review?.review_description?.length > 163;
        }
        return false;
    }
  };

  return (
    <div
      className={`relative flex h-full w-full min-w-full flex-col justify-between ${moreOpen ? 'overflow-auto overflow-y-auto' : 'overflow-hidden'} rounded ${!fullGallery && 'border-2 '} ${!fullGallery ? 'p-4' : 'px-4 '} `}
    >
      <div className="text-[16px] font-bold lg:text-[30px]  ">
        {review.review_title
          ? review.review_title.charAt(0).toUpperCase() +
            review.review_title?.slice(1)
          : ''}
        {/* {review.review_title} */}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1 text-yellow-300 lg:my-0">
          <ReviewRatingStar rating={Number(review.rating_stars)} />
        </div>

        <div className="text-[12px] font-light normal-case text-neutral-500 ">
          {review?.reviewed_at &&
            new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
        </div>
      </div>

      <div className="flex gap-4 text-[12px] leading-[24px]">
        <p className="text-[#1D8044]">Verified Purchase</p>
        {review.rating_stars && review.rating_stars >= 3 ? (
          <WouldRecomend />
        ) : null}
      </div>

      <div className="flex justify-between pt-0.5 lg:mt-0 lg:gap-[104px]">
        <div
          className={`${!pdpMoreTextOpen && isMobile && 'line-clamp-3'}  text-[14px] leading-[28px] text-[#1A1A1A] lg:flex lg:text-[18px] `}
        >
          {review?.review_description?.replace(/�/g, ' ')}
        </div>
      </div>

      {review.review_description && determineMaxReviewLength() && isMobile && (
        <div className="flex w-full items-center justify-center">
          <div
            className="flex flex-col items-center"
            onClick={() => {
              setPdpMoreTextOpen((prev) => !prev);
            }}
          >
            {/* {review.review_description.length} */}
            <ReadMore />
          </div>
        </div>
      )}

      {!fullGallery && (
        <div className="flex items-center justify-between text-[14px]">
          <div className="my-1 leading-6 text-[#767676] ">
            {review.review_author}
          </div>
          <div
            className={`flex items-center gap-1.5 ${isHelpful ? 'text-[#1D8044]' : ''} cursor-pointer `}
            onClick={() => {
              setIsHelpful((e) => {
                return !e;
              });
            }}
          >
            {isHelpful ? <FaThumbsUp fill="#1D8044" /> : <FaRegThumbsUp />}

            <p>Helpful</p>
            <p>
              ({isHelpful ? Number(review?.helpful) + 1 : review.helpful ?? 0})
            </p>
          </div>
        </div>
      )}
      <div id="review-card-footer" className="mt-auto flex flex-col gap-2">
        {review.review_image && fullGallery ? (
          <ReviewCardGallery
            reviewImages={review?.review_image}
            review={review as TReviewData}
            moreOpen={moreOpen}
            setMoreOpen={setMoreOpen}
          />
        ) : (
          <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
            <span className="flex gap-2 overflow-x-auto">
              {reviewImagesSplit?.map((image, index) => {
                if (image)
                  return (
                    <DialogTrigger
                      key={`review-card-image-${index}`}
                      onClick={() => {
                        if (!imageLoading) {
                          setImageLoading(true);
                        }
                        setSelectedImageIndex(index);
                      }}
                    >
                      <Image
                        height={160}
                        width={160}
                        className="flex aspect-square items-center object-cover"
                        alt="review-card-image-trigger"
                        src={image}
                        onError={() => {
                          console.error(
                            `Image: review-card-image-${index} |  ERROR | `,
                            image
                          );
                        }}
                      />
                    </DialogTrigger>
                  );
              })}
            </span>

            <DialogContent
              id="review-modal"
              className="flex aspect-square min-w-[100vw] flex-col items-center justify-center rounded-lg md:min-w-[45vw]"
            >
              <div className="absolute right-0 top-0 ">
                <X
                  className=""
                  onClick={() => {
                    setReviewDialogOpen(false);
                  }}
                />
              </div>
              <div className="relative flex min-w-full">
                {imageLoading && (
                  <div className="flex h-96 min-w-full animate-pulse items-center justify-center rounded-md bg-[#F0F0F0]/50">
                    <AiOutlineLoading3Quarters
                      className="animate-spin"
                      fill="#BE1B1B"
                      opacity={0.5}
                    />
                  </div>
                )}
                <Carousel
                  setApi={setApi}
                  onLoad={() => {
                    setImageLoading(false);
                  }}
                >
                  <CarouselContent>
                    {reviewImagesSplit?.map((img, index) => (
                      <CarouselItem key={`selected-review-card-image-${index}`}>
                        <Image
                          width={800}
                          height={800}
                          className="flex aspect-square items-center object-cover"
                          alt="selected-review-card-image-alt"
                          src={img}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {api?.canScrollPrev() && (
                    <CarouselPrevious
                      size={'icon'}
                      className="left-0 border-none bg-transparent hover:bg-transparent md:-left-20"
                      onClick={() => {
                        api.scrollPrev();
                        setSelectedImageIndex((i) => i - 1);
                      }}
                    >
                      <ChevronLeft size={40} stroke="white" />
                    </CarouselPrevious>
                  )}
                  {api?.canScrollNext() && (
                    <CarouselNext
                      className="right-0 border-none bg-transparent hover:bg-transparent md:-right-20"
                      onClick={() => {
                        api.scrollNext();
                        setSelectedImageIndex((i) => i + 1);
                      }}
                    >
                      <ChevronRight size={40} stroke="white" />
                    </CarouselNext>
                  )}
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
