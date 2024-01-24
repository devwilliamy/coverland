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
  const titleSpacing = 60;
  return (
    <AccordionItem className="relative" value={props.value}>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="flex w-full flex-row items-center justify-between py-4 text-left text-xl font-black text-[#1A1A1A] !no-underline">
          <button className="uppercase">{props.title}</button>
          <FaPlus className="h-[15px] w-[15px]" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[20px] bg-white ">
            {/* We want to keep the padding top of DrawerContentContainer to be the same as the max-height of DrawerHeader */}
            <div
              id="DrawerContentContainer"
              className={`relative mx-auto flex max-h-[75vh] min-h-[75vh] w-full flex-col overflow-y-scroll px-4 pt-[100px]`}
            >
              <div
                id="DrawerHeader"
                className={`absolute left-0 top-0 z-[100] mx-[-0.05px] max-h-[${titleSpacing}px] w-full rounded-t-[20px] bg-white px-4 `}
              >
                <div className="border-gray-[#BEBEBE] mb-[39px] flex items-center justify-between border-b-2">
                  <div
                    id="DrawerTitle"
                    className=" flex w-full py-4 text-xl font-black uppercase"
                  >
                    {props.title}
                  </div>
                  <div
                    id="CloseModalButton"
                    className="my-4 flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <IoClose className="h-[24px] w-[24px]" />
                  </div>
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
