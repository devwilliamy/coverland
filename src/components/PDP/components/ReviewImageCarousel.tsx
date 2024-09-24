// ReviewImageCarousel.tsx
import React, { useState, useEffect, useCallback } from 'react';
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
import ImageWithLoader from './ImageWithLoader';
import ProductVideo from '../ProductVideo';
import Review1 from '@/videos/07-C.mp4';
import Review2 from '@/videos/1966-mustang-fastback-yellow.mov';
import VideoWithLoader from './VideoWithLoader';
import { ReviewMedia } from '@/lib/types/review';

interface ReviewImageCarouselProps {
  mediaItems: ReviewMedia[];
  rowType: 'video' | 'image';
  initialImageIndex: number;
}

const ReviewImageCarousel: React.FC<ReviewImageCarouselProps> = ({
  mediaItems,
  rowType,
  initialImageIndex,
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const scrollToIndex = useCallback(
    (index: number) => {
      if (api) api.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    scrollToIndex(initialImageIndex);
  }, [api, scrollToIndex]);

  const renderMediaItem = (media: ReviewMedia, index: number) => {
    const content =
      rowType === 'video' ? (
        <VideoWithLoader media={media} />
      ) : (
        <ImageWithLoader
          width={800}
          height={800}
          className="flex aspect-square h-auto w-[400px] items-center rounded-lg object-cover md:h-auto md:w-[800px] "
          alt="selected-review-card-image-alt"
          src={media.review_image_url}
        />
      );

    // </div>

    return <>{content}</>;
  };

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="ml-0 lg:-ml-2">
        {mediaItems?.map((media, index) => (
          <CarouselItem
            key={`selected-review-card-image-${index}`}
            className="pl-0"
          >
            {renderMediaItem(media, index)}
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
