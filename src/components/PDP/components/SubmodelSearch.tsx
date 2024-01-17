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
  const searchParams = useSearchParams();

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

  const setSearchParams = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = createQueryString('submodel', value);
    if (!value) {
      currentParams.delete('submodel');
    }

    value.length && router.push(newParams);
  };

  const { uniqueSubmodel1 } = extractUniqueValues(modelData as TProductData[]);

  const uniqueSubmodelsFromModelData = Array.from(
    new Set(
      modelData.map((row) => row.submodel1).filter((model) => Boolean(model))
    )
  );

  if (submodels.length < 2) return null;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSubmodel(newValue);
    newValue && setSearchParams(newValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg"
    >
      <option value="">
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
