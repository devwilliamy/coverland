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
import { StrongWindsIcon } from './images/StrongWinds';
import { LeavesTreeIcon } from './LeavesTrees';
type Props = { icon: JSX.Element; title: string; text: string };

export function OurCarCovers() {
  return (
    <div className="flex flex-col">
      <div className="w-full py-8 lg:py-16">
        <p className="text-center text-2xl font-black uppercase tracking-[1.35px] text-[#1A1A1A] md:text-3xl lg:text-5xl">
          Our car covers have you covered
        </p>
        <p className="hidden text-left text-2xl font-black uppercase tracking-[1.35px] text-[#1A1A1A] md:text-3xl lg:text-5xl">
          Our car covers <br /> have you covered
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[30px] lg:grid lg:grid-cols-3">
        {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
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
          <div className="flex  items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
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
          <div className="flex  items-center justify-center gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
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
        </div> */}
        <OurCoversBlock
          icon={<UVHarmIcon />}
          title={'UV Harm'}
          text={
            'Prolonged sun exposure can harm your paint. Keep it looking fresh with our cover.'
          }
        />
        <OurCoversBlock
          icon={<WaterHumidityIcon />}
          title={'Water and humidity'}
          text={
            'Fear rust? Our car covers are waterproof with air vents for full protection.'
          }
        />
        <OurCoversBlock
          icon={<StrongWindsIcon />}
          title={'Strong Wind'}
          text={
            'Dont let strong winds unsettle your car cover. Our wind straps keep it steady even in gusty conditions.'
          }
        />
        <OurCoversBlock
          icon={<TempShiftsIcon />}
          title={'Temperature Shifts'}
          text={
            'Shield Your Car from Temperature Changes. Prevent overheating and cold-related issues.'
          }
        />
        <OurCoversBlock
          icon={<LeavesTreeIcon />}
          title={'Leaves and Trees'}
          text={
            'Dealing with fallen leaves and tree sap? Cleaning is a breeze with our easy-to-clean car covers.'
          }
        />
        <OurCoversBlock
          icon={<BirdsAnimalIcon />}
          title={'Birds and Animals'}
          text={
            'Rest easy– No more unexpected bird droppings or curious animals causing potential damage to your car.'
          }
        />
      </div>
    </div>
  );
}

const OurCoversBlock = (props: Props) => {
  return (
    <div className="flex w-full gap-4 md:flex-row md:items-start md:justify-items-center lg:grid lg:grid-cols-4">
      <div className="h-[77px] w-[77px] lg:h-[60px] lg:w-[60px]">
        <div className="bg-blue flex h-full w-full flex-col items-center justify-center rounded-full">
          {props.icon}
        </div>
      </div>
      <div className="md:col-span-3 md:text-left">
        <p className="mb-4 text-2xl font-bold normal-case text-[#1A1A1A]">
          {props.title}
        </p>
        <p className="text-base font-normal normal-case text-[#707070]">
          {props.text}
        </p>
      </div>
    </div>
  );
};
