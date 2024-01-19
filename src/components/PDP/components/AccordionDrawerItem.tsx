import React, { useState } from 'react';
import {
  // Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { FaChevronDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Drawer } from 'vaul';

type AccordianDrawerProps = {
  value: string;
  title: string;
  description?: string | null;
  children: JSX.Element | JSX.Element[];
};

function AccordionDrawerItem(props: AccordianDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <AccordionItem className="relative" value="item-1">
      {/* <AccordionTrigger
        className="disabled text-xl font-black uppercase text-[#1A1A1A] !no-underline"
        id="#reviews"
      >
       
      </AccordionTrigger> */}
      {/* <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className=" flex w-full flex-row justify-between py-4 text-left text-xl font-black uppercase text-[#1A1A1A] !no-underline">
          {props.title}
          <FaChevronDown />
        </DrawerTrigger>

        <DrawerContent className="">
          <DrawerHeader draggable={false}>
            <div className="flex w-full items-center justify-end pb-2 pr-2">
              <DrawerClose className="flex items-center justify-center rounded-full bg-gray-200 p-[5px]">
                <IoClose className="h-[36px] w-[36px]" />
              </DrawerClose>
            </div>
            <DrawerTitle className="border-gray-[#BEBEBE] flex w-full border-b-2 border-t-2 py-4 text-2xl font-black uppercase">
              {props.title}
            </DrawerTitle>
            {props.description ? (
              <DrawerDescription>{props.description}</DrawerDescription>
            ) : (
              <></>
            )}
          </DrawerHeader>
          <div className="mx-auto flex max-h-[76vh] w-full flex-col overflow-y-scroll rounded-t-[10px] p-4">
            {props.children}
          </div>
        </DrawerContent>
      </Drawer> */}

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="flex w-full flex-row justify-between py-4 text-left text-xl font-black text-[#1A1A1A] !no-underline">
          <button className="uppercase">{props.title}</button>
          <FaChevronDown />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[10px]  bg-white">
            <div
              className="
            mx-auto flex max-h-[90vh] w-full flex-col overflow-y-scroll rounded-t-[20px] p-4 pt-0
            "
            >
              <div className="sticky top-0 z-10  w-full bg-white">
                <div className="flex items-center justify-end">
                  <div
                    className="mb-4 mt-4 flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoClose className="h-[36px] w-[36px]" />
                  </div>
                </div>
                <div className="border-gray-[#BEBEBE] mb-4 flex w-full border-b-2 border-t-2  py-4 text-2xl font-black uppercase">
                  {props.title}
                </div>
              </div>
              {props.children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </AccordionItem>
  );
}

export default AccordionDrawerItem;
