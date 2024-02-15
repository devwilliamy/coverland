'use client';

import Image, { StaticImageData } from 'next/image';
import KeepDry from '@/images/PDP/keep_dry.webp';
import Material from '@/images/PDP/material-right.webp';
import ZeroLeaks from '@/images/PDP/zero_leaks.webp';
import SeeMoreChevronDown from '../icons/SeeMoreChevronDown';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import { useContext } from 'react';
import CarPlaceholder from '@/images/suggested/CarPlaceholder.webp';
import SUVPlaceholder from '../../../public/custom-cover/sc-01-ps-gr-1to-m.webp';
import TruckPlaceholder from '../../../public/custom-cover/tc-01-ps-gr-1to-m.webp';
import { useParams } from 'next/navigation';

type layerProps = { img?: StaticImageData; title: string; text: string };
let PlaceholderImage: StaticImageData = CarPlaceholder;

export function Layers({
  seeMore,
  setSeeMore,
}: {
  seeMore?: boolean;
  setSeeMore?: (e: boolean) => void;
}) {
  // const isMobile = useMediaQuery('(max-width: 1024px)'); //lg
  const params = useParams<{
    productType: string;
  }>();
  const TruckOrSuvPlaceholder =
    params?.productType === 'truck-covers' ? TruckPlaceholder : SUVPlaceholder;

  PlaceholderImage =
    params?.productType === 'car-covers'
      ? CarPlaceholder
      : TruckOrSuvPlaceholder;

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
            setSeeMore(true);
          }}
        >
          <p className="pb-1 text-center text-[16px] leading-[18.74px] text-[#484848] ">
            See All
          </p>
          <SeeMoreChevronDown />
          {/* <ChevronDown className="max-h-[10px] min-h-[10px] min-w-[25px] max-w-[25px]" /> */}
        </div>
      )}
      <SuggestedProducts />
    </div>
  );
}

const SuggestedProducts = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.initialModelData);
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  type product = {
    display_id: string;
    img?: StaticImageData;
    description: string;
    price: number;
    msrp: number;
  };

  const products: product[] = [
    {
      display_id: 'Premium',
      description: 'Semi-Custom Car Cover',
      price: 159.95,
      msrp: 320,
    },
    {
      display_id: 'Standard Pro',
      description: 'Semi-Custom Car Cover',
      price: 159.95,
      msrp: 320,
    },
    {
      display_id: 'Standard',
      description: 'Semi-Custom Car Cover',
      price: 124.95,
      msrp: 250,
    },
  ];

  console.log(products);

  return (
    <section id="you-may-also-like-section" className="pb-[20px]">
      <h1 className="font-[700] uppercase">you may also like </h1>
      <span className=" flex gap-2 overflow-x-auto pb-[30px]">
        {products.slice(0, 3).map((model, index) => (
          <div
            key={`suggested-item-${index}`}
            className="flex shrink-0 flex-col"
          >
            {/* <div
              key={`type-${index}`}
              className=" h-[200px] w-[200px] shrink-0 border-2 border-black bg-orange-500 "
            ></div> */}
            <Image
              alt="suggested-product"
              width={200}
              height={200}
              src={PlaceholderImage}
            />
            <p className="pt-3 text-[16px] font-[600] leading-[16px]">
              {model.display_id}
            </p>
            <p className="pt-0.5 text-[14px] leading-[16px]">
              {'Semi-Custom Car Cover'}
            </p>
            <div className="flex gap-[5px]">
              <p className="pt-[14px] text-[16px] font-[600] leading-[16px]">
                ${model.price}
              </p>
              <p className="pt-[14px] text-[14px] leading-[16px] text-[#767676] line-through">
                ${model.msrp}
              </p>
            </div>
          </div>
        ))}
      </span>
    </section>
  );
};
