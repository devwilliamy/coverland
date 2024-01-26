import { Suspense } from 'react';
import CarSubdropdowns from '@/app/(main)/car-covers/components/CarSubdropdowns';

export function CarCoverDropdown() {
  console.log('rendering');
  // console.log(submodels, secondSubmodels);
  // console.log('submodels', submodels);
  return (
    <div className="flex w-full flex-col gap-2 ">
      <Suspense fallback={<div>Loading...</div>}>
        <CarSubdropdowns />
      </Suspense>
    </div>
  );
}
