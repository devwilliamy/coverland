// ReviewImageCarousel.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ReviewImageCarouselProps {
  reviewImages: Array<{ review_image: string }>;
  onLoad: () => void;
  initialImageIndex: number;
  onImageChange?: (index: number) => void;
}

const ReviewImageCarousel: React.FC<ReviewImageCarouselProps> = ({
  reviewImages,
  onLoad,
  initialImageIndex,
  onImageChange,
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    const selectListener = () => {
      onImageChange?.(api.selectedScrollSnap());
    };

    api.on('select', selectListener);

    // Move to the initial image
    api.scrollTo(initialImageIndex);

    return () => {
      api.off('select', selectListener);
    };
  }, [api, initialImageIndex, onImageChange]);

  return (
    <Carousel setApi={setApi} onLoad={onLoad}>
      <CarouselContent>
        {reviewImages?.map((img, index) => (
          <CarouselItem key={`selected-review-card-image-${index}`}>
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
  );
};

export default ReviewImageCarousel;
