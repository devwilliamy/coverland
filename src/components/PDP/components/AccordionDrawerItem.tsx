import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  // DrawerDescription,
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
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className=" ">
        <div className="flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          {props.title}
          <FaPlus className="h-[15px] w-[15px]" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[76vh]">
        <DrawerHeader id="DrawerHeader">
          <DrawerTitle className="flex w-full items-center border-b-2 border-[#C8C7C7] py-[22px] font-black uppercase">
            <div
              id="DrawerTitle"
              className=" flex w-full text-[22px] font-black uppercase"
            >
              {props.title}
            </div>
            <div
              id="CloseModalButton"
              className="flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <IoClose className="h-[24px] w-[24px]" />
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div
          id="DrawerContentContainer"
          className="mx-auto flex  w-full flex-col overflow-y-scroll px-4 pt-[40px]"
        >
          {props.children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export default AccordionDrawerItem;
