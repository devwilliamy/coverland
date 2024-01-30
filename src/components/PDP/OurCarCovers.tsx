'use client';
import {
  BirdsAnimalIcon,
  TempShiftsIcon,
  UVHarmIcon,
  WaterHumidityIcon,
} from './images';
import { LeavesTreeIcon } from './LeavesTrees';

export function OurCarCovers() {
  return (
    <div className="flex flex-col">
      <div className="w-full py-8 lg:py-16">
        <p className="text-center text-2xl font-black uppercase tracking-[1.35px] text-[#1A1A1A] md:text-3xl lg:text-5xl">
          Our car covers have you covered
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <UVHarmIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                UV Harm
              </p>
              <p className="text-lg font-normal text-[#707070]">
                Prolonged sun exposure can harm your paint. Keep it looking
                fresh with our cover.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <WaterHumidityIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                Water and humidity
              </p>
              <p className="text-lg font-normal text-[#707070]">
                Fear rust? Our car covers are waterproof with air vents for full
                protection.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <WaterHumidityIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                Strong Wind
              </p>
              <p className="text-lg font-normal text-[#707070]">
                {`Don't let strong winds unsettle your car cover. Our wind straps
                keep it steady in gusty conditions.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <TempShiftsIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                Temperature Shifts
              </p>
              <p className="text-lg font-normal text-[#707070]">
                Shield your car from temperature changes. prevent overheating
                and cold-related issues.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <LeavesTreeIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                Leaves and Trees
              </p>
              <p className="text-lg font-normal text-[#707070]">
                Dealing with fallen leaves and tree sap? Cleaning is a breeze
                with our easy-to-clean covers.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
            <div className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
                <BirdsAnimalIcon />
              </div>
            </div>
            <div className="text-center md:col-span-3 md:text-left">
              <p className="mb-4 text-2xl font-bold capitalize text-[#1A1A1A]">
                Birds and Animals
              </p>
              <p className="text-lg font-normal text-[#707070]">
                Rest easy - No more unexpected bird droppings or curious animals
                causing potential damage to your car.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
