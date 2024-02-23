import Image from 'next/image';
import React from 'react';
import ProductHalfCover from '@/images/PDP/product-content-half-cover.webp';
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
    productType = productType?.slice(0, 3);
  }

  return (
    <section>
      <div
        id="bg-div"
        className="absolute top-0 z-[-1] h-full w-full bg-black/85"
      />
      <div className="flex py-7 text-center">
        <p className="w-full text-[26px] font-[500] leading-[26px] text-white">
          Protect your{' '}
          <span className={`capitalize`}>{make ? make : productType}</span> now
        </p>
      </div>
      <Image
        alt="product-content-half-cover"
        src={ProductHalfCover}
        // fill
        className="h-200 w-full"
        // width={500}
        // height={500}
      />
      <div className="my-[30px] grid grid-cols-3 items-center justify-center">
        {[
          { title: 'Waterproof', icon: <GrayWaterIcon /> },
          { title: 'Paint Protection', icon: <GraySunIcon /> },
          { title: 'Custom Fit', icon: <GrayCarIcon /> },
        ].map(({ title, icon }) => (
          <div key={title} className="flex flex-col place-items-center">
            <div>{icon}</div>
            <p className="text-[16px] text-white ">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
