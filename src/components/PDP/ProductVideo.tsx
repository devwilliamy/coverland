'use client';
import Video from 'next-video';
import CarCoverVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/file_example_MP4_1920_18MG-F6bfQjmTzdbNLcmwQjWMqvE18dbkEV.mp4';

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
