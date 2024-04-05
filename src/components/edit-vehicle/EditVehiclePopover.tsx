'use client';;
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { EditIcon } from '@/components/PDP/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { IProductData } from '@/utils';
import { useParams } from 'next/navigation';

export default function EditVehiclePopover({
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
  if (!params) return null;
  const { make, year, model } = params;
  const {
    make: selectedMake,
    model: selectedModel,
    year_generation: selectedYear,
    type,
    submodel1,
  } = selectedProduct;

  const productName = make
    ? `${selectedMake} ${model ? selectedModel : ''}`
    : `${type}`;
  const productNameSubtitle = year
    ? `${submodel1 ?? ''} ${selectedYear ?? ''}`
    : '';

  return (
    <div className="my-4 hidden w-full border-l-2 border-l-[#C8C7C7] lg:flex lg:flex-col">
      <Popover open={open} onOpenChange={() => setOpen(!open)}>
        <PopoverTrigger asChild>
          <button className="flex w-full flex-shrink cursor-pointer items-center justify-between pl-[30px]">
            <div className="flex w-full flex-col items-start justify-start">
              <p className="">Your Vehicle</p>
              <h1 className="break-normal text-left text-[26px] font-[500] capitalize leading-[31px]">
                {productName}
              </h1>
              <h2 className="text-[#8F8F8F]">{productNameSubtitle}</h2>
            </div>
            <EditIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
          <EditVehicleDropdown setOpen={setOpen} searchParams={searchParams} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
