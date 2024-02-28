import Image from 'next/image';
import React from 'react';
import AirVents from '@/images/PDP/Product-Details-Redesign-2/keep_dry.webp';
import TapeSeams from '@/images/PDP/Product-Details-Redesign-2/zero_leaks.webp';
import WindStraps from '@/images/PDP/Product-Details-Redesign-2/wind-straps.webp';

export default function EnhanceProtectionSection() {
  const protectionData = [
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
  ];
  return (
    <section className=" pt-[60px] ">
      <p className="w-full pb-[35px] text-center text-[30px] font-[600] leading-[35px]  ">
        Enhanced Protection
      </p>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-[21px] lg:px-[39px]">
        {protectionData.map(({ image, title, description }) => (
          <div key={title} className="flex flex-[0.33] flex-col items-center">
            <div className=" grow overflow-hidden rounded-[12px] lg:max-h-[320px] lg:max-w-[420px]">
              <Image
                alt="enhanced-item"
                src={image}
                className="h-full w-full"
              />
            </div>

            <div className="flex w-full flex-col items-center py-4 ">
              <p className="text-[18px] font-[600] leading-[21px]">{title}</p>
              <p className="text-[#7D7D7D] lg:text-center">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
