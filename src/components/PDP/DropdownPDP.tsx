import { TProductData } from '@/lib/db';
import SubDropdowns from './components/SubDropdowns';

export type TQuery = {
  year?: string;
  type?: string;
  make?: string;
  model?: string;
};

export function DropdownPDP({
  modelData,
  submodels,
  secondSubmodels,
}: {
  modelData: TProductData[];
  submodels: string[];
  secondSubmodels: string[];
}) {
  // console.log(submodels, secondSubmodels);
  if (secondSubmodels.length === 0 && submodels.length === 0) return null;
  // console.log('submodels', submodels);
  return (
    <div className="flex w-full flex-col gap-2 ">
      <SubDropdowns
        modelData={modelData}
        submodels={submodels}
        secondSubmodels={secondSubmodels}
      />
    </div>
  );
}
