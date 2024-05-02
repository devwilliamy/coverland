'use client';
import { getAllAcessories } from '@/lib/db/accessories';
import { AccessoryItem } from '@/providers/CartProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
    <section className="grid min-h-screen grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2">
      {allAccessories.map(({ title, sku, images }) => {
        const featuredImage = images.split(',')[0];
        return (
          <div
            className="flex w-full cursor-pointer flex-col items-center rounded-xl p-4 shadow-md"
            onClick={() => {
              router.push(`/accessories/${sku}`);
            }}
          >
            <Image
              width={800}
              height={800}
              alt={`product-${sku}`}
              src={featuredImage}
              className="aspect-square h-full w-full"
            />
            <div className="">{title}</div>
          </div>
        );
      })}
    </section>
  );
}
