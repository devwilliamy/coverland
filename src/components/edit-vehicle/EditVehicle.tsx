'use client';
import EditVehiclePopover from './EditVehiclePopover';
import EditVehicleModal from '@/components/edit-vehicle/EditVehicleModal';
import SuvIcon from '@/components/PDP/components/icons/SuvIcon';
import TruckIcon from '@/components/PDP/components/icons/TruckIcon';
import CarIcon from '@/components/PDP/components/icons/CarIcon';
import useDetermineType from '@/hooks/useDetermineType';
import { useStore } from 'zustand';
import { TQueryParams } from '@/utils';
import useStoreContext from '@/hooks/useStoreContext';

type EditVehicleProps = {
  searchParams: TQueryParams;
};
export default function EditVehicle({ searchParams }: EditVehicleProps) {
  const store = useStoreContext()
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const { isTruckCover, isSUVCover } = useDetermineType();

  return (
    <div className="grid grid-cols-[1fr_2fr] place-items-center ">
      <div className="flex max-h-[24px] max-w-[64px]  items-center justify-center lg:max-h-[42px] lg:max-w-[116px]">
        <div className={` ${!isTruckCover && !isSUVCover ? 'flex' : 'hidden'}`}>
          <CarIcon />
        </div>
        <div className={` ${isTruckCover ? 'flex' : 'hidden'}`}>
          <TruckIcon />
        </div>
        <div className={` ${isSUVCover ? 'flex' : 'hidden'}`}>
          <SuvIcon />
        </div>
      </div>
      <EditVehicleModal
        selectedProduct={selectedProduct}
        searchParams={searchParams}
      />
      <EditVehiclePopover
        selectedProduct={selectedProduct}
        searchParams={searchParams}
      />
    </div>
  );
}
