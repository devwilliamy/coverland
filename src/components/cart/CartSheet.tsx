import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import AddToCartHeader from '../cart/AddToCartHeader';
import AddToCartBody from '../cart/AddToCartBody';
import AddToCartFooter from '../cart/AddToCartFooter';
import { TInitialProductDataDB } from '@/lib/db';
import { IProductData } from '@/app/(main)/utils';

type CartSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProduct: TInitialProductDataDB | IProductData | null | undefined;
};
const CartSheet = ({
  open,
  setOpen,
  selectedProduct,
}: CartSheetProps): JSX.Element => {
  return (
    <Sheet open={open}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-between py-7 pl-4 pr-7">
            <AddToCartHeader />
            <SheetClose
              asChild
              className="cursor-pointer bg-gray-200 text-black *:h-6 *:w-6"
            >
              <button
                className="rounded-full p-[5px]"
                onClick={() => setOpen(false)}
              >
                <IoClose />
              </button>
            </SheetClose>
          </SheetTitle>
          <div className="border-b bg-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.1)]"></div>
        </SheetHeader>
        <div className="mx-auto flex h-screen w-full flex-col overflow-y-scroll px-4 pt-20">
          <AddToCartBody selectedProduct={selectedProduct} />
        </div>
        <div className="w-full bg-white shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)]">
          <SheetFooter>
            <SheetClose asChild>
              <AddToCartFooter />
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
