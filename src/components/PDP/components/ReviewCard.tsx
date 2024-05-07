import { TReviewData } from '@/lib/db';
import { useMediaQuery } from '@mui/material';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import WouldRecomend from './WouldRecomend';
import ReviewCardGallery from './ReviewCardGallery';
import { useEffect, useState } from 'react';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

export default function ReviewCard({
  review,
  fullGallery,
}: {
  review: TReviewData;
  fullGallery?: boolean;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreTextOpen, setMoreTextOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const reviewImagesSplit = review.review_image?.split(',');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  // const store = useContext(CarSelectionContext);

  return (
    <div
      className={`relative flex h-full w-full min-w-full flex-col justify-between ${moreOpen ? 'overflow-auto overflow-y-auto' : 'overflow-hidden'} rounded ${!fullGallery && 'border-2 '} ${!fullGallery ? 'p-4' : 'px-4 '} `}
    >
      <div className="text-xl font-bold normal-case text-neutral-700 max-md:max-w-full lg:text-3xl">
        {review.review_title
          ? review.review_title.charAt(0).toUpperCase() +
            review.review_title?.slice(1)
          : ''}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1 text-yellow-300 lg:my-0">
          <ReviewRatingStar rating={Number(review.rating_stars)} />
        </div>
        <div className="text-sm font-light normal-case text-neutral-500">
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
      <div className="flex pt-1.5 lg:mt-0 lg:gap-[104px]">
        <div
          className={`${moreTextOpen ? '' : 'line-clamp-3'}  text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:text-[18px] `}
        >
          {review.review_description}
        </div>
      </div>
      {review.review_description &&
        review.review_description.length > 115 &&
        isMobile && (
          <div className="flex w-full items-center justify-center">
            <div
              className="flex flex-col items-center"
              onClick={() => {
                setMoreTextOpen((e) => {
                  return !e;
                });
              }}
            >
              {moreTextOpen ? <ChevronUp /> : <ChevronDown />}
              <p>{moreTextOpen ? 'Read Less' : 'Read More'}</p>
            </div>
          </div>
        )}
      {!fullGallery && (
        <div className="flex items-center justify-between">
          <div className="my-2 leading-6 text-[#767676] ">
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
            <p>({review.helpful})</p>
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
                return (
                  <DialogTrigger
                    onClick={() => {
                      const thisImage = reviewImagesSplit[index];
                      if (!imageLoaded) {
                        console.log('Loading');
                        setImageLoading(true);
                      }
                      setSelectedImage(thisImage);
                    }}
                  >
                    <Image
                      key={`review-card-image-${index}`}
                      height={160}
                      width={160}
                      className="flex aspect-square items-center"
                      alt="review-card-image-trigger"
                      src={image}
                    />
                  </DialogTrigger>
                );
              })}
            </span>
            <DialogContent
              id="review-modal"
              className="flex aspect-square min-w-[100vw] flex-col items-center justify-center rounded-lg lg:min-w-[45vw] "
            >
              <div className="relative flex min-h-full min-w-full">
                {imageLoading && (
                  <div className="flex min-h-full min-w-full animate-pulse items-center justify-center rounded-md bg-[#BE1B1B]/50">
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
                    console.log('Finish:', { imageLoading });
                    setImageLoaded(true);
                    setImageLoading(false);
                  }}
                >
                  <CarouselContent>
                    {reviewImagesSplit?.map((img) => (
                      <CarouselItem>
                        <Image
                          key={`selected-review-card-image`}
                          width={800}
                          height={800}
                          className="flex aspect-square h-full w-full items-center"
                          alt="selected-review-card-image-alt"
                          src={img}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {api?.canScrollPrev() && (
                    <CarouselPrevious className="left-0" />
                  )}
                  {api?.canScrollNext() && <CarouselNext className="right-0" />}
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
