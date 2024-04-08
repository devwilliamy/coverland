'use client';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import Image from 'next/image';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { removeWwwFromUrl } from '@/utils';

export default function FeatureImage() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const featuredImage = selectedProduct?.product?.split(',')[0];
  return (
    <Image
      id="featured-image"
      src={removeWwwFromUrl(featuredImage as string) ?? ''}
      alt="a car with a car cover on it"
      width={718}
      height={718}
      className="hidden object-cover lg:block"
      priority
      sizes="(max-width: 768px) 100vw"
    />
  );
}
