'use client';

import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { EditIcon } from '@/components/PDP/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TCarCoverData } from './CarPDP';
import { useState } from 'react';
import { compareRawStrings } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function EditVehicleModal({
  selectedProduct,
  submodelParam,
}: {
  selectedProduct: TCarCoverData;
  submodelParam: string | undefined | null;
}) {
  const [open, setOpen] = useState(false);

  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';

  const productName = `${selectedProduct?.year_generation}
            ${selectedProduct?.make} ${selectedProduct?.product_name} ${
              submodelParam ? selectedProduct?.submodel1 : ''
            } ${productType}`;

  return (
    <div>
      <h2 className="my-[15px] font-[900] leading-[30px] md:text-[28px]">
        {productName}
      </h2>
      <div className="flex items-center gap-2">
        <EditIcon />
        <Popover open={open} onOpenChange={(o) => setOpen(o)}>
          <PopoverTrigger asChild>
            <button className="underline" onClick={() => setOpen(!open)}>
              Edit Vehicle
            </button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
            <EditVehicleDropdown setOpen={setOpen} />
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-10" />
    </div>
  );
}
