import {
  GrayCarIcon,
  GraySunIcon,
  GrayWaterIcon,
} from '@/components/PDP/icons';
import ProtectText from './ProtectText';
// import ProductDetailsMedia from './ProductDetailsMedia';
import dynamic from 'next/dynamic';
const ProductDetailsMedia = dynamic(() => import('./ProductDetailsMedia'));
export default function ProductDetailsHeader() {
  const threeIcons = [
    { title: 'Waterproof', icon: <GrayWaterIcon /> },
    { title: 'Paint Protection', icon: <GraySunIcon /> },
    { title: 'Custom Fit', icon: <GrayCarIcon /> },
  ];

  return (
    <section className="relative -mx-4 mb-[60px] flex flex-col items-center lg:mb-[110px]  ">
      <div className="flex py-7 text-center lg:py-[38px]">
        <ProtectText />
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
