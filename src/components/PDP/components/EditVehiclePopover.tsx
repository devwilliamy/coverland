'use client';

import { EditIcon } from '@/components/PDP/components/icons';
import EditVehicleDropdown from '../EditVehicleDropdown';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { IoClose } from 'react-icons/io5';

export default function EditVehiclePopover({
  fullProductName,
}: {
  fullProductName: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col lg:hidden">
      <h2 className=" max-h-[42px] text-[22px] font-[900] leading-[120%] text-[#1A1A1A]">
        {fullProductName}
      </h2>
      <div className="mt-3.5 flex items-center gap-1.5">
        <div className="flex aspect-square max-h-[16px] min-h-[16px] items-center">
          <EditIcon />
        </div>
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger className="text-left text-base font-black text-[#1A1A1A] !no-underline">
            <p className="text-[14px] font-[400]  underline">Edit Vehicle</p>
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
                  <EditVehicleDropdown />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
