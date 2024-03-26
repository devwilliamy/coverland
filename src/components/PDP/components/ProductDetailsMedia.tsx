'use client';
import useDetermineType from '@/hooks/useDetermineType';
import ProductVideo from '../ProductVideo';
import CorvetteGif from '@/videos/Corvette Zoom.mp4';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import Image from 'next/image';

export default function ProductDetailsMedia() {
  const { isDefaultCoverType } = useDetermineType();
  return (
    <>
      {isDefaultCoverType ? (
        // <ProductVideo
        //   src={CorvetteGif}
        //   autoplay
        //   loop
        //   aspectRatio="16/9"
        //   controls={false}
        // />
        <></>
      ) : (
        <Image
          alt="product-content-half-cover-desktop"
          src={DesktopHalfCover}
          // fill
          height={1000}
          width={1000}
          className="w-full"
        />
      )}
    </>
  );
}
