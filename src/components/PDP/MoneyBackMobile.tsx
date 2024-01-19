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
        <div className="mb-[46px] w-full px-2 text-[6vw] font-black leading-[8vw]">
          60-days Money back guaranteed
        </div>
        <div className="mb-[46px] px-2 text-[4vw] font-thin normal-case leading-[4vw] md:text-[3.5vw]">
          {
            "If you're not satisfied, we've got you covered. with an easy return process and full refunds. We're here to make your shopping as smooth as possible."
          }
        </div>
      </div>
    </div>
  );
}
