import { useState } from 'react';
import { AccordionItem } from '@/components/ui/accordion';
import { FaPlus } from 'react-icons/fa';
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
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="flex w-full flex-row justify-between py-4 text-left text-xl font-black text-[#1A1A1A] !no-underline">
          <button className="uppercase">{props.title}</button>
          {/* <FaChevronDown /> */}
          <FaPlus />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[20px] bg-white ">
            <div
              id="DrawerContentContainer"
              className="mx-auto flex max-h-[90vh] min-h-[90vh] w-full flex-col overflow-y-scroll px-4 pt-[175px]"
            >
              <div
                id="DrawerHeader"
                className="absolute left-0 top-0 z-[100] mx-[-0.05px] max-h-[175px] w-full rounded-t-[20px] bg-white px-4 "
              >
                <div className="flex items-center justify-end">
                  <div
                    className="my-4 flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoClose className="h-[36px] w-[36px]" />
                  </div>
                </div>
                <div className="border-gray-[#BEBEBE] mb-[39px] flex w-full border-b-2 border-t-2 py-4 text-2xl font-black uppercase">
                  {props.title}
                </div>
              </div>
              <div>{props.children}</div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </AccordionItem>
  );
}

export default AccordionDrawerItem;
