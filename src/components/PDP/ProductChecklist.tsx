'use client';
import Waterproof from '@/images/difference/waterproof-car-cover.png';
import Image from 'next/image';
import { FaCheckSquare } from 'react-icons/fa';

export function ProductChecklist() {
  return (
    <div className="flex h-full w-full flex-col-reverse pt-8  lg:flex-row lg:pt-20">
      <div className="bg-dark flex w-full flex-col items-start justify-stretch bg-[#1A1A1A] px-2 py-16 md:px-12 md:py-8 lg:w-2/4">
        <div className="pb-8">
          <p className="text-xl font-black uppercase leading-normal text-white md:text-3xl">
            Who Can Benefit From <br className="hidden md:visible" /> Our
            Premium Car covers:
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 normal-case md:mt-8">
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                <b>Car Enthusiasts</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Those Who Prefer <b>Minimal Car Washing</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Residents of <b className="capitalize">wildlife</b> and{' '}
                <b className="capitalize">Tree-abundant</b> Areas
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Cars frequently exposed to <b>rain</b> and <b>humidity</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>hurricane-prone</b> regions
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>snowy</b> climates
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-base font-normal text-white md:text-lg lg:text-xl">
                Car owners in <b>sunny</b> climates
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/4">
        <Image
          src={Waterproof}
          alt="a car sitting inside of a building"
          width={500}
          height={500}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
