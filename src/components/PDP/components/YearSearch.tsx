'use client';

import { Dispatch, SetStateAction, useState } from 'react';
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

export function YearSearch({
  setYear,
  yearData,
  yearParam,
}: {
  setYear: Dispatch<SetStateAction<string | null>>;
  yearData: string[];
  yearParam: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => yearParam ?? '');

  if (yearParam) return null;

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[60px] justify-between"
        >
          {value ? value : 'Select car year'}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] h-[300px] p-0 text-xl">
        <Command>
          <CommandInput placeholder="Enter Year" />
          <CommandEmpty>No year found.</CommandEmpty>
          <CommandGroup className="overflow-scroll">
            {yearData.map((year) => (
              <CommandItem
                key={`year-${year}`}
                value={year}
                onSelect={(value) => {
                  setValue(value);
                  setOpen(false);
                  setYear(value);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === year ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {year}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
