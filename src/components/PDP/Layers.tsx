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
      <div className="w-full h-auto flex flex-col flex-start justify-start pb-8 ">
        <p className="text-[#343434] font-normal text-lg md:text-2xl capitalize mb-4">
          High-Quality Car Cover
        </p>
        <p className="text-[#1A1A1A] font-black sm:text-xl md:text-3xl lg:text-5xl uppercase text-left">
          Engineered to Perfection
        </p>
      </div>
      <div className="w-full h-full bg-[#F9F9FB] flex flex-col gap-10 p-4 md:p-8 lg:px-14 lg:py-10">
        <div className="flex justify-stretch w-full lg:w-auto lg:justify-center items-stretch lg:items-center">
          <Image src={Crystal} alt="crystal" className="w-full" />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/4 pb-8 lg:pb-0">
            <Image
              src={LayerImg}
              alt="a car sitting inside of a building"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between lg:justify-evenly w-full lg:w-2/4 items-stretch gap-4 lg:gap-0 lg:items-center md:px-4 lg:px-16">
            <div className="grid grid-cols-1 gap-4">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
                Waterproof Car Cover
              </p>
              <p className="text-[#767676] font-normal text-lg w-full lg:w-96">
                Extra waterproof coating provides the ultimate shield against
                rain and moisture as well as the elements.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
                Premium Car Cover
              </p>
              <p className="text-[#767676] font-normal text-lg w-full lg:w-96">
                Made with top-quality premium polyester, our cover ensures
                resilience. Enjoy year-round security in all climates
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
                Long-lasting Car Cover
              </p>
              <p className="text-[#767676] font-normal text-lg w-full lg:w-96">
                Our exclusive coating preserves the original color, preventing
                fading over time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto grid grid-cols-1 md:m-auto md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 ">
        <div className="flex flex-col gap-4">
          <div className="md:h-[400px] lg:h-[249px]">
            <Image
              src={ZeroLeaks}
              alt="seams of a cover"
              width={500}
              height={249}
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
              Zero Leaks
            </p>
            <p className="text-[#707070] font-normal text-lg">
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
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
              Soft Touch
            </p>
            <p className="text-[#707070] font-normal text-lg">
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
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[#1A1A1A] font-bold text-2xl capitalize">
              Keeps it dry
            </p>
            <p className="text-[#707070] font-normal text-lg">
              Moisture no more! Discover the magic of air vent protection with
              optimal air circulation car covers,
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
