'use client';
import useDetermineType from '@/hooks/useDetermineType';
import { useMediaQuery } from '@mantine/hooks';

export default function ProtectHeaderText() {
  const { make, model, productType } = useDetermineType();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  let vehicleType = productType;
  console.log(productType);
  vehicleType?.split('-')[0];

  return (
    <p className="w-full text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[28px] lg:text-[45px] lg:leading-[32px]">
      Best Cover for <span className={`capitalize`}>{vehicleType}</span>s
    </p>
  );
}
