import React from 'react';
import Beach from '../../../public/images/security/security-beach.webp';
import Storm from '@/images/security/storm-icon.png';
import Umbrella from '@/images/security/umbrella-icon.png';
import Scratch from '@/images/security/scratch-icon.png';
import Sun from '@/images/security/sun-icon.png';

import Image, { StaticImageData } from 'next/image';

const IconSection = ({
  title,
  img,
  children,
}: {
  title: string;
  img: StaticImageData;
  children: React.ReactNode;
}) => (
  <div className="flex w-full flex-row items-center justify-center">
    <div className="flex w-full gap-[25px] ">
      <div className="-m-[8px]">
        <Image
          src={img}
          alt={`${title}-icon`}
          width={88}
          height={88}
          className="bg-offWhite icon-shadow max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px]  rounded-lg"
        />
      </div>
      <div className="flex flex-col items-start justify-start">
        <p className="text-[16px] font-bold capitalize leading-[26px] text-[#1A1A1A] lg:text-[18px]">
          {title}
        </p>
        <p className="max-w-[330px] text-[14px] font-normal leading-[26px] text-[#767676] lg:text-[16px]">
          {children}
        </p>
      </div>
    </div>
  </div>
);

export default function SecuritySection() {
  return (
    <section className="h-auto max-w-[1440px]  gap-[115px] px-[16px] pt-[36px]  lg:mx-0  lg:flex ">
      <div className="flex w-full flex-col items-center justify-center lg:flex-row ">
        <div className="relative aspect-square max-h-[562px] w-full max-w-[617px]  ">
          <Image
            className="rounded-[8px] lg:rounded-[15px]"
            fill
            src={Beach}
            // width={617}
            // height={562}
            alt="a fully-covered vehicle with a coverland car cover on it"
          />
          <div className="absolute  bottom-[27px] left-[14px] z-10 flex flex-col gap-[12px] lg:bottom-[42px] lg:left-[42px]">
            <p className="text-[18px] font-[500] capitalize tracking-wider text-white lg:text-[24px]">
              Outdoor car covers
            </p>
            <button className="flex h-[44px] max-w-[160px] items-center rounded-[100px] bg-white px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px]">
              <a href="/car-covers/premium-plus">Shop Now</a>
            </button>
          </div>
        </div>
        <div
          id="SecurityBenefits"
          className="flex h-full flex-col items-center gap-[32px] px-[20px] lg:ml-[54px] lg:min-w-[415px] lg:px-0 "
        >
          <p className=" mt-[32px] w-full text-left text-[24px] font-black uppercase leading-[32px] lg:mt-0 lg:text-[34px] lg:leading-[40px] ">
            Experience the Best <br /> Car Cover In THe USA
          </p>
          <div
            id="SecurityBenefitsList"
            className="flex flex-col items-center justify-center gap-[32px]"
          >
            <IconSection img={Umbrella} title="Weatherproof Car Covers">
              It fully protects my car in all weather conditions. Built to be
              effective in all seasons.
            </IconSection>
            <IconSection img={Sun} title="UV & Heatproof Car Covers">
              Without heat accumulation, our covers reflect 100% of all UV rays.
            </IconSection>
            <IconSection img={Scratch} title="Scratchproof Car Covers">
              Serving as a protective coat, our covers guard against scratches
              by kids, dirt and even cats.
            </IconSection>
            <IconSection img={Storm} title="Hail, Storm & Snowproof Car Covers">
              Regardless of weather conditions, our covers are snowproof,
              waterproof and windproof.
            </IconSection>
          </div>
        </div>
      </div>
    </section>
  );
}
