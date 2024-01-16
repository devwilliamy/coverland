import React from 'react';
import Link from 'next/link';
import {
  BsFacebook,
  BsYoutube,
  BsTelephoneFill,
  BsFillEnvelopeFill,
  BsFillChatDotsFill,
  BsPinMapFill,
} from 'react-icons/bs';
import NewsletterForm from './NewsletterForm';
import Membership from './Membership';
import {
  AmexCard,
  ApplePayCard,
  DinersClubCard,
  GooglePayCard,
  JCBCard,
  LineCard,
  MasterCard,
  PayCard,
  PaypalCard,
  VimeoCard,
  VisaCard,
} from '@/components/PDP/images/cards';
import { FbCustomIcon, YtCustomIcon } from '@/components/PDP/images';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/db/types';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  console.log('Footer component is rendering');

  return (
    <footer className="flex flex-col justify-center items-center bg-[#1A1A1A] py-2 md:py-8 px-2 md:px-8 lg:py-10 lg:px-14 ">
      {/* <Membership /> */}
      {/* <div className="h-auto px-4 flex flex-col justify-between items-center"> */}
      <div className="flex flex-col lg:flex-row w-full justify-between ">
        <div
          id="footer-left"
          className="flex flex-col justify-start items-start w-full lg:w-1/2 pb-8 lg:pb-0 mt-8"
        >
          <div id="newsletter" className="w-full lg:w-2/4">
            <p className="text-lg lg:text-2xl capitalize lg:uppercase text-white font-black pb-0">
              Stay Connected
            </p>
            <div className="w-full">
              <p className="text-[#DBDBDB] font-normal text-base pt-8">
                Subscribe to stay up to date on the latest products, deals, and
                more.
              </p>
            </div>

            <div className="py-6">
              <NewsletterForm />
            </div>
          </div>
          <div
            id="social-icons=footer"
            className="flex flex-row w-full justify-start items-center gap-3.5"
          >
            <Link href="https:www.facebook.com/coverland" target="_blank">
              <FbCustomIcon />
            </Link>
            <Link href="https:www.youtube.com/coverland" target="_blank">
              <YtCustomIcon />
            </Link>
          </div>
        </div>

        <div
          id="footer-right"
          className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-between items-start align-center"
        >
          <div
            id="contacts-nav"
            className="flex flex-col justify-start items-start pb-8 lg:pb-0"
          >
            <p className="text-lg lg:uppercase text-white font-black pb-4">
              Need Help?
            </p>
            <ul className="list-none flex flex-col justify-start items-start">
              <li className="text-[#DBDBDB] font-normal text-base mb-4">
                <p className="">Call us toll-free:</p>
              </li>
              <li className="text-white mb-4">
                <Link
                  href="tel:800-799-5165"
                  target="_blank"
                  className="flex flex-row justify-center items-center"
                >
                  <p className="hover-underline-animation text-2xl lg:text-xl uppercase font-extrabold">
                    1-800-799-5165
                  </p>
                </Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base mb-4">
                <p className="">Mon-Fri 9am-5pm PST</p>
              </li>
              <li className="text-white mb-4">
                <Link
                  href="mailto:info@coverland.com"
                  target="_blank"
                  className="flex flex-row justify-center items-center"
                >
                  <BsFillEnvelopeFill color="#fff" size={15} />
                  <p className="text-[#DBDBDB] font-normal text-base ml-2 xl:ml-4 hover-underline-animation">
                    info@coverland.com
                  </p>
                </Link>
              </li>
              <li className="text-white mb-4">
                <Link
                  href=""
                  target="_blank"
                  className="flex flex-row justify-center items-center"
                >
                  <BsFillChatDotsFill color="#fff" size={15} />
                  <p className="text-[#DBDBDB] font-normal text-base ml-2 xl:ml-4 hover-underline-animation">
                    Start a live chat
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div
            id="csr-nav"
            className="flex flex-col justify-start items-start pb-8 lg:pb-0"
          >
            <p className="text-lg lg:uppercase text-white font-black pb-4">
              Customer Service
            </p>
            <ul className="list-none">
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/profile">My Orders</Link>
              </li>

              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="faqs">FAQs</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="contact">Contact Us</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="coupon-codes">Coupon Codes</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="customer-reviews">Customer Reviews</Link>
              </li>
            </ul>
          </div>
          <div
            id="info-nav"
            className="flex flex-col justify-start items-start pb-8 lg:pb-0"
          >
            <p className="text-lg lg:uppercase text-white font-black pb-4">
              Information
            </p>
            <ul className="list-none">
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="about">About Us</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="buying-guides">Buying Guides</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/policies/warranty-policy">Warranty</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/policies/return-policy">Return Policy</Link>
              </li>
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/policies/privacy-policy">Privacy Policy</Link>
              </li>
              {/* <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/policies/shipping-policy">Shipping Policy</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div
        id="copyright"
        className=" flex flex-col-reverse  lg:flex-row w-full pt-8 justify-center lg:justify-between"
      >
        <div className="w-full lg:w-2/4 flex flex-col justify-end items-center lg:items-start opacity-70">
          <p className="text-[#DBDBDB] text-xs text-center lg:text-left">
            {' '}
            Copyright &#169; {currentYear} Coverland, Inc. All Rights Reserved.
            {/* <br className="lg:hidden" /> Site built by{' '}
            <Link
              href="https://www.mcbportfolio.com?ref=coverland"
              target="_blank"
            >
              MCB
            </Link>{' '}
            and{' '}
            <Link href="https://simpledigital.io?ref=coverland" target="_blank">
              Simple Digital
            </Link>
            . */}
          </p>
        </div>
        <div
          id="credit-cards"
          className="w-full lg:w-auto flex flex-row flex-wrap lg:flex-nowrap justify-center lg:justify-between items-start lg:items-end pb-8 lg:pb-0 opacity-70 "
        >
          <div className="w-full md:w-3/5 lg:w-full flex flex-row flex-wrap justify-center items-center align-center lg:flex-nowrap lg:justify-between lg:items-end gap-2">
            <AmexCard />
            <ApplePayCard />
            <DinersClubCard />
            <LineCard />
            <GooglePayCard />
            <JCBCard />
            <MasterCard />
            <PaypalCard />
            <PayCard />
            <VimeoCard />
            <VisaCard />
          </div>
        </div>
      </div>
      {/* </div */}
    </footer>
  );
};

export default Footer;
