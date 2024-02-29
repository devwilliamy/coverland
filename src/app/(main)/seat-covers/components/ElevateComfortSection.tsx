import HeaderImage from '@/images/PDP/Product-Details-Redesign-2/seat-covers/header-seat.webp';
import { GrayDualArrow } from '@/components/PDP/components/icons/GrayDualArrow';
import { GrayShieldCheck } from '@/components/PDP/components/icons/GrayShieldCheck';
import { GrayWrench } from '@/components/PDP/components/icons/GrayWrench';
import TouchSeat from '@/images/PDP/Product-Details-Redesign-2/seat-covers/touch-seat.webp';
import CloseSeat from '@/images/PDP/Product-Details-Redesign-2/seat-covers/close-seat.webp';
import SideSeat from '@/images/PDP/Product-Details-Redesign-2/seat-covers/side-seat.webp';
import SideAirbag from '@/images/PDP/Product-Details-Redesign-2/seat-covers/side-airbag.webp';

import Image from 'next/image';
import React from 'react';

export default function ElevateComfortSection() {
  const threeIcons = [
    { title: 'Easy Install', icon: <GrayWrench /> },
    { title: 'Custom Fit', icon: <GrayDualArrow /> },
    { title: 'Airbag Safe', icon: <GrayShieldCheck /> },
  ];
  const protectionData = [
    {
      image: TouchSeat,
      title: 'Drive in Comfort',
      description: 'High-quality, Durable, and Easy-to-Clean Material.',
    },
    {
      image: CloseSeat,
      title: 'Breathable Design',
      description: `Perforated Leather to stay cool in any ride.`,
    },
    {
      image: SideSeat,
      title: 'Perfect Fit in Minutes',
      description: 'Semi-Custom Look, Effortless to Install and Maintain',
    },
    {
      image: SideAirbag,
      title: 'Airbag Compatible ',
      description: 'Safety, seamlessly integrated',
    },
  ];

  return (
    <section className="relative -mx-4 flex flex-col items-center bg-[#1A1A1A] pb-[34px] ">
      <p className="flex w-full items-center justify-center py-7 text-center text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
        Elevate Comfort And Style
      </p>
      <div className="flex w-screen max-w-[850px] items-center justify-center lg:w-full ">
        <Image
          alt="product-content-half-cover"
          src={HeaderImage}
          // fill
          // height={700}
          className="flex w-[1320px] "
        />
        {/* <Image
          alt="product-content-half-cover-desktop"
          src={DesktopHalfCover}
          // fill
          height={472}
          width={840}
          className="hidden lg:block"
        /> */}
      </div>

      <span className="mt-[30px] grid grid-cols-3 items-center justify-center gap-[30px] lg:gap-[120px]">
        {threeIcons.map(({ title, icon }) => (
          <div key={title} className="flex flex-col items-center ">
            <div className="flex h-full w-[58px]">{icon}</div>
            <p className="pt-1.5 text-[14px] leading-[16px] text-white ">
              {title}
            </p>
          </div>
        ))}
      </span>
      <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white lg:p-[6px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
        Quality You Can Feel
      </p>
      <span className="flex flex-col lg:grid lg:grid-cols-2 lg:justify-center lg:gap-[21px] lg:px-[39px]">
        {protectionData.map(({ image, title, description }) => (
          <div
            key={title}
            className="pt-[38px] text-center text-white max-lg:px-4"
          >
            {image && (
              <Image
                alt="enhanced-item"
                src={image}
                className="w-full rounded-lg lg:h-[221px] lg:w-[420px]"
              />
            )}
            <p className="pt-[18px] text-[22px]  font-[500] leading-[25px] ">
              {title}
            </p>
            <p className=" pt-1.5 text-[#D3D3D3] ">{description}</p>
          </div>
        ))}
      </span>
    </section>
  );
}
