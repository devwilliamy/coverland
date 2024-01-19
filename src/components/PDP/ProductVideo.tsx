'use client';

import { VIMEO_VIDEO_LINK } from '@/lib/constants';
import ReactPlayer from 'react-player/vimeo';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="h-[250px] w-full lg:my-4 lg:flex lg:h-[500px]"
    >
      <ReactPlayer
        url={VIMEO_VIDEO_LINK}
        width="100%"
        height="100%"
        controls
        muted
        loop
      />
    </div>
  );
}
