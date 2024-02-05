'use client';

import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { EditIcon } from '@/components/PDP/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CarSelectionContext } from './CarPDP';
import { useContext, useState } from 'react';
import { IProductData } from '../../utils';

export function EditVehicleModal({
  selectedProduct,
}: {
  selectedProduct: IProductData;
}) {
  const [open, setOpen] = useState(false);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  return (
    <div className=" mt-[29px] hidden flex-col gap-2 rounded-lg border-2 border-solid px-3 py-7 lg:flex">
      <h2 className="font-roboto text-lg font-extrabold text-[#1A1A1A] md:text-[28px]">
        {selectedProduct.fullProductName}
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
    </div>
  );
}
