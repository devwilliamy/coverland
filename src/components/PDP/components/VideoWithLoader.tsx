// components/VideoWithLoader.tsx
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProductVideo from '../ProductVideo';
import { ReviewMedia } from '@/lib/types/review';

type VideoWithLoaderProps = {
  media: ReviewMedia;
  shouldAutoPlay: boolean;
};
const VideoWithLoader: React.FC<VideoWithLoaderProps> = ({
  media,
  shouldAutoPlay,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!shouldAutoPlay && videoRef.current) {
      videoRef.current.pause();
    }
  }, [shouldAutoPlay]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  
  return (
    <div className="relative h-full w-full lg:max-h-[75vh]">
      {loading && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-[#F0F0F0]/50 lg:bg-[#999999]/50">
          <AiOutlineLoading3Quarters
            className="animate-spin"
            fill="#BE1B1B"
            opacity={0.5}
          />
        </div>
      )}
      <ProductVideo
        ref={videoRef}
        src={media.review_video_url}
        imgSrc={media.review_video_thumbnail_url}
        className="flex aspect-[9/16] h-full w-full items-center"
        aspectRatio="9 / 16"
        muted={false}
        autoplay={shouldAutoPlay}
        controls={true}
        onLoadedData={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default VideoWithLoader;
