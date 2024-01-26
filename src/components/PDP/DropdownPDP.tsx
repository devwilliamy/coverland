import { Suspense } from 'react';
import SubDropdowns from './components/SubDropdowns';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';
import { TProductData } from '@/lib/db';
import DefaultDropdown from './components/DefaultDropdown';

export function DropdownPDP({
  modelData,
}: {
  modelData: TCarCoverData[] | TProductData[];
}) {
  if (!modelData[0]?.sku)
    return (
      <div className="flex w-full flex-col gap-2 ">
        <Suspense fallback={<div>Loading...</div>}>
          <DefaultDropdown />
        </Suspense>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-2 ">
      <Suspense fallback={<div>Loading...</div>}>
        <SubDropdowns modelData={modelData} />
      </Suspense>
    </div>
  );
}
