import React from 'react';
import Image from 'next/image';
import Beach from '../../../public/images/security/security-beach.webp';
import {
  CircleDollarSign,
  CloudRainWind,
  Shield,
  SunMedium,
  Umbrella,
} from 'lucide-react';
import { FaShippingFast } from 'react-icons/fa';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { BsBoxSeamFill } from 'react-icons/bs';

const SecuritySection = () => {
  return (
    <>
      <section className="xxl:px-0 flex h-auto w-screen max-w-[1280px] flex-col bg-white px-4 md:px-24 lg:px-20 lg:pt-20">
        <div className="flex flex-col items-center justify-center xl:flex-row ">
          <div className="flex h-full flex-col items-start justify-center">
            <div className="w-full pb-20 pt-20 lg:pb-10 lg:pt-0">
              <h1 className=" text-dark text-center text-2xl font-extrabold uppercase md:text-5xl xl:text-left">
                Experience the Best Security
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
              <div className="flex w-full flex-row pb-8 lg:pb-10">
                <div className="bg-offWhite icon-shadow mr-8 flex h-14 w-14 flex-row items-center justify-center rounded-lg">
                  <Umbrella size={30} color="#185CFF" />
                </div>
                <div className="flex w-3/4 flex-col items-start justify-start">
                  <h2 className="text-dark text-xl font-semibold capitalize lg:text-lg lg:uppercase">
                    Weatherproof
                  </h2>
                  <p className=" text-dark">
                    It fully protects my car in all weather conditions. Built to
                    be effective in all seasons.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-8 md:pb-10">
                <div className="bg-offWhite icon-shadow mr-8 flex h-14 w-14 flex-row items-center justify-center rounded-lg">
                  <SunMedium size={30} color="#185CFF" />
                </div>
                <div className="flex w-3/4 flex-col items-start justify-start">
                  <h2 className="text-dark text-xl font-semibold capitalize lg:text-lg lg:uppercase">
                    UV & Heat Protection
                  </h2>
                  <p className=" text-dark">
                    Without heat accumulation, our covers reflect 100% of all UV
                    rays.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-8 md:pb-10">
                <div className="bg-offWhite icon-shadow mr-8 flex h-14 w-14 flex-row items-center justify-center rounded-lg">
                  <Shield size={30} color="#185CFF" />
                </div>
                <div className="flex w-3/4 flex-col items-start justify-start">
                  <h2 className="text-dark text-xl font-semibold capitalize lg:text-lg lg:uppercase">
                    Scratchproof
                  </h2>
                  <p className=" text-dark">
                    Serving as a protective coat, our covers guard against
                    scratches by kids, dirt and even cats.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-4 lg:pb-0">
                <div className="bg-offWhite icon-shadow mr-8 flex h-14 w-14 flex-row items-center justify-center rounded-lg">
                  <CloudRainWind size={30} color="#185CFF" />
                </div>
                <div className="flex w-3/4 flex-col items-start justify-start">
                  <h2 className="text-dark text-xl font-semibold capitalize lg:text-lg lg:uppercase">
                    Hail, Storm & Snow Protection
                  </h2>
                  <p className="text-dark text-base">
                    Regardless of weather conditions, our covers are snowproof,
                    waterproof and windproof.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-end object-cover pb-4 pt-4 md:pb-0 md:pt-16">
            <Image
              src={Beach}
              className=" w-full rounded-xl"
              alt="a fully-covered vehicle with a coverland car cover on it"
            />
          </div>
        </div>
      </section>
      <div className="xxl:px-0 flex h-auto w-screen max-w-[1280px] flex-col bg-white px-4 pt-8 md:px-24 md:pt-20 lg:px-20">
        <div className="flex flex-col items-start justify-center lg:flex-row ">
          <div className="flex h-full flex-col items-start justify-center">
            <div className="w-full pb-10 pt-0 lg:pb-20">
              <h1 className=" text-dark text-center text-2xl font-extrabold uppercase md:text-5xl  xl:text-center">
                Buy with confidence
              </h1>
            </div>
            <div className='xl:gap-8" grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
              <div className="flex w-full flex-row pb-8 md:flex-col md:items-center md:justify-start lg:pb-0">
                <CircleDollarSign size={55} color="#185CFF" />

                <div className="ml-8 flex w-full flex-col items-start justify-start md:ml-0 md:items-center">
                  <h2 className="text-dark text-left text-xl font-semibold capitalize md:text-center lg:text-lg lg:uppercase xl:py-4">
                    90-Day Money Back
                  </h2>
                  <p className=" text-dark text-left text-base md:text-center">
                    Purchase confidently, knowing we offer a full 90-day
                    money-back guarantee.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-8 md:flex-col md:items-center md:justify-start lg:pb-0">
                <RiSecurePaymentFill size={55} color="#185CFF" />

                <div className="ml-8 flex w-full flex-col items-start justify-start md:ml-0 md:items-center">
                  <h2 className="text-dark text-left text-xl font-semibold capitalize md:text-center lg:text-lg lg:uppercase xl:py-4">
                    Secure Shopping
                  </h2>
                  <p className=" text-dark text-left text-base md:text-center">
                    Rest easy with our commitment to the highest standards of
                    secure shopping.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-8 md:flex-col md:items-center md:justify-start lg:pb-0">
                <FaShippingFast size={55} color="#185CFF" />

                <div className="ml-8 flex w-full flex-col items-start justify-start md:ml-0 md:items-center">
                  <h2 className="text-dark whitespace-nowrap text-left text-xl font-semibold capitalize md:text-center lg:text-lg lg:uppercase xl:py-4">
                    Same-Day Processing
                  </h2>
                  <p className=" text-dark text-left text-base md:text-center">
                    {`Place your order today, and we'll ensure immediate, same-day
                    processing.`}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row pb-4 md:flex-col md:items-center md:justify-start lg:pb-0">
                <BsBoxSeamFill size={55} color="#185CFF" />

                <div className="ml-8 flex w-full flex-col items-start justify-start md:ml-0 md:items-center">
                  <h2 className="text-dark text-left text-xl font-semibold capitalize md:text-center lg:text-lg lg:uppercase xl:py-4">
                    30-Day Free Returns
                  </h2>
                  <p className="text-dark text-left text-base md:text-center">
                    Changed your mind? No worries; we offer free returns for 30
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySection;
