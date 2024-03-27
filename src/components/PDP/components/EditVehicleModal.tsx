'use client';

import { EditIcon } from '@/components/PDP/icons';
import EditVehicleDropdown from '../EditVehicleDropdown';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IProductData } from '@/app/(main)/utils';
import { useParams } from 'next/dist/client/components/navigation';
import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function EditVehicleModal({
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
    <div className=" flex h-full w-full flex-col  justify-center lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex h-full items-center justify-between text-left text-base text-[#1A1A1A]">
          <div className="my-2 border-l-2 border-l-[#C8C7C7] pl-8 pr-8">
            <p>Your Vehicle</p>
            <h1 className=" text-[18px] font-[500] capitalize leading-[22px] text-[#1A1A1A]">
              {productName}
            </h1>
            <h2 className="text-[#8F8F8F]">{productNameSubtitle}</h2>
          </div>
          <EditIcon />
        </SheetTrigger>
        <SheetPortal>
          <SheetContent
            className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col rounded-t-[20px] bg-white "
            side="bottom"
          >
            {/* We want to keep the padding top of SheetContentContainer to be the same as the max-height of SheetHeader */}
            <div
              id="SheetContentContainer"
              className={`relative mx-auto ml-[-4px] flex max-h-[75vh] min-h-[75vh] w-full flex-col px-4 `}
            >
              <div
                id="SheetHeader"
                className={`absolute mx-[-0.05px] my-[22px] ml-[-1rem] flex w-full flex-col justify-center  rounded-t-[20px] bg-white px-4 `}
              >
                <div className="flex max-h-[75px] items-center justify-between">
                  <div
                    id="SheetTitle"
                    className="flex w-full items-center justify-center text-[22px] font-black uppercase"
                  >
                    SELECT YOUR VEHICLE
                  </div>
                  <button
                    id="CloseModalButton"
                    className=" flex items-center justify-center rounded-full bg-gray-200 p-1"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoClose className="h-[24px] w-[24px]" />
                  </button>
                </div>
              </div>
              <div
                id="EditVehicleContainer"
                className="flex min-h-[50vh] pt-[75px] "
              >
                <EditVehicleDropdown
                  setOpen={setOpen}
                  searchParams={searchParams}
                />
              </div>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    </div>
  );
}
