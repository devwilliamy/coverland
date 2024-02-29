'use client';
import React, { useState } from 'react';
import SeatCoverCarousel from './components/SeatCoverCarousel';
import { Rating } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import BlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/seat-black-red.webp';

import SeatCoverFreeDetails from './components/SeatCoverFreeDetails';
import CompatibleVehicles from './components/CompatibleVehicles';
import ElevateComfortSection from './components/ElevateComfortSection';
import SeatDimensions from '@/images/PDP/Product-Details-Redesign-2/seat-covers/seat-dimensions.webp';
import NonCompatible from '@/images/PDP/Product-Details-Redesign-2/seat-covers/non-compatible-features.webp';
import CompatibleVehiclesCarousel from './components/CompatibleVehiclesCarousel';
import LifetimeSection from '@/components/PDP/components/LifetimeSection';
// import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
// import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';

const seatColors: { image: StaticImageData }[] = [
  {
    image: BlackRed,
  },
];

export default function SeatCovers() {
  const [selectedProduct, setSelectedProduct] = useState<{
    image: StaticImageData;
  }>();

  return (
    <>
      <SeatCoverCarousel />
      <div className="grid grid-cols-1 px-4 lg:mt-[60px]">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h2 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
            Leatherette <br /> Front Seat Covers
          </h2>
          {/* Rating(s) */}
          <div className="mt-1 flex items-end gap-1 lg:mt-2">
            <div className="flex gap-1 ">
              <Rating
                name="read-only"
                value={5}
                readOnly
                style={{
                  height: '25px',
                  color: '#BE1B1B',
                }}
              />
            </div>
            {/* <RatingsTrigger /> */}
          </div>
        </div>
      </div>
      <section className="flex flex-col px-4 pt-[34px]">
        <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
          <div className="leading-[20px]"> ${99.95}</div>
          <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
            <span className=" text-[#BEBEBE] line-through">${200}</span>
            <p>(-50%)</p>
          </div>
        </div>
        <div className="pb-4.5 mt-1.5 flex items-center gap-2 ">
          <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
            4 interest-free installments of{' '}
            <b className="font-[400] text-black">$39.99</b>
          </p>
          <Image alt="paypal-installents" src={installments} />
          {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
        </div>
        <section
          id="select-color"
          className="mb-[30px] mt-[24px] flex h-full w-full flex-col py-1"
        >
          <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
            Select Color
          </h3>
          <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
            {seatColors &&
              seatColors.map((i, index) => {
                return (
                  <div
                    key={`car-color-${index}`}
                    className={`flex ${i && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                    onClick={() => {
                      setSelectedProduct(i);
                    }}
                  >
                    <Image
                      alt="cover-color"
                      src={i.image}
                      className="rounded-full"
                    />
                  </div>
                );
              })}
          </div>
        </section>
      </section>
      <SeatCoverFreeDetails />
      <CompatibleVehicles />
      <ElevateComfortSection />
      <section className="flex w-full flex-col items-center justify-center bg-white pt-[60px]">
        <p className="flex w-full items-center justify-center pb-7 text-center text-[26px] font-[700] leading-[26px]  lg:p-[6px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
          Product Size
        </p>
        <Image
          alt="seat-dimensions"
          src={SeatDimensions}
          className="mb-[60px]"
        />
        <CompatibleVehiclesCarousel />
        <Image
          alt="non-compatible-features"
          src={NonCompatible}
          className="pt-[60px]"
        />
      </section>
      <LifetimeSection />
      {/* <SuggestedProducts /> */}
      {/* <ExtraDetailsTabs /> */}
    </>
  );
}
