'use client';;
import Image from 'next/image';
import { useState, useContext } from 'react';
import SeatCoverFreeDetails from './SeatCoverFreeDetails';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import { Rating } from '@mui/material';
import { useMediaQuery } from '@mantine/hooks';
import { useCartContext } from '@/providers/CartProvider';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { useRouter } from 'next/navigation';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import SeatCoverColorSelector from './SeatCoverColorSelector';
import CartSheet from '@/components/cart/CartSheet';
import AddToCart from './AddToCartSeatCover';
import EditVehicle from './EditVehicleSeatCover';
import { Separator } from '@/components/ui/separator';

export default function SeatContent({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const [coverPrice, setCoverPrice] = useState(400);

  const { addToCart } = useCartContext();
  const router = useRouter();
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);



  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <section className="flex h-full w-full flex-col max-lg:px-4 max-lg:pt-[34px] lg:sticky lg:top-8 lg:w-1/2">
      <div className="flex flex-col ">
        <Separator className="w-full bg-[#C8C7C7] lg:block" />

        <EditVehicle searchParams={searchParams} />
        <Separator className="w-full bg-[#C8C7C7]" />

        <div className="mt-4 flex flex-col gap-0.5 lg:mt-10">
          {/* Product Title */}
          <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
            Premium Comfort <br className="lg:hidden" /> Leather Seat Covers
          </h2>
          {/* Rating(s) */}
          <div className="flex pb-[36px] ">
            <Rating
              name="read-only"
              value={5}
              readOnly
              style={{
                height: '25px',
                color: '#BE1B1B',
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]">${coverPrice / 2 - 0.05}</div>
        <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
          <span className=" text-[#BEBEBE] line-through">${coverPrice}</span>
          <p>(-50%)</p>
        </div>
      </div>
      <div className="pb-4.5 mt-1.5 flex items-center gap-2 ">
        <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
          4 interest-free installments of{' '}
          <b className="font-[400] text-black">${coverPrice / 8 - 0.01}</b>
        </p>
        <Image alt="paypal-installents" src={installments} />
        {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
      </div>
      <SeatCoverColorSelector />
      <SeatCoverFreeDetails />
      {/* <CompatibleVehiclesTrigger /> */}
      <div className="lg:hidden">
        <AddToCart
          selectedProduct={selectedProduct}
          handleAddToCart={handleAddToCart}
          searchParams={searchParams}
          isSticky
        />
      </div>
      <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
      />
      <CartSheet
        open={addToCartOpen}
        setOpen={setAddToCartOpen}
        selectedProduct={selectedProduct}
      />
    </section>
  );
}
