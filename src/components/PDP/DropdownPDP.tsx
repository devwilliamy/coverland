import { Suspense } from 'react';
import SubDropdowns from './components/SubDropdowns';

export function DropdownPDP() {
  // console.log(submodels, secondSubmodels);
  // console.log('submodels', submodels);
  return (
    <div className="flex w-full flex-col gap-2 ">
      <Suspense fallback={<div>Loading...</div>}>
        <SubDropdowns />
      </Suspense>
    </div>
  );
}
