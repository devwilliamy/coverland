'use client';
import PolicyHeader from '@/components/policy/PolicyHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllAcessories } from '@/lib/db/accessories';
import { AccessoryItem } from '@/providers/CartProvider';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

export default function AllAccessories() {
  const [allAccessories, setAllAccessories] = useState<AccessoryItem[]>([]);

  useEffect(() => {
    const getAccessories = async () => {
      const arr = await getAllAcessories();
      setAllAccessories(arr);
      console.log(arr);
    };
    getAccessories();
  }, []);

  return (
    <>
      {/* <h1
        className={`mt-[24px] p-4 text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] `}
      >
        All Accessories
      </h1> */}
      <PolicyHeader headerText="All Accessories" showTabs={false} />
      <section className="grid min-h-screen grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {allAccessories.map((data) => {
          return (
            // <Suspense
            //   fallback={
            // <div className="flex h-full w-full p-4">
            //   <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
            // </div>
            //   }
            // >

            // </Suspense>
            <Accessory accessoryData={data} />
          );
        })}
      </section>
    </>
  );
}

const Accessory = ({ accessoryData }: { accessoryData: AccessoryItem }) => {
  const router = useRouter();
  const featuredImage = accessoryData.images.split(',')[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <Skeleton className="aspect flex aspect-square h-[300px] w-full shrink bg-[#BE1B1B]/80 md:h-[400px] lg:h-[405px] " />
    );

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl p-4 shadow-md outline outline-[#BE1B1B]/50 lg:gap-1.5"
      onClick={() => {
        router.push(`/accessories/${accessoryData.sku}`);
      }}
    >
      <Image
        width={500}
        height={500}
        alt={`product-${accessoryData.sku}`}
        src={featuredImage}
        className="aspect-square h-full w-full"
      />
      <p className="pt-2 text-[18px] font-[800] ">{accessoryData.title}</p>
      <RedRating />
      <p className="">${accessoryData.msrp}</p>
    </div>
  );
};

const RedRating = () => (
  <Rating
    name="read-only"
    value={4.5}
    precision={0.1}
    readOnly
    sx={{
      gap: '2px',
      '& .MuiRating-iconFilled': {
        color: '#BE1B1B',
      },
      '& .MuiRating-iconEmpty': {
        color: '#BE1B1B',
      },
    }}
  />
);
