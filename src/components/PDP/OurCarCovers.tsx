'use client';

import {
  FaEyeDropper,
  FaPaw,
  FaShieldAlt,
  FaShieldVirus,
  FaSun,
  FaTemperatureLow,
  FaTree,
  FaWind,
} from 'react-icons/fa';
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
        <p className="text-[#1A1A1A] font-black text-2xl md:text-3xl lg:text-5xl uppercase text-center tracking-[1.35px]">
          Our car covers have you covered
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <UVHarmIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                UV Harm
              </p>
              <p className="text-[#707070] text-lg font-normal">
                Prolonged sun exposure can harm your paint. Keep it looking
                fresh with our cover.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <WaterHumidityIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                Water and humidity
              </p>
              <p className="text-[#707070] text-lg font-normal">
                Fear rust? Our car covers are waterproof with air vents for full
                protection.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <WaterHumidityIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                Strong Wind
              </p>
              <p className="text-[#707070] text-lg font-normal">
                {`Don't let strong winds unsettle your car cover. Our wind straps
                keep it steady in gusty conditions.`}
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <TempShiftsIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                Temperature Shifts
              </p>
              <p className="text-[#707070] text-lg font-normal">
                Shield your car from temperature changes. prevent overheating
                and cold-related issues.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <LeavesTreeIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                Leaves and Trees
              </p>
              <p className="text-[#707070] text-lg font-normal">
                Dealing with fallen leaves and tree sap? Cleaning is a breeze
                with our easy-to-clean covers.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 lg:grid lg:grid-cols-4 justify-center md:justify-items-center items-center md:items-start">
            <div className="w-[50px] h-[50px] lg:h-[60px] lg:w-[60px]">
              <div className="bg-blue rounded-full h-full w-full flex flex-col justify-center items-center">
                <BirdsAnimalIcon />
              </div>
            </div>
            <div className="text-center md:text-left md:col-span-3">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize mb-4">
                Birds and Animals
              </p>
              <p className="text-[#707070] text-lg font-normal">
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
