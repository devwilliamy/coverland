import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { getCompleteSelectionData } from '@/utils';
import KlarnaIcon from '@/components/icons/KlarnaIcon';

export default function ProductPricing() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const modelData = useStore(store, (s) => s.modelData);
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  const defaultMSRP = 180; // Cheapest Car Cover Price
  const defaultPrice: number = defaultMSRP * 2;

  const defaultMSRPMinus5Cents = defaultMSRP - 0.05;
  const installmentPrice = isComplete
    ? (selectedProduct?.price ?? 0) / 8 - 0.01
    : defaultPrice / 8 - 0.01;

  const displayMsrp = isComplete
    ? selectedProduct?.msrp
    : defaultMSRPMinus5Cents;
  const displayPrice = isComplete ? selectedProduct?.price : defaultPrice;
  return (
    <section className="flex flex-col pt-[18px] ">
      <p className="mb-3 text-[16px] leading-[14px]">
        {isComplete ? '' : 'From'}
      </p>
      <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]">${displayMsrp}</div>
        {displayPrice && (
          <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
            <span className=" text-[#BEBEBE] line-through">
              ${displayPrice}
            </span>
            <p>(-50%)</p>
          </div>
        )}
      </div>
      <div className="mt-1 flex items-center gap-0.5 ">
        <p className=" text-[16px] leading-[16px] text-[#767676] ">
          4 interest-free installments of{' '}
          <b className="font-[500] text-black">
            ${installmentPrice.toFixed(2)}
          </b>
        </p>
        <KlarnaIcon className="-ml-[5px] -mt-[1px] flex max-h-[35px] w-fit max-w-[65px]" />
      </div>
    </section>
  );
}
