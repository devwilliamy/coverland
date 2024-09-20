// components/VideoWithLoader.tsx
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProductVideo from '../ProductVideo';
import { ReviewMedia } from '@/lib/types/review';

type VideoWithLoaderProps = {
  media: ReviewMedia;
};
const VideoWithLoader: React.FC<VideoWithLoaderProps> = ({
  media,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
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
        src={media.review_video_url}
        imgSrc={media.review_video_thumbnail_url}
        className="flex aspect-[9/16] h-full w-full items-center"
        aspectRatio="9 / 16"
        muted={false}
        onLoadedData={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default VideoWithLoader;
