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
      <div className=" py-8 lg:pb-[60px]">
        <p className="hidden text-center text-[45px] font-[900] uppercase tracking-[1.35px] text-[#1A1A1A] lg:flex lg:flex-col ">
          Our car covers have you covered
        </p>
        <p className="flex w-full text-left text-[22px] font-[900] uppercase leading-[36px] text-[#1A1A1A] md:text-3xl lg:hidden lg:text-5xl">
          Our car covers <br /> have you covered
        </p>
      </div>
      <div
        id="icon-benefits"
        className="lg: flex flex-col gap-[30px] lg:grid lg:grid-cols-3"
      >
        <OurCoversBlock
          icon={<UVHarmIcon />}
          title={'UV Harm'}
          text={
            'Prolonged sun exposure can harm your paint. Keep it looking fresh with our cover.'
          }
        />
        <OurCoversBlock
          icon={<WaterHumidityIcon />}
          title={'Water and Humidity'}
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
    <div className="flex w-full items-start">
      <div className="flex max-h-[72px] w-3/12 max-w-[72px] items-center lg:max-h-[101px] lg:w-[30%] lg:max-w-[101px]">
        {props.icon}
      </div>
      <div
        id="description-container"
        className="ml-[24px] flex w-9/12 flex-col lg:ml-[26px] lg:w-[70%] "
      >
        <p className="mb-4 w-full max-w-[270px] text-[18px] font-[700] normal-case text-[#1A1A1A] lg:text-[24px]">
          {props.title}
        </p>
        <p className="text-[16px] font-[400] normal-case text-[#707070] lg:text-[18px]">
          {props.text}
        </p>
      </div>
    </div>
  );
};
