'use client';
import useDetermineType from '@/hooks/useDetermineType';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import Image from 'next/image';
import { useContext } from 'react';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useStore } from 'zustand';
import { LazyVideo } from '../LazyVideo';

export default function ProductDetailsMedia() {
  const { isDefaultCoverType } = useDetermineType();
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  return (
    <>
      {isDefaultCoverType ? (
        <LazyVideo
          data-src={selectedProduct?.product_video_zoom || ''}
          muted
          loop
          playsInline
          autoPlay
          width="100%"
          height="auto"
        >
          Your browser does not support the video tag.
        </LazyVideo>
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
