'use client';
// import Video from 'next-video';
import MuxPlayer from '@mux/mux-player-react';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="flex flex-col lg:my-4 lg:flex lg:h-[500px]"
    >
      <MuxPlayer
        // playbackId="4gDB6CEIClCYETrwhCi6IfDQaHpID9r4HmS6rR18Hhc" // Square Ratio Sample.mp4
        playbackId="x02004Q3mOljwEZKIj5cyWebBI9ioTGBsNUG01pN4JZo4k" // Square Ratio.mp4
        muted
      />
      {/* <Video
        // playbackId="4gDB6CEIClCYETrwhCi6IfDQaHpID9r4HmS6rR18Hhc" // Square Ratio Sample.mp4
        playbackId="x02004Q3mOljwEZKIj5cyWebBI9ioTGBsNUG01pN4JZo4k" // Square Ratio.mp4
        muted
      /> */}
    </div>
  );
}
