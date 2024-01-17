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
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function SubmodelSearch2nd({
  setSelectedSecondSubmodel,
  modelData,
  submodelParam2nd,
  secondSubmodels,
}: {
  modelData: TProductData[];
  setSelectedSecondSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam2nd: string | null;
  secondSubmodels: string[];
}) {
  const [value, setValue] = useState(() => submodelParam2nd ?? '');
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
  const secondSubmodelData = Array.from(
    new Set(modelData.map((d) => d.submodel2))
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSecondSubmodel(newValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="my-2 rounded-lg px-2 py-3 text-lg"
    >
      <option value="">Select your secondary submodel</option>
      {secondSubmodelData?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel ?? ''}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
