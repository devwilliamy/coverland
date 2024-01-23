'use client';
import Waterproof from '@/images/difference/waterproof-car-cover.png';
import Image from 'next/image';
import { FaCheckSquare } from 'react-icons/fa';

export function ProductChecklist() {
  return (
    <div className="mt-[40px] flex flex-col lg:mt-0 lg:flex-row">
      <div className="w-full lg:order-last lg:w-2/4">
        <Image
          src={Waterproof}
          alt="a car sitting inside of a building"
          width={500}
          height={500}
          className="h-full w-full"
        />
      </div>
      <div className="bg-dark flex w-full flex-col items-start justify-stretch bg-[#1A1A1A] px-[10px] py-[56px] lg:w-2/4 lg:px-[56px] lg:py-[61px]">
        <div className="pb-[56px]">
          <p className=" text-[22px] font-black uppercase leading-[163.636%] text-white lg:text-3xl">
            Who Can Benefit From <br /> Our Premium Car covers:
          </p>
        </div>
        <div className=" grid grid-cols-1 gap-[28px] normal-case ">
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                <b>Car Enthusiasts.</b>
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Those Who Prefer <b>Minimal Car Washing.</b>
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Residents of <b className="capitalize">wildlife</b> and{' '}
                <b className="capitalize">Tree-abundant</b> Areas.
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Cars frequently exposed to <b>rain</b> and <b>humidity.</b>
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>typhoon-prone</b> regions.
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>snowy</b> climates.
              </p>
            </div>
          </BenefitCheckPoint>
          <BenefitCheckPoint>
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>sunny</b> climates.
              </p>
            </div>
          </BenefitCheckPoint>
        </div>
      </div>
    </div>
  );
}
type BenefitCheckPointData = {
  children: JSX.Element[] | JSX.Element;
};
const BenefitCheckPoint = ({ children }: BenefitCheckPointData) => (
  <div className="flex flex-row items-center justify-start gap-[27px]">
    {children}
  </div>
);
