'use client';

import { TProductData } from '@/lib/db';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { extractUniqueValues } from '../utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { deslugify, slugify } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function SubmodelSearch({
  setSelectedSubmodel,
  selectedSubmodel,
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
  selectedSubmodel: string | null;
}) {
  const [value, setValue] = useState(() => submodelParam ?? '');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (selectedSubmodel !== value) {
    setSelectedSubmodel(value);
  }

  const handleSubmitDropdown = async (value: string) => {
    let url = '';
    if (value) {
      url += `?${createQueryString('submodel', value)}`;
    }

    // refreshRoute('/');
    router.push(url.toLowerCase());
    // refreshRoute(`${pathname}?${currentParams.toString()}`);
  };

  const { uniqueSubmodel1 } = extractUniqueValues(modelData as TProductData[]);
  console.log(shouldTriggerSetParams);

  const uniqueSubmodelsFromModelData = Array.from(
    new Set(
      modelData.map((row) => row.submodel1).filter((model) => Boolean(model))
    )
  );
  console.log(value);
  // const submodelParam = searchParams?.get('submodel') ?? '';
  console.log(submodelParam);

  console.log(submodels, uniqueSubmodelsFromModelData);

  if (submodels.length < 1) return null;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSubmodel(newValue);
    if (!shouldTriggerSetParams) {
      return;
    }
    newValue && handleSubmitDropdown(newValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg"
    >
      <option value={submodelParam ?? ''}>
        {submodelParam ? deslugify(submodelParam) : 'Select car submodel'}
      </option>
      {uniqueSubmodelsFromModelData?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel as string}>
          {deslugify(submodel)}
        </option>
      ))}
    </select>
  );
}
