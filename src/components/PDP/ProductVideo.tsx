'use client';
import Video from 'next-video';
import SquareVideo from '../../../videos/Square Ratio.mp4';
export default function ProductVideo() {
  return (
    <Video
      src={SquareVideo}
      muted
      style={{ aspectRatio: 4 / 3, height: '100%' }}
    />
  );
}
