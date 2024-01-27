import { Suspense } from 'react';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';
import DefaultDropdown from './components/DefaultDropdown';
import DropdownRenderer from './components/DropdownRenderer';

export function DropdownPDP({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  if (!modelData[0]?.sku) {
    console.log('here');
    return (
      <div className="flex w-full flex-col gap-2 ">
        <Suspense fallback={<div>Loading...</div>}>
          <DefaultDropdown />
        </Suspense>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-2 ">
      <Suspense fallback={<div>Loading...</div>}>
        <DropdownRenderer />
      </Suspense>
    </div>
  );
}
