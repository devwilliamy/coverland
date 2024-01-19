'use client';

import Image, { StaticImageData } from 'next/image';
import KeepDry from '@/images/PDP/keep_dry.webp';
import LayerImg from '@/images/PDP/layer_breakdown.webp';
import Material from '@/images/PDP/material-right.webp';
import ZeroLeaks from '@/images/PDP/zero_leaks.webp';
import Crystal from '@/images/PDP/crystal.png';
import { useMediaQuery } from '@mantine/hooks';
type layerProps = { img: StaticImageData; title: string; text: string };

export function Layers() {
  const isMobile = useMediaQuery('(max-width: 1024px)'); //lg

  return (
    <>
      <div className="flex-start flex h-auto w-full flex-col justify-start pb-[18px] pt-10 lg:pt-0">
        <p className="mb-4 text-lg font-normal capitalize text-[#343434] md:text-2xl">
          High-Quality Car Cover
        </p>
        <p
          className="text-left text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl"
          id="benefits"
        >
          Engineered to {isMobile ? <br /> : ''} Perfection
        </p>
      </div>
      <div className="flex flex-col bg-[#F9F9FB] p-8">
        <Image src={Crystal} alt="crystal" className="h-6/12 w-full" />
        <div className="flex h-full w-full flex-col lg:flex-row lg:gap-10 lg:py-10">
          <div className="w-full pb-8 lg:w-2/4 lg:pb-0">
            <Image
              src={LayerImg}
              alt="a car sitting inside of a building"
              className="h-6/12 w-full"
            />
          </div>
          <div className="flex w-full flex-col items-stretch justify-between gap-4 md:px-4 lg:w-2/4 lg:items-center lg:justify-evenly lg:gap-0 lg:px-16">
            <div className="grid grid-cols-1 gap-4">
              <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
                Waterproof Car Cover
              </p>
              <p className="w-full text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
                Extra waterproof coating provides the ultimate shield against
                rain and moisture as well as the elements.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
                Premium Car Cover
              </p>
              <p className="w-full text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
                Made with top-quality premium polyester, our cover ensures
                resilience. Enjoy year-round security in all climates
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
                Long-lasting Car Cover
              </p>
              <p className="w-full text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
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
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
              Zero Leaks
            </p>
            <p className="w-full max-w-[90%] text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
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
            <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
              Soft Touch
            </p>
            <p className="w-full max-w-[90%] text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
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
            <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
              Keeps it dry
            </p>
            <p className="w-full max-w-[90%] text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
              Moisture no more! Discover the magic of air vent protection with
              optimal air circulation car covers,
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const LayersBlock = (props: layerProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="md:h-[400px] lg:h-[249px]">
        <Image
          src={props.img}
          alt="seams of a cover"
          width={500}
          height={249}
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
          {props.title}
        </p>
        <p className="w-full text-sm font-normal normal-case text-[#767676] lg:w-96 lg:text-lg">
          {props.text}
        </p>
      </div>
    </div>
  );
};
