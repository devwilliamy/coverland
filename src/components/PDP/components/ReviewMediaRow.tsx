import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ReviewImagesSheet from './ReviewImagesSheet';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import VideoThumbnail from './VideoThumbnail';
import { ReviewMedia } from '@/lib/types/review';

interface ReviewMediaRowProps {
  mediaItems: ReviewMedia[];
  rowType: 'video' | 'image';
  onMediaClick: (index: number, rowType: 'video' | 'image') => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ReviewMediaRow: React.FC<ReviewMediaRowProps> = ({
  mediaItems,
  rowType,
  onMediaClick,
  currentSlideIndex,
  setCurrentSlideIndex,
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
    scrollToIndex(currentSlideIndex);
  }, [api, setCurrentSlideIndex, currentSlideIndex]);

  const displayedItems = mediaItems.slice(0, Math.min(12, mediaItems.length));
  const hasMoreItems = mediaItems.length > 12;

  const renderMediaItem = (media: (typeof mediaItems)[0], index: number) => {
    if (index === 11 && hasMoreItems) {
      return (
        <ReviewSeeMoreImages
          lastImage={media.review_image_url}
          remainingCount={mediaItems.length - 11}
        />
      );
    }

    const content =
      rowType === 'video' ? (
        <VideoThumbnail
          url={media.review_video_url} // Need to change the string[] to actually have { thumbnail_url, url, and rating? }
          thumbnailUrl={media.review_video_thumbnail_url}
          rating={parseInt(media.rating_stars)}
          duration={media.duration}
          onMediaClick={() => onMediaClick(index, rowType)}
        />
      ) : (
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            width={190}
            height={190}
            className="h-full w-full object-cover"
            alt={`Image for review ${index + 1}`}
            src={media.review_image_url}
            onError={() => {
              console.error(`Image: review-image-${index} | ERROR | `, media);
            }}
          />
        </div>
      );

    return <div onClick={() => onMediaClick(index, rowType)}>{content}</div>;
  };

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      defaultValue={currentSlideIndex}
      opts={{
        align: 'start',
        loop: false,
        skipSnaps: false,
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {displayedItems.map((media, index) => (
          <CarouselItem
            key={`review-${rowType}-${index}`}
            className="basis-[47%] pl-2 md:basis-[45%] md:pl-4 lg:basis-[15%]"
          >
            {renderMediaItem(media, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ReviewMediaRow;
