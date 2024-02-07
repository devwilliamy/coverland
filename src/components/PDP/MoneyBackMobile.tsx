'use client';

import Image from 'next/image';
import Badge from '@/images/PDP/100-percent_satisfaction.png';

export function MoneyBackMobile() {
  return (
    <div className="flex w-full flex-col items-center justify-items-center">
      <div className="flex h-full w-full flex-col bg-[#1F2B47] text-white">
        <div className="flex flex-col items-center">
          <Image
            className="py-[46px]"
            alt="Satisfaction Guranteed"
            src={Badge}
            width={190}
            height={190}
          />
        </div>
        <div className="mb-[22.5px] w-full px-2 text-[24px] font-black uppercase leading-[150%] text-white lg:text-[42px] ">
          60-days Money back guaranteed
        </div>
        <div className="mb-[46px] px-2 text-[16px] normal-case leading-[140%] text-[#DBDBDB] md:text-[3.5vw]">
          {
            "If you're not satisfied, we've got you covered. with an easy return process and full refunds. We're here to make your shopping as smooth as possible."
          }
        </div>
      </div>
    </div>
  );
}
