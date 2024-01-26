import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Drawer } from 'vaul';

type AccordianDrawerProps = {
  title: string;
  description?: string | null;
  children: JSX.Element | JSX.Element[];
};

// function AccordionDrawerItem2(props: AccordianDrawerProps) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative ">
//       <Drawer open={open} onOpenChange={setOpen}>
//         <DrawerTrigger asChild className=" ">
//           <div className="flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
//             {props.title}
//             <FaPlus className="h-[15px] w-[15px]" />
//           </div>
//         </DrawerTrigger>
//         <DrawerContent className="">
//           <DrawerHeader>
//             <DrawerTitle className="flex w-full items-center border-b-2 border-[#C8C7C7] py-[22px] font-black uppercase">
//               <div
//                 id="DrawerTitle"
//                 className=" flex w-full text-[22px] font-black uppercase"
//               >
//                 {props.title}
//               </div>
//               <div
//                 id="CloseModalButton"
//                 className="flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setOpen(false);
//                 }}
//               >
//                 <IoClose className="h-[24px] w-[24px]" />
//               </div>
//             </DrawerTitle>
//             {props.description ? (
//               <DrawerDescription>{props.description}</DrawerDescription>
//             ) : (
//               <></>
//             )}
//           </DrawerHeader>
//           <div className="mx-auto flex max-h-[76vh] w-full flex-col overflow-y-scroll px-4 pt-[40px]">
//             {props.children}
//           </div>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// }

function AccordionDrawerItem(props: AccordianDrawerProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 1000);
    }
  }, [open]);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="">
        <div className="flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          {props.title}
          <FaPlus className="h-[15px] w-[15px]" />
        </div>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] flex max-h-[75vh] flex-col rounded-t-[20px] bg-white">
          <div
            id="DrawerHeader"
            className="absolute left-0 top-0 z-[100] mx-[-0.05px] max-h-[175px] w-full rounded-t-[20px] bg-white px-4 "
          >
            <div className="flex items-center justify-end border-b border-[#C8C7C7]">
              <div className="flex w-full pb-4 pt-6">{props.title}</div>
              <div
                className="my-4 flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <IoClose className="h-[24px] w-[24px]" />
              </div>
            </div>
          </div>
          <div
            id="DrawerContentContainer"
            className="mx-auto flex min-h-[50vh] w-full flex-col overflow-y-scroll px-4 pt-20"
          >
            <div>{props.children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
export default AccordionDrawerItem;
