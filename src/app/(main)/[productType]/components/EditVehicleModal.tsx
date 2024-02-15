'use client';

import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { EditIcon } from '@/components/PDP/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
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
    <div className="mb-4 hidden w-full border-l-2 border-l-[#C8C7C7] lg:flex lg:flex-col">
      <Popover open={open} onOpenChange={() => setOpen(!open)}>
        <PopoverTrigger asChild>
          <div className="flex w-full flex-shrink cursor-pointer justify-between pl-[40px]">
            <div className="">
              <p className="">Your Vehicle</p>
              <h2 className=" whitespace-nowrap text-[26px] font-[500] capitalize leading-[31px]">
                {selectedProduct.fullProductName}
              </h2>
            </div>
            <div className="p-[3px]">
              <EditIcon />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
          <EditVehicleDropdown setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
