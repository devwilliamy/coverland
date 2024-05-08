'use client';
import useDetermineType from '@/hooks/useDetermineType';
import ProductVideo from '../ProductVideo';
import CorvetteGif from '@/videos/Corvette Zoom.mp4';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import Image from 'next/image';
import useDetermineContent from '@/hooks/useDetermineContent';

export default function ProductDetailsMedia() {
  const { isDefaultCoverType } = useDetermineType();
  const { zoomVideo } = useDetermineContent();

  return (
    <>
      {isDefaultCoverType ? (
        <ProductVideo src={zoomVideo} aspectRatio="16/9" autoplay loop />
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
