'use client';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

export default function ProtectHeaderText() {
  const store = useStoreContext();
  if (!store)
    throw new Error('Missing CarCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  let skuTypeSegment = selectedProduct.sku?.split('-')[1];
  const getVehicleType = () => {
    switch (skuTypeSegment) {
      case 'TC':
        return 'Truck';
      case 'SC':
        return 'SUV';
      default:
        return 'Car';
    }
  };

  return (
    <p className="w-full text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[28px] lg:text-[45px] lg:leading-[32px]">
      Best Cover for <span className={`capitalize`}>{getVehicleType()}</span>s
    </p>
  );
}
