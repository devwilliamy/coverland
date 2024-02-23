'use client';
import { Suspense, useContext } from 'react';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import ExtraDetailsTabs from './components/ExtraDetailsTabs';
import { Separator } from '../ui/separator';

export function ExtraProductDetails() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  return (
    <div className="flex w-full max-w-full flex-col lg:px-[30px]">
      <Suspense fallback={<div>Loading...</div>}>
        <Separator className="h-5 w-full border-b-[1px] border-t-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:h-10 " />
        <ExtraDetailsTabs />
      </Suspense>
    </div>
  );
}
