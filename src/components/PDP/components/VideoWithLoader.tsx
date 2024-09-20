// components/VideoWithLoader.tsx
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProductVideo from '../ProductVideo';
import Review1 from '@/videos/07-C.mp4';

const VideoWithLoader: React.FC = ({ ...props }) => {
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
        src={Review1}
        // imgSrc={media.review_video_thumbnail_url}
        className="flex aspect-[9/16] h-full w-full items-center"
        aspectRatio="9 / 16"
        onLoadedData={() => {
          setLoading(false);
        }}
        // url={media.review_video_url} // Need to change the string[] to actually have { thumbnail_url, url, and rating? }
        // thumbnailUrl={media.review_video_thumbnail_url}
        // rating={5}
        // onMediaClick={() => onMediaClick(index, rowType)}
      />
    </div>
  );
};

export default VideoWithLoader;
