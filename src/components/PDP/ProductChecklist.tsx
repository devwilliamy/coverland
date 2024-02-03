'use client';
import Waterproof from '@/images/difference/waterproof-car-cover.png';
import Image from 'next/image';
import { FaCheckSquare } from 'react-icons/fa';

const checklistJSX = [
  <>
    <b>Car Enthusiasts.</b>
  </>,
  <>
    Those Who Prefer <b>Minimal Car Washing.</b>
  </>,
  <>
    Residents of <b>Wildlife and Tree-Abundant</b> Areas.
  </>,
  <>
    Cars frequently exposed to <b>rain and humidity.</b>
  </>,
  <>
    Car owners in <b>typhoon-prone</b> regions.
  </>,
  <>
    Car owners in <b>sunny climates.</b>
  </>,
  <>
    Car owners in <b>snowy climates.</b>
  </>,
];

const mobileChecklistJSX = [
  <>
    <b>Car Enthusiasts.</b>
  </>,
  <>
    Those Who Prefer <b>Minimal Car Washing.</b>
  </>,
  <>
    Residents of <b>Wildlife</b> and
    <br />
    <b>Tree-Abundant</b> Areas.
  </>,
  <>
    Cars frequently exposed to <br />
    <b>rain and humidity.</b>
  </>,
  <>
    Car owners in <b>typhoon-prone</b> regions.
  </>,
  <>
    Car owners in <b>sunny climates.</b>
  </>,
  <>
    Car owners in <b>snowy climates.</b>
  </>,
];

const BenefitCheckPoint = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => (
  <div className="flex flex-row  justify-start gap-[12px]">
    <FaCheckSquare color="ffffff" size={24} />
    <p className="text-[16px] text-white">{children}</p>
  </div>
);

export function ProductChecklist() {
  return (
    <div className="mt-[39px] flex w-full flex-col items-center justify-center bg-black pb-[61px] pl-[22px] pr-[10px] pt-[71px] lg:mt-0 lg:flex-row lg:py-[105px]">
      <div className="lg:flex lg:w-1/2 lg:justify-center lg:text-[32px]">
        <p className="mb-[10px] max-h-[76px] text-[22px] font-black uppercase leading-[163.636%] tracking-wide text-white lg:text-[32px] lg:leading-[46px]">
          Who Can Benefit From <br /> Our Premium Car covers:
        </p>
      </div>
      <div className=" flex justify-center lg:w-1/2">
        <div className="hidden flex-col gap-[24px] lg:flex lg:gap-[12px]">
          {checklistJSX.map((jsx) => {
            return <BenefitCheckPoint>{jsx}</BenefitCheckPoint>;
          })}
        </div>
        <div className="flex flex-col gap-[24px] lg:hidden lg:gap-[12px]">
          {mobileChecklistJSX.map((jsx) => {
            return <BenefitCheckPoint>{jsx}</BenefitCheckPoint>;
          })}
        </div>
      </div>
    </div>
  );
}
