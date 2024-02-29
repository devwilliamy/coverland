import React from 'react';
import IntertekLogo from '@/images/PDP/Product-Details-Redesign-2/intertek.webp';
import IntertekLogoDesktop from '@/images/PDP/Product-Details-Redesign-2/intertek-logo-desktop.webp';
import IntertekResults from '@/images/PDP/Product-Details-Redesign-2/intertek-results.webp';
import Image from 'next/image';
import BgBlur from '@/images/PDP/Product-Details-Redesign-2/pdp-background-blur.webp';

export default function RealTestSection() {
  return (
    <section className="relative mt-[60px] flex flex-col  justify-center">
      <Image
        alt="real-test-background"
        src={BgBlur}
        className="absolute top-0 z-[-3]  w-full max-w-full translate-y-[-30vh] object-cover lg:w-[150%] lg:translate-y-[-90vh]"
      />
      <div className="w-full">
        <p className="w-full text-center text-[30px] font-[600] leading-[22px] lg:text-[45px] lg:tracking-wider ">
          Real Test, True Result
        </p>
        <div className="flex w-full flex-col items-center pt-[14px] text-center text-[22px] font-[500]  leading-[28px] text-[#7D7D7D]  lg:hidden ">
          <p>Thoroughly Tested</p>
          <p>For Your Peace of Mind</p>
        </div>
        <div className="hidden w-full flex-col items-center pt-5 text-center text-[22px] font-[500] leading-[28px] text-[#7D7D7D] lg:flex lg:text-[34px]">
          <p>Thoroughly Tested For Your Peace of Mind</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <Image
            alt="intertek"
            src={IntertekLogo}
            className="py-9 lg:hidden lg:w-[330px] "
          />
          <Image
            alt="intertek"
            src={IntertekLogoDesktop}
            className="hidden py-9 lg:block lg:w-[330px]"
          />
          <Image
            alt="intertek-results"
            src={IntertekResults}
            className="lg:h-[404px] lg:w-[655px]"
          />
        </div>
        <span className="flex w-full justify-center">
          <a
            href={'/images/PDP/Product-Details-Redesign-2/intertek-results.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[36px] flex w-[75%] max-w-[255px] justify-center  rounded-lg bg-black px-6 py-[15px] text-center font-[600] uppercase text-white"
            title="Download test Results"
          >
            Download test Results
          </a>
        </span>
      </div>
    </section>
  );
}
