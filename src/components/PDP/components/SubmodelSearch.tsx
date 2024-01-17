'use client';

import { TProductData } from '@/lib/db';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { extractUniqueValues } from '../utils';
import { usePathname } from 'next/navigation';
import { deslugify, slugify } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function SubmodelSearch({
  setSelectedSubmodel,
  modelData,
  submodelParam,
  shouldTriggerSetParams,
  submodels,
}: {
  modelData: TProductData[];
  setSelectedSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam: string | null;
  shouldTriggerSetParams: boolean;
  submodels: string[];
}) {
  const [value, setValue] = useState(() => submodelParam ?? '');
  const pathname = usePathname();
  const router = useRouter();
  console.log(submodels);

  const setSearchParams = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value) {
      currentParams.set('submodel', slugify(value));
    } else {
      currentParams.delete('submodel');
    }

    const newUrl = `${pathname}?${currentParams.toString()}`;
    console.log(`Navigating to URL: ${newUrl}`);
    value.length && router.push(newUrl);
  };
  console.log('modelData', modelData);

  const { uniqueSubmodel1 } = extractUniqueValues(modelData as TProductData[]);

  const uniqueSubmodelsFromModelData = Array.from(
    new Set(
      modelData.map((row) => row.submodel1).filter((model) => Boolean(model))
    )
  );
  console.log(uniqueSubmodelsFromModelData);

  console.log(uniqueSubmodel1);

  console.log(shouldTriggerSetParams);

  if (submodels.length < 2) return null;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSubmodel(newValue);
    console.log('shouldTriggerSetParams', shouldTriggerSetParams);
    newValue && setSearchParams(newValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg"
    >
      <option value="">Select car submodel</option>
      {uniqueSubmodelsFromModelData?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel as string}>
          {deslugify(submodel)}
        </option>
      ))}
    </select>
  );
}
