import Image from 'next/image';
import MobileHalfCover from '@/images/PDP/product-content-half-cover.webp';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import {
  GrayCarIcon,
  GraySunIcon,
  GrayWaterIcon,
} from '@/components/PDP/components/icons';
import { useParams } from 'next/navigation';

export default function ProductDetailsHeader() {
  const params = useParams();
  const make = params?.make;
  let productType = params?.productType;
  if (productType === 'truck-covers') {
    return (productType = 'Truck');
  } else {
    if (productType === 'suv-covers') {
      productType = productType.toUpperCase();
    }
    productType = productType?.slice(0, 3);
  }

  const threeIcons = [
    { title: 'Waterproof', icon: <GrayWaterIcon /> },
    { title: 'Paint Protection', icon: <GraySunIcon /> },
    { title: 'Custom Fit', icon: <GrayCarIcon /> },
  ];
  return (
    <section className="relative -mx-4 mb-[60px] flex flex-col items-center  ">
      <div className="flex py-7 text-center">
        <p className="w-full text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
          Protect your{' '}
          <span className={`capitalize`}>{make ? make : productType}</span> now
        </p>
      </div>
      <div className="flex w-screen items-center justify-center lg:w-full ">
        <Image
          alt="product-content-half-cover"
          src={MobileHalfCover}
          // fill
          // height={700}
          className="flex w-[1320px] lg:hidden "
        />
        <Image
          alt="product-content-half-cover-desktop"
          src={DesktopHalfCover}
          // fill
          // height={700}
          width={1320}
          className="hidden  w-[1320px] lg:flex lg:max-w-[850px]"
        />
      </div>

      <div className="mt-[30px] grid grid-cols-3 items-center justify-center lg:gap-[120px]">
        {threeIcons.map(({ title, icon }) => (
          <div key={title} className="flex flex-col place-items-center">
            <div>{icon}</div>
            <p className="text-[16px] text-white ">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
