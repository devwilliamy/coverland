'use client';
import useDetermineType from '@/hooks/useDetermineType';
import F150Banner from '@/images/PDP/PDP-Redesign-v3/f-150 banner.webp';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function DetailsTabHeader({ submodel }: { submodel?: string }) {
  const { make, model } = useDetermineType();
  const isMobile = useMediaQuery('(max-width: 1024px)');
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
      <div className="absolute right-[4%] top-1/2  flex w-full max-w-[137px] -translate-y-1/2  flex-col text-[24px] font-[700] italic leading-[26px] text-white  lg:right-[15%]  lg:text-[46px] lg:leading-[55px]">
        {isMobile ? (
          <p>Ford F-150</p>
        ) : (
          <>
            <p>Ford</p>
            <p>F-150</p>
          </>
        )}
        <div className="mt-1 flex w-full max-w-[81px] lg:max-w-[128px] items-center justify-center rounded-full bg-[#FFFFFFCC] py-1 text-center text-[12px] font-[800] leading-[12px] text-[#343434] lg:max-h-[28px] lg:min-h-[28px] lg:text-[16px]">
          2015-2024
        </div>
        {submodel && (
          <div className="flex w-full items-center justify-start whitespace-nowrap rounded-full py-1 text-center font-[400] leading-[12px] text-white max-lg:text-[12px] lg:max-h-[28px] lg:min-h-[28px] lg:text-[16px]">
            {submodel}
          </div>
        )}
      </div>
    </div>
  );
}
