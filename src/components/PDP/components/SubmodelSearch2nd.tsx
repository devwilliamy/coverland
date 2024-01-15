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

export function SubmodelSearch2nd({
  setSelectedSubmodel,
  modelData,
  submodelParam2nd,
  secondSubmodels,
}: {
  modelData: TProductData[];
  setSelectedSubmodel: Dispatch<SetStateAction<string | null>>;
  submodelParam2nd: string | null;
  secondSubmodels: string[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => submodelParam2nd ?? '');

  // console.log('secondSubmodels', secondSubmodels);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[60px] justify-between"
        >
          {value ? value : 'Select your additional car submodel'}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] h-[300px] p-0 text-xl">
        <Command>
          <CommandInput placeholder="Enter Generation" />
          <CommandEmpty>No submodel found.</CommandEmpty>
          <CommandGroup className="overflow-scroll">
            {secondSubmodels.map((sub) => (
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
