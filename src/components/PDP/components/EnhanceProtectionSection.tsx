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
      description: `Prevents any leakage through the seams`,
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
          <div key={title} className="space-y-2 text-center">
            <Image
              alt="enhanced-item"
              src={image}
              className="rounded-lg lg:h-[221px] lg:w-[420px]"
            />
            <p className="space-x-2 text-[18px] font-[600] leading-[21px]">
              {title}
            </p>
            <p className="mx-auto text-[#7D7D7D] lg:max-w-[208px] lg:text-center">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
