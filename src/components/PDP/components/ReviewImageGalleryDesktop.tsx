import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ReviewImageIndexContext } from '@/lib/contexts/ReviewImageIndexContext';
import { TReviewData } from '@/lib/db';
import useReviewImageIndex from '@/lib/hooks/useReviewImageIndex';
import { ChevronLeft, X } from 'lucide-react';
import {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
  SetStateAction,
  Dispatch,
} from 'react';
import { useStore } from 'zustand';
import ReviewCard from './ReviewCard';
import { ReviewChevronLeft, ReviewChevronRight } from '../icons';
import Image from 'next/image';

export default function ReviewImageGalleryDesktop({
  setReviewDialogOpen,
}: {
  setReviewDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const store = useContext(CarSelectionContext);

  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const [api, setApi] = useState<CarouselApi>();
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const [desktopReviewDialogOpen, setDesktopReviewDialogOpen] =
    useState<boolean>(false);
  const [currentReview, setCurrentReview] = useState<TReviewData | null>(null);
  const { currentReviewImage, setCurrentReviewImage } = useReviewImageIndex();

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    api && scrollTo(currentReviewImage);
    api.on('scroll', () => {
      setCurrentReviewImage(api.selectedScrollSnap());
    });
  }, [api, currentReviewImage, setCurrentReviewImage, scrollTo]);
  return (
    <>
      <div className="flex w-full justify-between">
        <div
          className="flex items-center gap-4"
          onClick={() => setDesktopReviewDialogOpen(false)}
        >
          <ChevronLeft />
          {desktopReviewDialogOpen ? (
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
      {desktopReviewDialogOpen ? (
        <div className="flex w-full ">
          <Carousel setApi={setApi} className="flex w-1/2">
            <CarouselContent className="relative flex items-center ">
              {currentReview?.review_image?.split(',').map((img, index) => (
                <CarouselItem key={img} className="flex items-center ">
                  <Image
                    id={`customer-modal-image-${index}`}
                    alt={`customer-modal-image-${index}`}
                    width={520}
                    height={520}
                    className="aspect-square cursor-pointer rounded-[3px]"
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
          <div className="flex w-1/2 ">
            <ReviewImageIndexContext.Provider
              value={{
                currentReviewImage: currentReviewImage,
                setCurrentReviewImage: setCurrentReviewImage,
                scrollTo: scrollTo,
              }}
            >
              <ReviewCard review={currentReview as TReviewData} fullGallery />
            </ReviewImageIndexContext.Provider>
          </div>
        </div>
      ) : (
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
                        width={300}
                        height={300}
                        className="aspect-square h-full w-full cursor-pointer rounded-[3px]"
                        src={imgStr}
                        onClick={() => {
                          setDesktopReviewDialogOpen(true);
                          setCurrentReview(imageData);
                          setCurrentReviewImage(index);
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
      )}
    </>
  );
}
