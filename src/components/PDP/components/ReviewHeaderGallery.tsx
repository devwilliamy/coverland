'use client';

import { useContext, useEffect, useState } from 'react';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useStore } from 'zustand';
import ReviewImagesSheet from './ReviewImagesSheet';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ReviewImageGalleryDesktop from './ReviewImageGalleryDesktop';
import useStoreContext from '@/hooks/useStoreContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ReviewHeaderGallery() {
  const store = useStoreContext();

  if (!store) throw new Error('Missing Provider in the tree');
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
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

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
    <div className="flex flex-col items-center">
      {reviewImages?.length > 0 && (
        <>
          <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              {reviewImages?.slice(0, 3).map((image, index) => {
                if (image)
                  return (
                    <>
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
                            key={`review-card-image-${index}`}
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
                              setImageLoading(false);
                            }}
                          >
                            <CarouselContent>
                              {reviewImages?.map((img) => (
                                <CarouselItem>
                                  <Image
                                    key={`selected-review-card-image`}
                                    width={800}
                                    height={800}
                                    className="flex aspect-square h-full w-full items-center"
                                    alt="selected-review-card-image-alt"
                                    src={String(
                                      img.review_image?.split(',')[0]
                                    )}
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
                    </>
                  );
              })}
            </Dialog>

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
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              {reviewImages?.slice(0, 5).map((image, index) => {
                if (image)
                  return (
                    <>
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
                            key={`review-card-image-${index}`}
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
                              setImageLoading(false);
                            }}
                          >
                            <CarouselContent>
                              {reviewImages?.map((img) => (
                                <CarouselItem>
                                  <Image
                                    key={`selected-review-card-image`}
                                    width={800}
                                    height={800}
                                    className="flex aspect-square h-full w-full items-center"
                                    alt="selected-review-card-image-alt"
                                    src={String(
                                      img.review_image?.split(',')[0]
                                    )}
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
                    </>
                  );
              })}
            </Dialog>
            <div className="flex h-full w-full items-center justify-center border border-black">
              <div className="font-normalc text-center text-base normal-case underline ">
                <SeeMoreImages />
              </div>
            </div>
          </section>
        </>
      )}
      {reviewImages && (
        <div className=" flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676] lg:pb-[14px]">
          {imageCount} Review Images
        </div>
      )}
    </div>
  );
}

const SeeMoreImages = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <ReviewImagesSheet />
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger className="underline">
            See more <br /> review images
          </DialogTrigger>
          <DialogContent className="flex max-h-[65vh] flex-col items-center  lg:max-h-[80vh] lg:min-w-[77vw] lg:max-w-[80%]">
            <ReviewImageGalleryDesktop
              setReviewDialogOpen={setReviewDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
