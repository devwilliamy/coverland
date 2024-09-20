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
import { ReviewMedia } from './ReviewHeaderGalleryMobile';
import ImageWithLoader from './ImageWithLoader';

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
    api.reInit();
  }, [api, scrollToIndex]);

  const renderMediaItem = (media: ReviewMedia, index: number) => {
    const content =
      rowType === 'video' ? (
        <ImageWithLoader
          src={media.review_video_thumbnail_url}
          className="flex aspect-square h-full w-full items-center"
          width={800}
          height={800}
          alt="selected-review-video-image-alt"
          // url={media.review_video_url} // Need to change the string[] to actually have { thumbnail_url, url, and rating? }
          // thumbnailUrl={media.review_video_thumbnail_url}
          // rating={5}
          // onMediaClick={() => onMediaClick(index, rowType)}
        />
      ) : (
        <ImageWithLoader
          width={800}
          height={800}
          className="flex aspect-square h-full w-full items-center rounded-lg"
          alt="selected-review-card-image-alt"
          src={media.review_image_url}
        />
      );

    // </div>

    return <>{content}</>;
  };

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {mediaItems?.map((media, index) => (
          <CarouselItem key={`selected-review-card-image-${index}`}>
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
