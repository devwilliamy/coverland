import Image from 'next/image';
import React from 'react';
import AirVents from '@/images/PDP/Product-Details-Redesign-2/keep_dry.webp';
import TapeSeams from '@/images/PDP/Product-Details-Redesign-2/zero_leaks.webp';
import WindStraps from '@/images/PDP/Product-Details-Redesign-2/wind-straps.png';

export default function EnhanceProtectionSection() {
  return (
    <section className=" pt-[60px] ">
      <p className="w-full pb-[35px] text-center text-[30px] font-[600] leading-[35px]  ">
        Enhanced Protection
      </p>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-[21px] lg:px-[60px]">
        {[
          {
            image: AirVents,
            title: 'Air Vents',
            description: 'Circulate hot air and moisture',
          },
          {
            image: TapeSeams,
            title: 'Tape Seams',
            description: 'Prevents any leakage through the seams',
          },
          {
            image: WindStraps,
            title: 'Wind Straps',
            description: 'Keep your cover in place',
          },
        ].map(({ image, title, description }) => (
          <div key={title} className="flex flex-col items-center ">
            <Image
              alt="enhanced-item"
              src={image}
              className="h-full max-h-[180px] min-h-[180px] w-full rounded-lg"
            />
            <div className="flex w-full flex-col items-center py-2 ">
              <p className="text-[18px] font-[600] leading-[21px]">{title}</p>
              <p className="text-[#7D7D7D] lg:text-center">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
