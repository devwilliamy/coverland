'use client';
import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import { Rating } from '@mui/material';
import { useCartContext } from '@/providers/CartProvider';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import SeatCoverColorSelector from './SeatCoverColorSelector';
import PreorderSheet from '@/components/cart/PreorderSheet';
import { Separator } from '@/components/ui/separator';
import { getCompleteSelectionData, TPathParams, TQueryParams } from '@/utils';
import AddToCart from '@/components/cart/AddToCart';
import EditVehicle from '@/components/edit-vehicle/EditVehicle';
import FreeDetails from '../../[productType]/components/FreeDetails';
import ReviewsTextTrigger from '../../[productType]/components/ReviewsTextTrigger';
import SeatCoverSelection from './SeatCoverSelector';
import { deslugify } from '@/lib/utils';
import useDetermineType from '@/hooks/useDetermineType';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { handleCheckLowQuantity } from '@/lib/utils/calculations';
import KlarnaIcon from '@/components/icons/KlarnaIcon';
import useStoreContext from '@/hooks/useStoreContext';
import { handlePreorderAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';

export default function SeatContent({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const router = useRouter();
  const params = useParams<TPathParams>();

  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const { addToCart } = useCartContext();
  const { make, model } = useDetermineType();

  const [coverPrice, setCoverPrice] = useState(320);
  const [discountPercent, setDiscountPercent] = useState<number | null>(50);
  const [newMSRP, setNewMSRP] = useState<number | null>(selectedProduct.msrp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkLowQuantity = async () => {
      const {
        discountPercent: incomingDiscountPercent,
        newMSRP: incomingMSRP,
      } = handleCheckLowQuantity(selectedProduct as TSeatCoverDataDB);
      setDiscountPercent(incomingDiscountPercent);
      setNewMSRP(incomingMSRP);
    };
    checkLowQuantity();

    setLoading(false);
  }, [selectedProduct]);
  const handleAddToCart = () => {
    // if (!cartProduct) return; I commented this out, cartProduct is undefined
    // TODO: Get rid of all newMSRP stuff in her'e
    if (!selectedProduct.sku) {
      const params = {
        ...searchParams,
        type: 'Seat Covers',
        submodel1: searchParams.submodel, // Because the search params is submodel instead of submodel1
      };
      addToCart({ ...selectedProduct, ...params, quantity: 1 });
    } else if (newMSRP !== 0) {
      addToCart({ ...selectedProduct, msrp: newMSRP, quantity: 1 });
    } else {
      addToCart({ ...selectedProduct, quantity: 1 });
    }

    if (selectedProduct.preorder) {
      if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
        handlePreorderAddToCartGoogleTag(
          selectedProduct,
          params as TPathParams,
          'preorder_1_add-to-cart'
        );
      }
      setAddToCartOpen(true);
      return;
    } else {
      router.push('/checkout');
    }
  };

  if (!selectedProduct.price) {
    setLoading(false);
    throw new Error('No Selected Product Price in store');
  }
  const installmentPrice = newMSRP !== 0 ? newMSRP : selectedProduct.msrp;

  return (
    <section className="flex w-full flex-col max-lg:px-4 max-lg:pt-4 lg:sticky lg:top-8 lg:w-1/2">
      <div className="flex flex-col ">
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
        <EditVehicle searchParams={searchParams} />
        <Separator className="w-full bg-[#C8C7C7]" />
        <div className="mt-4 flex flex-col gap-0.5 lg:mt-10">
          {/* Product Title */}
          <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
            {make === 'rivian' && 'Seat Covers for '}
            {make && (selectedProduct.make as string)}{' '}
            {model && (selectedProduct.model as string)}{' '}
            {make === 'rivian' ? '' : 'Seat Covers'}
            {' - '}
            <br className="max-lg:hidden" /> Custom-Fit, Comfort Leather
          </h2>
          {/* Rating(s) */}
          <div className="-ml-0.5 mt-1 flex items-end gap-1 lg:mt-2">
            <div className="flex gap-1 ">
              <Rating
                name="read-only"
                value={4.5}
                precision={0.1}
                readOnly
                sx={{
                  gap: '2px',
                  '& .MuiRating-iconFilled': {
                    color: '#BE1B1B',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#BE1B1B',
                  },
                }}
              />
            </div>
            <ReviewsTextTrigger />
          </div>
        </div>
      </div>
      <div className=" flex items-end  gap-[9px] pt-[18px] text-center text-[28px] font-[900] lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]">${newMSRP}</div>
        {discountPercent && (
          <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
            <span className=" text-[#BEBEBE] line-through">
              ${selectedProduct.price}
            </span>
            <p>(-{discountPercent}%)</p>
          </div>
        )}
      </div>
      <div className="pb-4.5 flex items-center gap-0.5">
        {installmentPrice && (
          <p className="text-[16px] leading-[16px] text-[#767676] lg:text-[16px]">
            4 interest-free installments of{' '}
            <b className="font-[500] text-black">
              ${(installmentPrice / 4).toFixed(2)}
            </b>
          </p>
        )}
        <KlarnaIcon className="-ml-[5px] -mt-[1px] flex max-h-[35px] w-fit max-w-[65px]" />
      </div>
      {!!isComplete ? <SeatCoverSelection /> : null}
      <SeatCoverColorSelector />
      <FreeDetails />
      {/* <CompatibleVehiclesTrigger /> */}
      <div className="lg:py-4"></div>
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
      <PreorderSheet
        open={addToCartOpen}
        setOpen={setAddToCartOpen}
        selectedProduct={selectedProduct}
      />
    </section>
  );
}
