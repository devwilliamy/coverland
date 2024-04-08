'use client';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import Image from 'next/image';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { removeWwwFromUrl } from '@/utils';

export default function FeatureImage() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const featuredImage = selectedProduct?.mainImage;
  return (
    <Image
      id="featured-image"
      src={removeWwwFromUrl(featuredImage as string) + '?v=4' ?? ''}
      alt="a car with a car cover on it"
      fill={true}
      className="hidden object-cover lg:block"
      priority
      sizes="(max-width: 768px) 100vw"
    />
  );
}
