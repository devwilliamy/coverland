'use client';
import Video from 'next-video';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="flex flex-col lg:my-4 lg:flex lg:h-[500px]"
    >
      <Video
        playbackId="x02004Q3mOljwEZKIj5cyWebBI9ioTGBsNUG01pN4JZo4k" // Square Ratio.mp4
        muted
      />
    </div>
  );
}
