'use client';

import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type AccordianDrawerProps = {
  title: string;
  description?: string | null;
  children: JSX.Element | JSX.Element[];
};

function AccordionDrawerItem(props: AccordianDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Drawer open={open} onOpenChange={setOpen} scrollLockTimeout={200}>
        <DrawerTrigger className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          {props.title}
          <FaPlus className="h-[15px] w-[15px]" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader draggable={false}>
            <DrawerTitle className="flex w-full items-center border-b-2 border-[#C8C7C7] py-[22px] font-black uppercase">
              <div
                id="DrawerTitle"
                className=" flex w-full text-[22px] font-black uppercase"
              >
                {props.title}
              </div>
              <button
                id="CloseModalButton"
                className="flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <IoClose className="h-[24px] w-[24px]" />
              </button>
            </DrawerTitle>
            {props.description ? (
              <DrawerDescription>{props.description}</DrawerDescription>
            ) : (
              <></>
            )}
          </DrawerHeader>
          <div className="mx-auto flex max-h-[76vh]  min-h-[76vh] w-full flex-col overflow-y-scroll px-4 pt-[40px]">
            {props.children}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AccordionDrawerItem;
