'use client';
import Video from 'next-video';
import CarCoverVideo from '../../../videos/Premium Plus Car Cover_1080p.mp4';

export default function ProductVideo() {
  return (
    <div
      id="product-video"
      className="flex h-[250px] w-full flex-col items-center lg:my-4 lg:flex lg:h-[500px]"
    >
      <Video src={CarCoverVideo} />
    </div>
  );
}
