'use client';

import { TProductData } from '@/lib/db';
import { Dispatch, SetStateAction, useState } from 'react';
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

export function SubmodelSearch({
  setSelectedSubmodel,
  modelData,
  submodelParam,
}: {
  modelData: TProductData[];
  setSelectedSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => submodelParam ?? '');
  // console.log('modelData', modelData);

  const { uniqueSubmodel1 } = extractUniqueValues(modelData as TProductData[]);

  // console.log(uniqueSubmodel1);

  if (uniqueSubmodel1.length < 2) return null;

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[60px] justify-between"
        >
          {value || 'Select your car submodel'}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] h-[300px] p-0 text-xl">
        <Command>
          <CommandInput placeholder="Enter Generation" />
          <CommandEmpty>No submodel found.</CommandEmpty>
          <CommandGroup className="overflow-scroll">
            {uniqueSubmodel1.map((sub) => (
              <CommandItem
                key={`generation-${sub}`}
                value={sub}
                onSelect={(value) => {
                  setValue(value);
                  setOpen(false);
                  setSelectedSubmodel(value);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === sub ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {sub}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
