'use client';
import ReviewImageGalleryDesktop from '@/components/PDP/components/ReviewImageGalleryDesktop';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useStore } from 'zustand';
import { Button } from '@/components/ui/button';
import { removeWwwFromUrl } from '../../utils';

export default function CustomerImagesProductImage({
  img,
  idx,
  setFeaturedImage,
}: {
  img: string;
  idx: number;
  setFeaturedImage: (img: string) => void;
}) {
  return (
    <div
      className="h-auto w-full rounded-xl border-transparent bg-[#F2F2F2] p-2"
      key={img}
    >
      <Image
        key={idx}
        src={removeWwwFromUrl(img as string) + '?v=9'}
        width={350}
        height={350}
        alt="car cover details"
        className={`rounded-lg' h-full w-full object-contain `}
        onClick={() => setFeaturedImage(img)}
        onError={() => console.log('Failed image:', `${img}`)}
      />
    </div>
  );
}
