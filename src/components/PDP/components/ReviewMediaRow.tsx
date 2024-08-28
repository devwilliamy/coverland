import React, { useEffect, useState } from 'react';
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

interface ReviewMediaRowProps {
  mediaItems: Array<{ review_image: string; review_video_thumbnail?: string }>;
  rowType: 'video' | 'image';
  onMediaClick: (index: number) => void;
}

export const ReviewMediaRow: React.FC<ReviewMediaRowProps> = ({
  mediaItems,
  rowType,
  onMediaClick,
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    // You can add any additional setup here if needed
  }, [api]);

  const displayedItems = mediaItems.slice(0, Math.min(12, mediaItems.length));
  const hasMoreItems = mediaItems.length > 12;
  console.log('Media:', mediaItems);
  const renderMediaItem = (media: (typeof mediaItems)[0], index: number) => {
    if (index === 11 && hasMoreItems) {
      return (
        <ReviewSeeMoreImages
          lastImage={media.review_image.split(',')[0]}
          remainingCount={mediaItems.length - 11}
        />
      );
    }

    const content =
      rowType === 'video' ? (
        <VideoThumbnail
          url={media.review_video || ''}
          thumbnailUrl={
            media.review_video_thumbnail || media.review_image.split(',')[0]
          }
          rating={media.rating_stars}
          onMediaClick={() => onMediaClick(index)}
        />
      ) : (
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            width={190}
            height={190}
            className="h-full w-full object-cover"
            alt={`Image for review ${index + 1}`}
            src={media.review_image.split(',')[0]}
            onError={() => {
              console.error(`Image: review-image-${index} | ERROR | `, media);
            }}
          />
        </div>
      );

    return (
      <DialogTrigger onClick={() => onMediaClick(index)}>
        {content}
      </DialogTrigger>
    );
  };

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
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
            className="basis-[47%] pl-2 md:basis-[45%] md:pl-4 lg:basis-[30%]"
          >
            {renderMediaItem(media, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default ReviewMediaRow;
