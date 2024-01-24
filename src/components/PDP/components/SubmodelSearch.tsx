'use client';

import { TProductData } from '@/lib/db';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { deslugify } from '@/lib/utils';
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

  if (selectedSubmodel !== value) {
    setSelectedSubmodel(value);
  }

  const handleSubmitDropdown = useCallback(
    async (value: string) => {
      let url = '';
      if (value) {
        url += `?${createQueryString('submodel', value)}`;
      }

      // refreshRoute('/');
      router.push(url.toLowerCase());
      // refreshRoute(`${pathname}?${currentParams.toString()}`);
    },
    [router, createQueryString]
  );

  const uniqueSubmodelsFromModelData = Array.from(
    new Set(
      modelData.map((row) => row.submodel1).filter((model) => Boolean(model))
    )
  );

  // Need to trigger when value is updated and shouldTriggerSetParams is set to
  // true so handleSubmitDropdown will trigger
  useEffect(() => {
    if (value && shouldTriggerSetParams) {
      handleSubmitDropdown(value);
    }
  }, [value, shouldTriggerSetParams, handleSubmitDropdown]);

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
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Submodel</option>
      {uniqueSubmodelsFromModelData?.sort()?.map((submodel) => (
        <option
          key={`model-${submodel}`}
          value={submodel?.toLowerCase() as string}
        >
          {deslugify(submodel as string)}
        </option>
      ))}
    </select>
  );
}
