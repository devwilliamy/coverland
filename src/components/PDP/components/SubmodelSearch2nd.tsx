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

export function SubmodelSearch2nd({
  setSelectedSecondSubmodel,
  modelData,
  submodelParam2nd,
  selectedSubmodel,
}: {
  modelData: TProductData[];
  setSelectedSecondSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam2nd: string | null;
  selectedSubmodel: string | null;
}) {
  const [value, setValue] = useState(() => submodelParam2nd ?? '');
  const searchParams = useSearchParams();
  const [availableSecondSubmodels, setAvailableSecondSubmodels] = useState<
    string[]
  >([]);

  // Updates the second submodel based on when first submodel is selected
  // Checking for lower case because if only submodel is in search params, it'll pass down
  // as string to slug (lower case) but submodel is Camel Cased
  useEffect(() => {
    const secondSubmodelData: string[] = Array.from(
      new Set(
        modelData
          .filter(
            (d) =>
              d.submodel1?.toLowerCase() === selectedSubmodel?.toLowerCase()
          )
          .map((d) => d.submodel2)
          .filter((submodel) => submodel !== null && submodel !== undefined)
          .map((submodel) => submodel as string)
      )
    );
    if (selectedSubmodel) {
      setAvailableSecondSubmodels(secondSubmodelData);
    }
  }, [selectedSubmodel, modelData]);

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

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSecondSubmodel(newValue);
  };
  console.log('2ndSearch availableSecondSubmodels:', availableSecondSubmodels);
  console.log('2ndSearch value:', value);
  return (
    <select
      value={value}
      onChange={handleChange}
      className="my-2 rounded-lg px-2 py-3 text-lg"
    >
      <option value="">Select your secondary submodel</option>
      {availableSecondSubmodels?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel ?? ''}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
