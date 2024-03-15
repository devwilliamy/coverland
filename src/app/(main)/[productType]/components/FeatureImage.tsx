'use client';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import Image from 'next/image';
import { useContext } from 'react';
import { useStore } from 'zustand';

export default function FeatureImage() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const featuredImage = useStore(store, (s) => s.featuredImage);
  return (
    <Image
      id="featured-image"
      src={featuredImage + '?v=4' ?? ''}
      alt="a car with a car cover on it"
      fill={true}
      className="hidden object-cover lg:block"
      priority
      sizes="(max-width: 768px) 100vw"
    />
  );
}
