'use client';
import useDetermineType from '@/hooks/useDetermineType';
import { useMediaQuery } from '@mantine/hooks';

export default function ProtectHeaderText() {
  const { make, model, productType } = useDetermineType();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  let productTypeFormatted = productType;
  if (productType === 'truck-covers') {
    productTypeFormatted = 'Truck';
  } else if (productType === 'suv-covers') {
    productTypeFormatted = productType.toUpperCase();
    productTypeFormatted = productType?.slice(0, 3);
  } else {
    productTypeFormatted = productType?.slice(0, 3);
  }
  const protectText = model ?? make ?? productTypeFormatted;

  return (
    <p className="w-full text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[28px] lg:text-[45px] lg:leading-[32px]">
      Protect your <span className={`capitalize`}>{protectText}</span> now
    </p>
  );
}
