'use client';
import Waterproof from '@/images/difference/waterproof-car-cover.png';
import Image from 'next/image';
import { FaCheckSquare } from 'react-icons/fa';

export function ProductChecklist() {
  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row pt-8 lg:pt-20">
      <div className="w-full lg:w-2/4 flex flex-col justify-stretch items-start bg-dark px-2 md:px-12 py-4 md:py-8 pt-16 bg-[#1A1A1A]">
        <div className="pb-8">
          <p className="text-white font-black text-xl md:text-3xl uppercase leading-normal">
            Who Can Benefit From <br className="hidden md:visible" /> Our
            Premium Car covers:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 mt-4 md:mt-8">
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                <b>Car Enthusiasts</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                Those Who Prefer <b>Minimal Car Washing</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                Residents of <b className="capitalize">wildlife</b> and{' '}
                <b className="capitalize">Tree-abundant</b> Areas
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                Cars frequently exposed to <b>rain</b> and <b>humidity</b>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                Car owners in <b>hurricane-prone</b> regions
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
                Car owners in <b>snowy</b> climates
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaCheckSquare color="ffffff" size={24} />
            <div className="ml-2 md:ml-4">
              <p className="text-white font-normal text-base md:text-lg lg:text-xl">
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
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
