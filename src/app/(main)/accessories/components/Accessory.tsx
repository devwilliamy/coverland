'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { AccessoryItem } from '@/providers/CartProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RedRating } from './RedRating';

export const Accessory = ({ accessoryData }: { accessoryData: AccessoryItem; }) => {
  const router = useRouter();
  const featuredImage = accessoryData.images.split(',')[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // if (isLoading)
  //   return (
  //     <Skeleton className="aspect flex aspect-square h-[300px] w-full shrink bg-[#BE1B1B]/80 md:h-[400px] lg:h-[405px] " />
  //   );
  const handleClick = () => {
    router.push(`/accessories/${accessoryData.sku}`);
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl p-4 shadow-md outline outline-[#BE1B1B]/50 lg:gap-1.5"
      onClick={handleClick}
    >
      {isLoading ? (
        <Skeleton className="aspect flex aspect-square h-[500px] w-full shrink bg-[#BE1B1B]/80 md:h-[400px] lg:h-[405px] " />
      ) : (
        <Image
          width={500}
          height={500}
          alt={`product-${accessoryData.sku}`}
          src={featuredImage}
          className="flex aspect-square h-full w-full flex-1" />
      )}
      <p className="pt-2 text-[18px] font-[800] ">{accessoryData.title}</p>
      <RedRating />
      <p className="font-[600]">${accessoryData.msrp}</p>
    </div>
  );
};
