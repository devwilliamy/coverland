'use client';
import useDetermineType from '@/hooks/useDetermineType';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import Image from 'next/image';
import { useStore } from 'zustand';
import ReactPlayer from 'react-player';
import useStoreContext from '@/hooks/useStoreContext';

export default function ProductDetailsMedia() {
  const { isDefaultCoverType } = useDetermineType();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  return (
    <>
      {isDefaultCoverType ? (
        <ReactPlayer
          url={selectedProduct?.product_video_zoom || ''}
          muted
          loop
          playsinline
          playing
          width="100%"
          height="auto"
        >
          Your browser does not support the video tag.
        </ReactPlayer>
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
