import React from 'react';
// import Logo from '../../../../public/brand/logo_light.png';
import { FaArrowAltCircleRight } from 'react-icons/fa';

//HIDE THIS COMPONENT WHEN THE USER IS LOGGED IN!!!!!

//why are you yelling

const Membership = () => {
  return (
    <section className="membership flex w-full max-w-[1440px] flex-col items-center justify-center md:flex-row md:justify-between md:px-4  lg:justify-center lg:px-0">
      <div className=" flex h-auto w-full flex-col items-center justify-between px-4 py-8 md:flex-row lg:px-20 lg:py-16">
        <div className="flex w-full flex-col items-center justify-center  pb-8 md:w-2/3 md:items-start md:pb-0 xl:w-3/4">
          <div className="flex w-full flex-row items-center justify-center md:hidden">
            {' '}
            {/* <Image
              src={Logo}
              alt="coverland logo"
              className="object-cover w-4/5"
            /> */}
          </div>
          <p className="py-6 text-2xl font-semibold uppercase text-white">
            The Coverland Benefits
          </p>
          <div className="grid grid-cols-1 gap-2">
            <span className="flex flex-row items-center justify-start">
              <FaArrowAltCircleRight color="#fff" size={20} className="mr-4" />{' '}
              <p className="text-base capitalize text-white">
                Exclusive Discounts
              </p>
            </span>
            <span className="flex flex-row items-center justify-start">
              <FaArrowAltCircleRight color="#fff" size={20} className="mr-4" />{' '}
              <p className="text-base capitalize text-white">
                First Access to New Arrivals
              </p>
            </span>
            <span className="flex flex-row items-center justify-start">
              <FaArrowAltCircleRight color="#fff" size={20} className="mr-4" />{' '}
              <p className="text-base capitalize text-white">
                Tailored Recommendations
              </p>
            </span>
            <span className="flex flex-row items-center justify-start">
              <FaArrowAltCircleRight color="#fff" size={20} className="mr-4" />{' '}
              <p className="text-base capitalize text-white">Loyalty Rewards</p>
            </span>
            <span className="flex flex-row items-center justify-start">
              <FaArrowAltCircleRight color="#fff" size={20} className="mr-4" />{' '}
              <p className="text-base capitalize text-white">
                Dedicated Support &amp; Maintenance Tips
              </p>
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center md:w-1/3 md:items-start xl:w-1/4">
          <div className="hidden md:block">
            {' '}
            {/* <Image
              src={Logo}
              alt="coverland logo"
              className="object-cover h-28 w-auto"
            /> */}
          </div>

          <div className="flex flex-row pb-12 pt-6 md:py-6">
            <div className="w-full pr-4 ">
              {' '}
              <button className="text-dark align-center flex h-10 w-32 flex-col items-center justify-center rounded-full bg-white px-4 py-2 text-base font-semibold md:h-[40px] md:w-[115px]">
                Login
              </button>
            </div>
            <div className="w-full ">
              <button className="text-dark align-center flex h-10 w-32 flex-col items-center justify-center rounded-full bg-white px-4 py-2 text-base font-semibold md:h-[40px] md:w-[115px]">
                Sign Up
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-white md:text-left">
            Not a member?
            <br className="md:hidden" /> Join and receive 10% off your first
            order.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership;
