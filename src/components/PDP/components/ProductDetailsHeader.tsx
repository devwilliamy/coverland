import Image from 'next/image';
import MobileHalfCover from '@/images/PDP/product-content-half-cover.webp';
import DesktopHalfCover from '@/images/PDP/Product-Details-Redesign-2/dekstop-half-cover.webp';
import CorvetteGif from '@/videos/Corvette Zoom.mp4';
import {
  GrayCarIcon,
  GraySunIcon,
  GrayWaterIcon,
} from '@/components/PDP/icons';
import { useParams } from 'next/navigation';
import ProductVideo from '../ProductVideo';

export default function ProductDetailsHeader() {
  const params = useParams<{
    make?: string;
    model?: string;
    year?: string;
    productType?: string;
    coverType?: string;
  }>();
  if (!params) return null;
  const { make, model } = params;
  let productType = params?.productType;
  const coverType = params?.coverType;
  const isDefault = coverType === 'premium-plus' || coverType === undefined;
  if (productType === 'truck-covers') {
    productType = 'Truck';
  } else if (productType === 'suv-covers') {
    productType = productType.toUpperCase();
    productType = productType?.slice(0, 3);
  } else {
    productType = productType?.slice(0, 3);
  }

  const threeIcons = [
    { title: 'Waterproof', icon: <GrayWaterIcon /> },
    { title: 'Paint Protection', icon: <GraySunIcon /> },
    { title: 'Custom Fit', icon: <GrayCarIcon /> },
  ];

  const protectText = model ?? make ?? productType;
  return (
    <section className="relative -mx-4 mb-[60px] flex flex-col items-center lg:mb-[110px]  ">
      <div className="flex py-7 text-center lg:py-[38px]">
        <p className="w-full text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pt-[28px] lg:text-[45px]  lg:leading-[32px]">
          Protect your <span className={`capitalize`}>{protectText}</span> now
        </p>
      </div>
      <div className="flex w-screen items-center justify-center lg:w-full ">
        <div className="flex w-full max-w-[840px]">
          {isDefault ? (
            <ProductVideo
              src={CorvetteGif}
              autoplay
              loop
              aspectRatio="16/9"
              controls={false}
            />
          ) : (
            <Image
              alt="product-content-half-cover-desktop"
              src={DesktopHalfCover}
              // fill
              height={1000}
              width={1000}
              className="w-full"
            />
          )}
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
