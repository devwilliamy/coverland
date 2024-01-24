'use client';
import Image from 'next/image';
import product from '@/images/PDP/product_details_01.webp';
import productMobile from '@/images/PDP/product_details_01_mobile.webp';
import WhiteLogo from '@/images/logos/logo-white.png';
import { useMediaQuery } from '@mantine/hooks';

export function ProductHero() {
  const isMobile = useMediaQuery('(max-width: 1023px)'); //lg

  return (
    <div className="relative w-full lg:pt-0">
      {/* <Separator className="mb-10 mt-3 lg:hidden" /> */}
      <div className="relative -z-0">
        {isMobile ? (
          <Image
            alt="product"
            src={productMobile}
            placeholder="blur"
            quality={75}
            className="w-full object-contain"
          />
        ) : (
          <Image
            alt="product"
            src={product}
            placeholder="blur"
            quality={75}
            className="w-full object-contain"
          />
        )}
        <div className="absolute top-0 flex h-full w-full flex-col items-center">
          <p
            className="absolute top-[10%] max-w-[65%] text-center text-[5vw] font-black uppercase leading-[10vw] tracking-[2px] 
           text-white lg:max-w-[100%] lg:text-5xl"
          >
            Your car deserves the best
          </p>
          {isMobile ? (
            <div className="absolute bottom-[15%] flex flex-col items-center text-base">
              <p
                className="flex flex-row flex-nowrap text-center text-[16px] font-[500] capitalize 
              tracking-[0.64px] text-[#F2F2F2] md:text-3xl lg:pt-4 lg:text-white lg:opacity-80 "
              >
                Timeless Resilience <br />
                Ultimate Durability
              </p>
              {/* <p className="flex flex-row flex-nowrap font-thin capitalize tracking-[3px] text-[#F2F2F2] md:text-3xl">
                Ultimate durability
              </p> */}
            </div>
          ) : (
            <p className="absolute top-[17.5%] flex flex-row flex-nowrap pt-[340px] text-lg font-normal capitalize tracking-[0.48px] text-[#F2F2F2] md:text-2xl lg:pt-4 lg:text-white lg:opacity-80">
              Timeless Resilience
              <br className="invisible md:visible" />
              <span className="mr-1 hidden lg:block">. </span> Ultimate
              durability
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-[26px] right-[30px]">
        <Image
          alt="coverland"
          src={WhiteLogo}
          placeholder="blur"
          width={isMobile ? 120 : 184}
          height={isMobile ? 22 : 31}
        />
      </div>
    </div>
  );
}
