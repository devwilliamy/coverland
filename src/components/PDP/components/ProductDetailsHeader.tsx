import {
  GrayCarIcon,
  GraySunIcon,
  GrayWaterIcon,
} from '@/components/PDP/icons';
import ProtectHeaderText from './ProtectHeaderText';
// import ProductDetailsMedia from './ProductDetailsMedia';
import dynamic from 'next/dynamic';
import DetailsTabHeader from '@/app/(main)/[productType]/components/DetailsTabHeader';
import useDetermineType from '@/hooks/useDetermineType';
import ProductDetailsMedia from './ProductDetailsMedia';
// const ProductDetailsMedia = dynamic(() => import('./ProductDetailsMedia'));
export default function ProductDetailsHeader() {
  const threeIcons = [
    { title: 'Waterproof', icon: <GrayWaterIcon /> },
    { title: 'Paint Protection', icon: <GraySunIcon /> },
    { title: 'Custom Fit', icon: <GrayCarIcon /> },
  ];
  const { make, model } = useDetermineType();

  return (
    <section className="relative mb-[60px] flex flex-col items-center lg:mb-[110px]  ">
      <DetailsTabHeader />
      <div className="mt-[60px] flex flex-col pb-7 text-center lg:mt-[110px] lg:pb-[38px] ">
        <p className="text-[16px] capitalize leading-[26px] text-[#B23B4E] lg:text-[26px]">
          Elevate Style, Keep it new
        </p>
        <ProtectHeaderText />
      </div>
      <div className="flex w-screen items-center justify-center lg:w-full ">
        <div className="flex w-full max-w-[840px]">
          <ProductDetailsMedia />
        </div>
      </div>

      <div className="mt-[30px] grid grid-cols-3 items-center justify-center lg:gap-[120px]">
        {threeIcons.map(({ title, icon }) => (
          <div key={title} className="flex flex-col place-items-center">
            <div>{icon}</div>
            <p className="pt-0.5 text-[14px] text-white lg:text-[16px] ">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
