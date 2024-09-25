// ReviewImageCarousel.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const currentIndexRef = useRef(currentIndex);

  // Update the ref whenever currentIndex changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (api) api.scrollTo(index);
    },
    [api]
  );

  // Scroll to the initial index when the carousel is ready
  useEffect(() => {
    if (api) {
      scrollToIndex(initialImageIndex);
    }
  }, [api, initialImageIndex, scrollToIndex]);

  // Set up the event listener for slide changes
  useEffect(() => {
    if (!api) {
      return;
    }

    const handleScroll = () => {
      const newIndex = api.selectedScrollSnap();
      if (newIndex !== currentIndexRef.current) {
        setCurrentIndex(newIndex);
      }
    };

    api.on('select', handleScroll);

    // Cleanup
    return () => {
      api.off('select', handleScroll);
    };
  }, [api]);

  const renderMediaItem = (media: ReviewMedia, index: number) => {
    const isActive = index === currentIndex;

    const content =
      rowType === 'video' ? (
        isActive ? (
          <VideoWithLoader media={media} shouldAutoPlay={true} />
        ) : (
          <Image
            src={media.review_video_thumbnail_url.src} // Need to change the string[] to actually have { thumbnail_url, url, and rating? }
            width={900}
            height={1600}
            className="flex aspect-[9/16] h-auto w-[450px] items-center rounded-lg object-cover md:h-auto md:w-[450px] "
            alt="selected-review-card-image-alt"
          />
        )
      ) : (
        <ImageWithLoader
          width={800}
          height={800}
          className="flex aspect-square h-auto w-[400px] items-center rounded-lg object-cover md:h-auto md:w-[800px] "
          alt="selected-review-card-image-alt"
          src={media.review_image_url}
        />
      );
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
