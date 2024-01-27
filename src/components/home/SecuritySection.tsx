import React from 'react';
import Beach from '../../../public/images/security/security-beach.webp';
import Storm from '@/images/security/storm-icon.png';
import Umbrella from '@/images/security/umbrella-icon.png';
import Scratch from '@/images/security/scratch-icon.png';
import Sun from '@/images/security/sun-icon.png';

// import ScratchIcon from '../icons/ScratchIcon';
// import SunIcon from '../icons/SunIcon';
// import ThunderCloudIcon from '../icons/ThunderCloudIcon';
// import UmbrellaIcon from '../icons/UmbrellaIcon';
import SecuritySectionIcon from './SecuritySectionIcon';
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
  <div className="flex w-full max-w-[430px] flex-row items-center justify-center">
    <div className="flex w-full gap-[25px] ">
      <div className="-m-[8px]">
        <Image
          src={img}
          alt={`${title}-icon`}
          className="bg-offWhite icon-shadow max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px]  rounded-lg"
        />
      </div>
      <div className="flex flex-col items-start justify-start">
        <p className="text-[18px] font-bold capitalize leading-[26px] text-[#1A1A1A]">
          {title}
        </p>
        <p className="text-[16px] font-normal leading-[26px] text-[#767676]">
          {children}
        </p>
      </div>
    </div>
  </div>
);

export default function SecuritySection() {
  return (
    <section className="h-auto w-screen max-w-[1440px] gap-[115px] bg-white lg:flex">
      <div className="relative flex flex-col object-cover lg:w-1/2 lg:items-end">
        <div
          id="ImageContainer"
          className="relative flex max-h-[386px] min-h-[386px] w-full items-center justify-center overflow-hidden lg:max-h-[562px] lg:min-h-[562px] lg:min-w-[617px] lg:max-w-[617px] lg:justify-end"
        >
          <div className="absolute top-0">
            <Image
              src={Beach}
              className=" rounded-[8px] object-cover md:max-h-[462px] md:min-h-[462px] md:min-w-[517px] md:max-w-[517px]  lg:max-h-[562px] lg:min-h-[562px] lg:min-w-[617px] lg:max-w-[617px]"
              alt="a fully-covered vehicle with a coverland car cover on it"
            />
          </div>
          <div
            // className="
            className="absolute bottom-[37px] left-[2vw]
            z-10 flex flex-col gap-[20px] bg-red-400"
          >
            <p className="text-[24px] font-[700] capitalize text-white">
              outdoor car covers
            </p>
            <button className="flex h-[44px] max-w-[160px] items-center rounded-[100px] bg-white px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px]">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div
        id="SecurityBenefits"
        className="flex h-full flex-col items-center gap-[32px] lg:items-start "
      >
        <p className=" max-w-[382px] text-left text-[34px] font-black uppercase ">
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
          <IconSection img={Sun} title="UV & Heat Protection">
            Without heat accumulation, our covers reflect 100% of all UV rays.
          </IconSection>
          <IconSection img={Scratch} title="Scratchproof">
            Serving as a protective coat, our covers guard against scratches by
            kids, dirt and even cats.
          </IconSection>
          <IconSection img={Storm} title="Hail, Storm & Snow Protection">
            Regardless of weather conditions, our covers are snowproof,
            waterproof and windproof.
          </IconSection>
        </div>
      </div>
    </section>
  );
}
