'use client';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const AccessoryGallery = ({ imageStrings }: { imageStrings: string[]; }) => (
  <span className="flex flex-col gap-2">
    {imageStrings[0] && (
      <Image
        src={imageStrings[0]}
        width={700}
        height={700}
        alt="accessories-header"
        className="aspect-square w-full rounded-xl  " />
    )}
    <span className="hidden grid-cols-2 gap-2 md:grid">
      {imageStrings?.map((image, i) => {
        if (i === 0) {
          return null;
        }
        return (
          <Suspense
            fallback={<div className="p-4">
              <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
            </div>}
          >
            <Image
              src={image}
              alt="accessories-header"
              width={700}
              height={700}
              className="aspect-square h-full w-full rounded-xl " />
          </Suspense>
        );
      })}
    </span>
  </span>
);
