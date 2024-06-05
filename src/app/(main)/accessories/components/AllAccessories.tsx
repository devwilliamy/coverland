'use client';
import PolicyHeader from '@/components/policy/PolicyHeader';
import { getAllAcessories } from '@/lib/db/accessories';
import { AccessoryItem } from '@/providers/CartProvider';
import React, { Suspense, useEffect, useState } from 'react';
import { Accessory } from './Accessory';

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
      <PolicyHeader headerText="All Accessories" showTabs={false} />
      <section className="grid min-h-screen grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {allAccessories.map((data) => {
          return <Accessory accessoryData={data} />;
        })}
      </section>
    </>
  );
}
