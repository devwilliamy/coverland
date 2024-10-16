import KlarnaIcon from '@/components/icons/KlarnaIcon';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

export default function ProductPricing() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { msrp, price } = useStore(store, (s) => s.selectedProduct);

  const discountPercent = 50;
  const installmentPrice = msrp;

  return (
    <>
      <div className="flex items-center gap-[6px] pt-8 text-center text-2xl font-black lg:pt-9 lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]">${msrp}</div>
        {discountPercent && (
          <div className="flex gap-1.5 pb-[1px] text-lg font-normal leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
            <span className=" text-[#BEBEBE] line-through">${price}</span>
            <p>(-{discountPercent}%)</p>
          </div>
        )}
      </div>
      <div className="pb-4.5 flex items-center gap-0.5 lg:pt-[11px]">
        {installmentPrice && (
          <p className="text-sm text-[#767676] lg:text-[16px]">
            4 interest-free installments of{' '}
            <b className="font-[500] text-black">
              ${(installmentPrice / 4).toFixed(2)}
            </b>
          </p>
        )}
        <KlarnaIcon className="-ml-[5px] -mt-[1px] flex max-h-[35px] w-fit max-w-[65px]" />
      </div>
    </>
  );
}
