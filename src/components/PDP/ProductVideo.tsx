'use client';
import Video from 'next-video';
import SquareVideo from '../../../videos/Square Ratio.mp4';
import PerfectSolutionThumbnail from '@/video/Thumbnail_Square.webp';
import Image from 'next/image';

export default function ProductVideo() {
  return (
    <Video
      src={SquareVideo}
      muted
      // children={children}
      // poster={PerfectSolutionThumbnail}
      style={{
        aspectRatio: 4 / 3,
        height: '100%',
        '--seek-backward-button': 'none',
        '--seek-forward-button': 'none',
      }}
    >
      <Image
        alt="Video Thumbnail"
        slot="poster"
        src={PerfectSolutionThumbnail}
        aria-hidden="true"
      />
    </Video>
  );
}
