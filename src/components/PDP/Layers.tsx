'use client';

import Image, { StaticImageData } from 'next/image';
import KeepDry from '@/images/PDP/keep_dry.webp';
import LayerImg from '@/images/PDP/layer_breakdown.webp';
import Material from '@/images/PDP/material-right.webp';
import ZeroLeaks from '@/images/PDP/zero_leaks.webp';
import Crystal from '@/images/PDP/crystal.png';
import { useMediaQuery } from '@mantine/hooks';
type layerProps = { img?: StaticImageData; title: string; text: string };

export function Layers() {
  const isMobile = useMediaQuery('(max-width: 1024px)'); //lg

  const LayersStaticData: layerProps[] = [
    {
      title: 'Waterproof Car Cover',
      text: ' Extra waterproof coating provides the ultimate shield against rain and moisture as well as the elements.',
    },
    {
      title: 'Premium Car Cover',
      text: 'Made with top-quality premium polyester, our cover ensures resilience. Enjoy year-round security in all climates',
    },
    {
      title: 'Long-lasting Car Cover',
      text: 'Our exclusive coating preserves the original color, preventing fading over time.',
    },
  ];

  const LayersStaticDataWithImg: layerProps[] = [
    {
      img: ZeroLeaks,
      title: 'Zero Leaks',
      text: 'Extra waterproof coating provides the ultimate shield against rain and moisture as well as the elements.',
    },
    {
      img: Material,
      title: 'Soft Touch',
      text: 'Our car cover is gentle on paint, tough on elements! Lined with soft fleece for a perfect balance of comfort and durability.',
    },
    {
      img: KeepDry,
      title: 'Keeps it Dry',
      text: 'Moisture no more! Discover the magic of air vent protection with optimal air circulation car covers.',
    },
  ];

  return (
    <div className="pb-[60px] lg:pb-0">
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
      <div className="flex flex-col items-center bg-[#F9F9FB] lg:px-[35px] lg:py-[40px] ">
        <Image
          src={Crystal}
          alt="crystal"
          className="mb-[40px] h-full w-full lg:w-6/12"
        />
        <div className="flex h-full w-full flex-col lg:flex-row lg:gap-10 ">
          <div className="w-full pb-8 lg:w-2/4 lg:pb-0">
            <Image
              src={LayerImg}
              alt="a car sitting inside of a building"
              className="h-6/12 w-full"
            />
          </div>
          <div className="flex w-full flex-col items-stretch justify-between gap-[46px] px-4 pb-8 lg:w-2/4 lg:items-center lg:justify-evenly lg:gap-0 lg:px-16">
            {LayersStaticData.map((item, index) => (
              <LayersBlock
                key={`Layers-Block-${index}`}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid h-auto w-full grid-cols-1 gap-4 md:m-auto md:grid-cols-2 lg:grid-cols-3 ">
        {LayersStaticDataWithImg.map((item, index) => (
          <LayersBlock
            key={`Layers-Block-With-Image-${index}`}
            img={item.img}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}

const LayersBlock = (props: layerProps) => {
  return (
    <div className="flex flex-col gap-4">
      {props.img ? (
        <div className="md:h-[400px] lg:h-[249px]">
          <Image
            src={props.img}
            alt="seams of a cover"
            width={500}
            height={249}
            className="h-full w-full"
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold capitalize text-[#1A1A1A] lg:text-2xl">
          {props.title}
        </p>
        <p className="w-full text-sm font-normal normal-case text-[#767676] lg:w-[96%] lg:text-lg">
          {props.text}
        </p>
      </div>
    </div>
  );
};
