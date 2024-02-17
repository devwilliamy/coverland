import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import Image, { StaticImageData } from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import { useStore } from 'zustand';
import CarPlaceholder from '@/images/suggested/CarPlaceholder.webp';
import SUVPlaceholder from '../../../../public/custom-cover/sc-01-ps-gr-1to-m.webp';
import TruckPlaceholder from '../../../../public/custom-cover/tc-01-ps-gr-1to-m.webp';
import { useMediaQuery } from '@mantine/hooks';

export default function SuggestedProducts() {
  let PlaceholderImage: StaticImageData = CarPlaceholder;
  const isMobile = useMediaQuery('(max-width: 1024px)'); //lg

  const params = useParams<{
    productType: string;
  }>();
  const TruckOrSuvPlaceholder =
    params?.productType === 'truck-covers' ? TruckPlaceholder : SUVPlaceholder;

  PlaceholderImage =
    params?.productType === 'car-covers'
      ? CarPlaceholder
      : TruckOrSuvPlaceholder;
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
    <section id="you-may-also-like-section" className="px-4 pb-[20px]">
      <h1 className="font-[700] uppercase lg:text-[32px] lg:font-[900]">
        you may also like{' '}
      </h1>
      <span className=" no-scrollbar flex gap-2 overflow-x-auto pb-[30px]">
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
}
