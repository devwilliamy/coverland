'use client';
import SuvIcon from '@/components/PDP/components/icons/SuvIcon';
import TruckIcon from '@/components/PDP/components/icons/TruckIcon';
import CarIcon from '@/components/PDP/components/icons/CarIcon';
import useDetermineType from '@/hooks/useDetermineType';

export default function EditVehicleIcon() {
  const { isTruckCover, isSUVCover } = useDetermineType();
  return (
    <>
      <div className="flex">
        {isTruckCover ? <TruckIcon /> : isSUVCover ? <SuvIcon /> : <CarIcon />}
      </div>
    </>
  );
}
