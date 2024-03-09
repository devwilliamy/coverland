import Image from 'next/image';
import React from 'react';
import Waterproof from '@/images/difference/best-materials.webp';
import { BsCheckSquareFill } from 'react-icons/bs';

const WhyChooseCoverland = () => {
  const whyChooseDetails = [
    'Luxury thick microfiber material',
    'Indoor car covers & outdoor car covers',
    'Water resistant shiled to give protection from impairment caused by water',
    'Varied size and color option',
    'Protection against damage from sun and UV rays',
    'Windproof, easy buckle nylon straps and two small grommets',
  ];
  return (
    <section className="px-4 lg:px-0">
      <div className="flex w-full flex-col justify-center lg:flex-row ">
        <div className="relative aspect-square max-h-[562px] w-full  max-w-[617px]  lg:w-1/2 ">
          <Image
            className="rounded-[8px] object-cover lg:rounded-[15px] "
            fill
            src={Waterproof}
            // className=" rounded-[8px] object-cover md:max-h-[462px] md:min-h-[462px] md:min-w-[517px] md:max-w-[517px]  lg:max-h-[562px] lg:min-h-[562px] lg:min-w-[617px] lg:max-w-[617px]"
            alt="a fully-covered vehicle with a coverland car cover on it"
          />
          <div className="absolute bottom-[27px] left-[14px] z-10 flex flex-col gap-[12px] lg:bottom-[42px] lg:left-[42px]">
            <p className="text-[18px] font-[500] capitalize text-white lg:text-[24px]">
              Waterproof car covers
            </p>
            <button className="flex h-[44px] max-w-[160px] items-center rounded-[100px] bg-white px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px]">
              <a href="/car-covers">Shop Now</a>
            </button>
          </div>
        </div>
        <div
          id="Content"
          className="flex w-full max-w-[580px] flex-col lg:ml-[62px] lg:w-1/2 "
        >
          <div className="flex h-full w-full flex-col">
            <div className="hidden w-full text-[34px] font-extrabold uppercase leading-[40px] lg:flex lg:whitespace-nowrap ">
              Why Choose <br /> CoverLand Car Covers?
            </div>
            <div className="mb-[22px] mt-[32px] flex w-full text-[24px] font-extrabold uppercase leading-[32px] lg:mt-0 lg:hidden lg:whitespace-nowrap lg:leading-[40px] ">
              Why Choose CoverLand <br /> Car Covers?
            </div>
            <div className="flex flex-col items-start justify-start pt-0 text-[14px] font-[400] leading-[140%] lg:pt-7 lg:text-[16px] lg:leading-[36px] ">
              {whyChooseDetails.map((item, index) => (
                <span
                  key={index}
                  className="flex flex-row items-start justify-center pb-4"
                >
                  <div className="">
                    <BsCheckSquareFill size={18} color="#000" />
                  </div>
                  <p className="text-dark pl-4 text-[14px] leading-[19px] ">
                    {item}
                  </p>
                </span>
              ))}
            </div>
            <div className="pb-10 pt-3">
              <p className="text-[14px] font-[400]">
                Our top covers are specifically made to be closely fitted on
                your vehicle in order to safeguard it from outside elements.
                With all the above-mentioned features, keep in mind our
                custom-made strong car covers ensure your car&apos;s safety. We
                also provide our customers with free shipping and an easy 30-day
                return policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCoverland;
