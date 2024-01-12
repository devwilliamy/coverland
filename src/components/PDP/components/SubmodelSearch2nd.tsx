'use client';

import { TProductData } from '@/lib/db';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
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

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSelectedSecondSubmodel(newValue);
  };
  return (
    <select
      value={value}
      onChange={handleChange}
      className="text-lg rounded-lg py-3 px-2"
    >
      <option value="">Select car model</option>
      {secondSubmodels?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
