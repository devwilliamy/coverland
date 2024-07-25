import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '@/components/ui/carousel';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useStoreContext from '@/hooks/useStoreContext';
import { TReviewData } from '@/lib/types/review';
import { useMediaQuery } from '@mantine/hooks';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useStore } from 'zustand';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';

function ReviewCardCarousel() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const reviewImages: TReviewData[] = useStore(store, (s) => s.reviewImages);

  // const reviewImageKeys = Object.keys(reviewImages);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const numImagesToShow = isMobile ? 3 : 5;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    // <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:grid lg:aspect-auto lg:h-auto lg:max-h-fit lg:grid-cols-6">
    <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
      {/* lg:max-h-[207px] */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        {reviewImages?.slice(0, numImagesToShow).map((image, index) => {
          if (image)
            return (
              <Fragment key={`review-card-image-${index}`}>
                <span className="flex gap-2 overflow-x-auto">
                  <DialogTrigger
                    onClick={() => {
                      const thisImage = reviewImages[index];
                      if (!imageLoading) {
                        setImageLoading(true);
                      }
                      setSelectedImage(
                        String(thisImage.review_image?.split(',')[0])
                      );
                    }}
                  >
                    <Image
                      height={270}
                      width={160}
                      className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                      alt="review-card-image-trigger"
                      src={String(image.review_image?.split(',')[0])}
                      onError={() => {
                        console.error(
                          `Image: review-card-image-${index} |  ERROR | `,
                          image
                        );
                      }}
                    />
                  </DialogTrigger>
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
                  <div className="relative flex min-h-full min-w-full">
                    {imageLoading && (
                      <div className="flex min-h-full min-w-full animate-pulse items-center justify-center rounded-md bg-[#F0F0F0]/50">
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
                        {reviewImages?.map((img, index) => (
                          <CarouselItem
                            key={`selected-review-card-image-${index}`}
                          >
                            <Image
                              width={800}
                              height={800}
                              className="flex aspect-square h-full w-full items-center"
                              alt="selected-review-card-image-alt"
                              src={String(img.review_image?.split(',')[0])}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {api?.canScrollPrev() && (
                        <CarouselPrevious
                          size={'icon'}
                          className="left-0 border-none bg-transparent hover:bg-transparent md:-left-20"
                        >
                          <ChevronLeft size={40} stroke="white" />
                        </CarouselPrevious>
                      )}
                      {api?.canScrollNext() && (
                        <CarouselNext className="right-0 border-none bg-transparent hover:bg-transparent md:-right-20">
                          <ChevronRight size={40} stroke="white" />
                        </CarouselNext>
                      )}
                    </Carousel>
                  </div>
                </DialogContent>
              </Fragment>
            );
        })}
      </Dialog>

      {reviewImages?.length > 0 && (
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="text-center text-base font-normal normal-case underline ">
            <ReviewSeeMoreImages />
          </div>
        </div>
      )}
    </section>
  );
}

export default ReviewCardCarousel;
