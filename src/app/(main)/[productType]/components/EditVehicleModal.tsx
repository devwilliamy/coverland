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
import { useParams } from 'next/navigation';

export function EditVehicleModal({
  selectedProduct,
  searchParams,
}: {
  selectedProduct: IProductData;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const [open, setOpen] = useState(false);
  const params = useParams<{
    make?: string;
    model?: string;
    year?: string;
    productType?: string;
  }>();
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  if (!params) return null;
  const { make, year } = params;
  const {
    make: selectedMake,
    model: selectedModel,
    year_generation: selectedYear,
    type,
    submodel1,
  } = selectedProduct;

  const productName = make ? `${selectedMake} ${selectedModel}` : `${type}`;
  const productNameSubtitle = year
    ? `${submodel1 ?? ''} ${selectedYear ?? ''}`
    : '';

  return (
    <div className="my-4 hidden w-full border-l-2 border-l-[#C8C7C7] lg:flex lg:flex-col">
      <Popover open={open} onOpenChange={() => setOpen(!open)}>
        <PopoverTrigger asChild>
          <div className="flex w-full flex-shrink cursor-pointer items-center justify-between pl-[40px]">
            <div className="">
              <p className="">Your Vehicle</p>
              <h2 className="  break-normal text-[26px] font-[500] capitalize leading-[31px]">
                {productName}
              </h2>
              <p className="text-[#8F8F8F]">{productNameSubtitle}</p>
            </div>
            <EditIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
          <EditVehicleDropdown setOpen={setOpen} searchParams={searchParams} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
