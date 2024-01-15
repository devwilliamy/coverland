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
}: {
  modelData: TProductData[];
  setSelectedSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam: string | null;
  shouldTriggerSetParams: boolean;
}) {
  const [value, setValue] = useState(() => submodelParam ?? '');
  const pathname = usePathname();
  const router = useRouter();

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

  console.log(uniqueSubmodel1);

  console.log(shouldTriggerSetParams);

  if (uniqueSubmodel1.length < 2) return null;
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
      className="text-lg rounded-lg px-2 py-3"
    >
      <option value="">Select car submodel</option>
      {uniqueSubmodel1?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel}>
          {deslugify(submodel)}
        </option>
      ))}
    </select>
  );
}
