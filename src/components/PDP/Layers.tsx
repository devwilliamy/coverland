'use client';

import Image from 'next/image';
import KeepDry from '@/images/PDP/keep_dry.webp';
import LayerImg from '@/images/PDP/layer_breakdown.webp';
import Material from '@/images/PDP/material-right.webp';
import ZeroLeaks from '@/images/PDP/zero_leaks.webp';
import Crystal from '@/images/PDP/crystal.png';

export function Layers() {
  return (
    <>
      <div className="flex-start flex h-auto w-full flex-col justify-start pb-8 ">
        <p className="mb-4 text-lg font-normal capitalize text-[#343434] md:text-2xl">
          High-Quality Car Cover
        </p>
        <p
          className="text-left font-black uppercase text-[#1A1A1A] sm:text-xl md:text-3xl lg:text-5xl"
          id="benefits"
        >
          Engineered to Perfection
        </p>
      </div>
      <div className="flex h-full w-full flex-col gap-10 bg-[#F9F9FB] p-4 md:p-8 lg:px-14 lg:py-10">
        <div className="flex w-full items-stretch justify-stretch lg:w-auto lg:items-center lg:justify-center">
          <Image src={Crystal} alt="crystal" className="w-full" />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full pb-8 lg:w-2/4 lg:pb-0">
            <Image
              src={LayerImg}
              alt="a car sitting inside of a building"
              width={500}
              height={500}
              className="h-full w-full"
            />
          </div>
          <div className="flex w-full flex-col items-stretch justify-between gap-4 md:px-4 lg:w-2/4 lg:items-center lg:justify-evenly lg:gap-0 lg:px-16">
            <div className="grid grid-cols-1 gap-4">
              <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
                Waterproof Car Cover
              </p>
              <p className="w-full text-lg font-normal text-[#767676] lg:w-96">
                Extra waterproof coating provides the ultimate shield against
                rain and moisture as well as the elements.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
                Premium Car Cover
              </p>
              <p className="w-full text-lg font-normal text-[#767676] lg:w-96">
                Made with top-quality premium polyester, our cover ensures
                resilience. Enjoy year-round security in all climates
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
                Long-lasting Car Cover
              </p>
              <p className="w-full text-lg font-normal text-[#767676] lg:w-96">
                Our exclusive coating preserves the original color, preventing
                fading over time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid h-auto w-full grid-cols-1 gap-4 pt-8 md:m-auto md:grid-cols-2 lg:grid-cols-3 ">
        <div className="flex flex-col gap-4">
          <div className="md:h-[400px] lg:h-[249px]">
            <Image
              src={ZeroLeaks}
              alt="seams of a cover"
              width={500}
              height={249}
              className="h-full w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
              Zero Leaks
            </p>
            <p className="text-lg font-normal text-[#707070]">
              Stay Dry! Our specialized car cover sealing tape is engineered to
              keep your car completely dry.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="md:h-[400px] lg:h-[249px]">
            <Image
              src={Material}
              alt="seams of a cover"
              width={500}
              height={249}
              className="h-full w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
              Soft Touch
            </p>
            <p className="text-lg font-normal text-[#707070]">
              Our car cover is gentle on paint, tough on elements! Lined with
              soft fleece for a perfect balance of comfort and durability.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="md:h-[400px] lg:h-[249px]">
            <Image
              src={KeepDry}
              alt="seams of a cover"
              width={500}
              height={249}
              className="h-full w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-2xl font-bold capitalize text-[#1A1A1A]">
              Keeps it dry
            </p>
            <p className="text-lg font-normal text-[#707070]">
              Moisture no more! Discover the magic of air vent protection with
              optimal air circulation car covers,
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
