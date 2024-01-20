'use client';

import Image from 'next/image';
import Package_01 from '@/images/PDP/package_01.webp';
import Package_02 from '@/images/PDP/package_02.webp';
import Package_03 from '@/images/PDP/package_03.webp';

export function ProductPackage() {
  return (
    <div className="flex w-full flex-col items-center pt-16 lg:flex-row">
      <div className="flex w-full flex-col lg:w-2/4">
        <div className="">
          <p className="text-3xl font-black capitalize text-[#1A1A1A]">
            Package Includes:
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 pt-8 lg:w-2/4 lg:pt-0">
          <div className="col-span-2 block lg:hidden">
            <Image
              src={Package_01}
              alt="carrying bag"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-8 lg:pt-20">
          <div className="flex flex-row items-start justify-start">
            <div className="w-10">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#E0E0E0] text-2xl font-black text-[#767676]">
                1
              </div>
            </div>
            <div className="mt-1 grid grid-cols-1 gap-2 px-8">
              <p className="text-lg font-bold leading-normal text-[#1A1A1A] md:text-2xl">
                Waterproof Carrying Bag
              </p>
              <p className="w-full text-base font-normal text-[#767676] md:w-[521px] md:text-lg">
                Includes a waterproof storage bag for effortless storage.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="w-10">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#E0E0E0] text-2xl font-black text-[#767676]">
                2
              </div>
            </div>
            <div className="mt-1 grid grid-cols-1 gap-2 px-8">
              <p className="text-lg font-bold leading-normal text-[#1A1A1A] md:text-2xl">
                1 Antenna Patch
                <br className="md hidden md:block" /> 1 Pair of grommets
              </p>
              <p className="w-full text-base font-normal text-[#767676] md:w-[521px] md:text-lg">
                Anxious that the cover {`won't`} fit because of the antenna? The
                antenna patch and grommets are here to help to create an antenna
                hole in the antenna location.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="w-10">
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#E0E0E0] text-2xl font-black text-[#767676]">
                3
              </div>
            </div>
            <div className="mt-1 grid grid-cols-1 gap-2 px-8">
              <p className="text-lg font-bold leading-normal text-[#1A1A1A] md:text-2xl">
                3 Straps with buckles
              </p>
              <p className="w-full text-base font-normal text-[#767676] md:w-[521px] md:text-lg">
                Worry no more about your car cover in the wind! Secure it with
                our free straps.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 pt-8 lg:w-2/4 lg:pt-0">
        <div className=" hidden lg:col-span-2 lg:block">
          <Image
            src={Package_01}
            alt="carrying bag"
            className="h-full w-full"
          />
        </div>
        <div className=" col-span-2 lg:col-span-1">
          <Image
            src={Package_02}
            alt="antenna hole"
            className="h-full w-full"
          />
        </div>
        <div className=" col-span-2 lg:col-span-1">
          <Image src={Package_03} alt="black clip" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
