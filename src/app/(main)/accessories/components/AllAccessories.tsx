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

  const router = useRouter();

  return (
    <>
      {/* <h1
        className={`mt-[24px] p-4 text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] `}
      >
        All Accessories
      </h1> */}
      <PolicyHeader headerText="All Accessories" showTabs={false} />
      <section className="grid min-h-screen grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {allAccessories.map(({ title, sku, images, msrp }) => {
          const featuredImage = images.split(',')[0];
          return (
            <Suspense
              fallback={
                <div className="p-4">
                  <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
                </div>
              }
            >
              <div
                className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl p-4 shadow-md lg:gap-1.5"
                onClick={() => {
                  router.push(`/accessories/${sku}`);
                }}
              >
                <Image
                  width={500}
                  height={500}
                  alt={`product-${sku}`}
                  src={featuredImage}
                  className="aspect-square h-full w-full"
                />
                <p className="font-[800] ">{title}</p>
                <RedRating />
                <p className="">${msrp}</p>
              </div>
            </Suspense>
          );
        })}
      </section>
    </>
  );
}

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
