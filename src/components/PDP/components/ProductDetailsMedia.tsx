'use client';
import useDetermineType from '@/hooks/useDetermineType';
import ProductVideo from '../ProductVideo';
import CorvetteGif from '@/videos/Corvette Zoom.mp4';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useContext } from 'react';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useStore } from 'zustand';

export default function ProductDetailsMedia() {
  const { isDefaultCoverType } = useDetermineType();
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

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
        <ReactPlayer
          url={selectedProduct?.product_video_zoom || ""}
          muted
          // autoplay
          loop
          playsinline
          playing
          width="100%"
          height="auto"
        />
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
