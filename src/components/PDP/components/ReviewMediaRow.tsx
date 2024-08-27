import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

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

  return (
    <Carousel 
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {mediaItems.map((media, index) => (
          <CarouselItem key={`review-${rowType}-${index}`} className="pl-2 md:pl-4 basis-1/2 md:basis-[45%] lg:basis-[30%]">
            <DialogTrigger onClick={() => onMediaClick(index)}>
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  width={190}
                  height={190}
                  className="object-cover w-full h-full"
                  alt={`${rowType === 'video' ? 'Video thumbnail' : 'Image'} for review ${index + 1}`}
                  src={
                    rowType === 'video'
                      ? media.review_video_thumbnail || media.review_image.split(',')[0]
                      : media.review_image.split(',')[0]
                  }
                  onError={() => {
                    console.error(`Image: review-${rowType}-${index} | ERROR | `, media);
                  }}
                />
                {rowType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <PlayIcon className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
            </DialogTrigger>
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
