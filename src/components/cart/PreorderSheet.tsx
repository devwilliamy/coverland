import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from '@/components/ui/sheet';
  import { IoClose } from 'react-icons/io5';
  import PreorderHeader from '../cart/PreorderHeader';
  import PreorderBody from '../cart/PreorderBody';
  import PreorderFooter from '../cart/PreorderFooter';
  import { TInitialProductDataDB } from '@/lib/db';
  import { IProductData } from '@/utils';
  import { useMediaQuery } from '@mantine/hooks';
  import { Separator } from '../ui/separator';
  import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
  import PriceBreakdown from './PriceBreakdown';
  
  type CartSheetProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedProduct: TInitialProductDataDB | IProductData | null | undefined | TSeatCoverDataDB;
  };
  const CartSheet = ({
    open,
    setOpen,
    selectedProduct,
  }: CartSheetProps): JSX.Element => {
    const isMobile = useMediaQuery('(max-width: 1023px)');
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="flex flex-col gap-0 max-lg:max-h-[85vh] max-lg:rounded-t-2xl"
          side={isMobile ? 'bottom' : 'right'}
        >
          <SheetHeader>
            <SheetTitle className="flex w-full items-center justify-between py-7 pl-4 pr-7">
              <PreorderHeader />
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
            <Separator />
          </SheetHeader>
          <div className=" flex w-full flex-col overflow-y-scroll px-4">
            <PreorderBody selectedProduct={selectedProduct} />
          </div>
          <div className="w-full bg-white shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)]">
            <SheetFooter>
              <SheetClose asChild>
                <PreorderFooter />
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default CartSheet;
  