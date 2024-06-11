'use client';
import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import { deslugify } from '@/lib/utils';
import { useStore } from 'zustand';

export default function CustomForText() {
  const { make, model } = useDetermineType();
  const store = useStoreContext();
  if (!store)
    throw new Error('Missing CarCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const customText = model
    ? selectedProduct.model
    : make
      ? selectedProduct.make
      : 'Your Vehicle';

  return (
    <>
      <p className="flex w-full items-center justify-center pt-[43px]  text-center text-[16px] font-[500] leading-[26px] text-[#B23B4E] lg:pb-[20px] lg:pt-[66px] lg:text-[26px] ">
        Elevate Comfort And Style
      </p>
      <p className="flex w-full items-center justify-center text-center text-[26px] font-[500] normal-case leading-[26px] text-white max-lg:pb-[34px] lg:pb-[38px] lg:text-[45px]  lg:leading-[32px]">
        Perfect Fit for {customText}
      </p>
    </>
  );
}
