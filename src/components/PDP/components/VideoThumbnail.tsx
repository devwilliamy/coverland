import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import { Play } from 'lucide-react';
import { Asset } from 'next-video/dist/assets.js';

interface VideoThumbnailProps {
  thumbnailUrl: string | StaticImageData;
  rating: string | number | undefined;
  duration: string;
  onMediaClick: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  thumbnailUrl,
  rating,
  duration,
  onMediaClick,
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div
      className="relative aspect-[9/16] overflow-hidden rounded-lg"
      onClick={onMediaClick}
    >
      <Image
        width={190}
        height={338} // Adjusted for 9:16 aspect ratio
        className="h-full w-full object-cover"
        alt="Video thumbnail"
        src={thumbnailUrl}
      />
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-25 p-2 text-white">
        <div className="flex items-center justify-between">
          {rating && (
            <span className="text-sm" aria-label={`${rating} out of 5 stars`}>
              <ReviewRatingStar rating={Number(rating)} size={14} />
            </span>
          )}
        </div>
        <div className="flex items-center">
          <Play size={14} strokeWidth={3} />
          {isReady && duration ? (
            <span
              className="text-sm"
              aria-label={`Video duration: ${duration}`}
            >
              {duration}
            </span>
          ) : (
            <span
              className="ml-1 text-base font-medium"
              aria-label={`Video duration`}
            >
              {duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
