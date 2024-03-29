'use client';
import useDetermineType from '@/hooks/useDetermineType';
import F150Banner from '@/images/PDP/PDP-Redesign-v3/f-150 banner.webp';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function DetailsTabHeader() {
  const { make, model } = useDetermineType();
  const params = useParams();
  const year = params?.year;
  return (
    <div className="relative w-full items-center justify-center">
      <Image
        alt="f-150-banner"
        width={1000}
        height={1000}
        src={F150Banner}
        className="h-full w-full "
      />
      <div className="absolute bottom-[20%] right-[10%] flex w-full max-w-[81px] flex-col text-[24px] font-[700] italic leading-[26px] text-white lg:bottom-[30%] lg:right-[15%] lg:max-w-[128px] lg:text-[46px] lg:leading-[55px]">
        <p>Ford</p>
        <p>F-150</p>
        <div className="mt-3 flex w-full items-center justify-center rounded-full bg-[#FFFFFFCC] py-1 text-center text-[12px] font-[800] leading-[12px] text-[#343434] lg:max-h-[28px] lg:min-h-[28px] lg:text-[16px]">
          2015-2024
        </div>
      </div>
    </div>
  );
}
