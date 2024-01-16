'use client';

import Image from 'next/image';
import { ProductHero } from '@/components/PDP/ProductHero';
import Package_01 from '@/images/PDP/package_01.webp';
import Package_02 from '@/images/PDP/package_02.webp';
import Package_03 from '@/images/PDP/package_03.webp';

export function ProductPackage() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center pt-16">
      <div className="flex flex-col w-full lg:w-2/4">
        <div className="">
          <p className="text-[#1A1A1A] font-black text-3xl capitalize">
            Package Includes:
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full lg:w-2/4 pt-8 lg:pt-0">
          <div className="block lg:hidden col-span-2">
            <Image
              src={Package_01}
              alt="carrying bag"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-8 lg:pt-20">
          <div className="flex flex-row justify-start items-start">
            <div className="w-10">
              <div className="flex flex-col justify-center items-center bg-[#E0E0E0] h-11 w-11 text-[#767676] text-2xl font-black rounded-full">
                1
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 px-8 mt-1">
              <p className="text-[#1A1A1A] text-lg md:text-2xl font-bold leading-normal">
                Waterproof Carrying Bag
              </p>
              <p className="text-[#767676] text-base md:text-lg font-normal w-full md:w-[521px]">
                Includes a waterproof storage bag for effortless storage.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-start">
            <div className="w-10">
              <div className="flex flex-col justify-center items-center bg-[#E0E0E0] h-11 w-11 text-[#767676] text-2xl font-black rounded-full">
                2
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 px-8 mt-1">
              <p className="text-[#1A1A1A] text-lg md:text-2xl font-bold leading-normal">
                1 Antenna Patch
                <br className="hidden md:block md" /> 1 Pair of grommets
              </p>
              <p className="text-[#767676] text-base md:text-lg font-normal w-full md:w-[521px]">
                Anxious that the cover {`won't`} fit because of the antenna? The
                antenna patch and grommets are here to help to create an antenna
                hole in the antenna location.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-start">
            <div className="w-10">
              <div className="flex flex-col justify-center items-center bg-[#E0E0E0] h-11 w-11 text-[#767676] text-2xl font-black rounded-full">
                3
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 px-8 mt-1">
              <p className="text-[#1A1A1A] text-lg md:text-2xl font-bold leading-normal">
                3 Straps with buckles
              </p>
              <p className="text-[#767676] text-base md:text-lg font-normal w-full md:w-[521px]">
                Worry no more about your car cover in the wind! Secure it with
                our free straps.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full lg:w-2/4 pt-8 lg:pt-0">
        <div className=" hidden lg:block lg:col-span-2">
          <Image
            src={Package_01}
            alt="carrying bag"
            className="w-full h-full"
          />
        </div>
        <div className=" col-span-2 lg:col-span-1">
          <Image
            src={Package_02}
            alt="antenna hole"
            className="w-full h-full"
          />
        </div>
        <div className=" col-span-2 lg:col-span-1">
          <Image src={Package_03} alt="black clip" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
