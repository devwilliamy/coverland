import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';
import { Play } from 'lucide-react';

interface VideoThumbnailProps {
  url: string;
  thumbnailUrl: string;
  rating: number;
  onMediaClick: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  url,
  thumbnailUrl,
  rating,
  onMediaClick,
}) => {
  const [duration, setDuration] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const handleDuration = (duration: number) => {
    setDuration(duration);
    setIsReady(true);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
      <ReactPlayer
        // url={url}
        url={'/public/review/videos/Mazda Miata 2022.mp4'}
        onDuration={handleDuration}
        config={{ file: { attributes: { preload: 'metadata' } } }}
        width={0}
        height={0}
      />
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 text-white">
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
              aria-label={`Video duration: ${formatDuration(duration)}`}
            >
              {formatDuration(duration)}
            </span>
          ) : (
            <span
              className="ml-1 text-base font-medium"
              aria-label={`Video duration`}
            >
              0:00
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
