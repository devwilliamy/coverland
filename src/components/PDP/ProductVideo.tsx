'use client';

import { VIMEO_VIDEO_LINK } from '@/lib/constants';
import ReactPlayer from 'react-player/vimeo';

export default function ProductVideo({
  playerRef,
}: {
  playerRef: React.MutableRefObject<ReactPlayer | null>;
}) {
  return (
    <div
      id="product-video"
      className="flex h-[250px] w-full flex-col items-center lg:my-4 lg:flex lg:h-[500px]"
    >
      <ReactPlayer
        url={VIMEO_VIDEO_LINK}
        ref={playerRef}
        width="100%"
        height="100%"
        controls
        muted
        loop
      />
    </div>
  );
}
