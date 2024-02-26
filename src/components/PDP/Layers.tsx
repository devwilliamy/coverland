import Image, { StaticImageData } from 'next/image';
import KeepDry from '@/images/PDP/keep_dry.webp';
import Material from '@/images/PDP/material-right.webp';
import ZeroLeaks from '@/images/PDP/zero_leaks.webp';
import SeeMoreChevronDown from '../icons/SeeMoreChevronDown';

type layerProps = { img?: StaticImageData; title: string; text: string };

export function Layers({
  seeMore,
  setSeeMore,
}: {
  seeMore?: boolean;
  setSeeMore?: (e: boolean) => void;
}) {
  const LayersStaticData: layerProps[] = [
    {
      title: 'Waterproof',
      text: ' Extra waterproof coating provides the ultimate shield against rain and moisture as well as the elements.',
    },
    {
      title: 'Premium',
      text: 'Made with top-quality premium polyester, our cover ensures resilience. Enjoy year-round security in all climates',
    },
    {
      title: 'Long-lasting',
      text: 'Our exclusive coating preserves the original color, preventing fading over time.',
    },
  ];

  const LayersStaticDataWithImg: layerProps[] = [
    {
      img: ZeroLeaks,
      title: 'Zero Leaks',
      text: 'Stay Dry! Our specialized car cover sealing tape is engineered to keep your car completely dry.',
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

  return (
    <div className=" lg:pb-0 ">
      <div className="flex-start flex h-auto w-full flex-col justify-start pt-10 lg:pt-0">
        <p className="mb-4 text-lg font-normal capitalize text-[#343434] md:text-2xl">
          High-Quality
        </p>
        <p
          className="mb-[38px] text-left text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl"
          id="benefits"
        >
          Engineered to Perfection
        </p>
      </div>
      <section className="mb-[38px] bg-[#F9F9FB] px-4 py-11 lg:px-[38px]">
        <div className="flex flex-col justify-center gap-[46px] lg:flex-row lg:gap-[38px]">
          {LayersStaticData.map((item, index) => (
            <LayersBlock
              key={`Layers-Block-${index}`}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </section>

      {seeMore ? (
        <section className="grid h-auto w-full grid-cols-1 gap-[38px] pb-4 lg:grid-cols-3">
          {LayersStaticDataWithImg.map((item, index) => (
            <LayersBlock
              key={`Layers-Block-With-Image-${index}`}
              img={item.img}
              title={item.title}
              text={item.text}
            />
          ))}
        </section>
      ) : (
        <div
          className="flex w-full cursor-pointer flex-col items-center justify-center pb-[40px]"
          onClick={() => {
            setSeeMore && setSeeMore(true);
          }}
        >
          <p className="pb-1 text-center text-[16px] leading-[18.74px] text-[#484848] ">
            See All
          </p>
          <SeeMoreChevronDown />
          {/* <ChevronDown className="max-h-[10px] min-h-[10px] min-w-[25px] max-w-[25px]" /> */}
        </div>
      )}
    </div>
  );
}
