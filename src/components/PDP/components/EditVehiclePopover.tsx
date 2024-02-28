'use client';

import { EditIcon } from '@/components/PDP/components/icons';
import EditVehicleDropdown from '../EditVehicleDropdown';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { IoClose } from 'react-icons/io5';
import { IProductData } from '@/app/(main)/utils';
import { useParams } from 'next/dist/client/components/navigation';

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
  const { make, model, year, productType } = params;
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
    <div className=" flex h-full flex-col  justify-center lg:hidden">
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="flex h-full items-center justify-between text-left text-base text-[#1A1A1A]">
          <div className="my-2 border-l-2 border-l-[#C8C7C7] pl-8 pr-8">
            <p>Your Vehicle</p>
            <h2 className=" text-[18px] font-[500] capitalize leading-[22px] text-[#1A1A1A]">
              {productName}
            </h2>
            <p className="text-[#8F8F8F]">{productNameSubtitle}</p>
          </div>
          <EditIcon />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col rounded-t-[20px] bg-white ">
            {/* We want to keep the padding top of DrawerContentContainer to be the same as the max-height of DrawerHeader */}
            <div
              id="DrawerContentContainer"
              className={`relative mx-auto ml-[-4px] flex max-h-[75vh] min-h-[75vh] w-full flex-col px-4 `}
            >
              <div
                id="DrawerHeader"
                className={`absolute mx-[-0.05px] my-[22px] ml-[-1rem] flex w-full flex-col justify-center  rounded-t-[20px] bg-white px-4 `}
              >
                <div className="flex max-h-[75px] items-center justify-between">
                  <div
                    id="DrawerTitle"
                    className="flex w-full items-center justify-center text-[22px] font-black uppercase"
                  >
                    SELECT YOUR VEHICLE
                  </div>
                  <button
                    id="CloseModalButton"
                    className=" flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
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
                <EditVehicleDropdown searchParams={searchParams} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
