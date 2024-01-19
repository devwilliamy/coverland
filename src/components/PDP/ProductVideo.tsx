'use client';

import ReactPlayer from 'react-player/vimeo';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="h-[370px] w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-xl border lg:my-4 lg:flex"
    >
      <ReactPlayer
        url="https://vimeo.com/904161479"
        width="100%"
        height="100%"
        controls
        muted
        playing
        loop
      />
    </div>
  );
}
