import React from 'react';
import Link from 'next/link';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import NewsletterForm from './NewsletterForm';
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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center bg-[#1A1A1A] px-2 py-2 md:px-8 md:py-8 lg:px-14 lg:py-10 ">
      {/* <Membership /> */}
      {/* <div className="h-auto px-4 flex flex-col justify-between items-center"> */}
      <div className="flex w-full flex-col justify-between lg:flex-row ">
        <div
          id="footer-left"
          className="mt-8 flex w-full flex-col items-start justify-start pb-8 lg:w-1/2 lg:pb-0"
        >
          <div id="newsletter" className="w-full lg:w-2/4">
            <p className="pb-0 text-lg font-black capitalize text-white lg:text-2xl lg:uppercase">
              Stay Connected
            </p>
            <div className="w-full">
              <p className="pt-8 text-base font-normal text-[#DBDBDB]">
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
            className="flex w-full flex-row items-center justify-start gap-3.5"
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
          className="align-center flex w-full flex-col items-start justify-around lg:w-1/2 lg:flex-row"
        >
          <div
            id="contacts-nav"
            className="flex flex-col items-start justify-start pb-8 lg:pb-0"
          >
            <p className="pb-4 text-lg font-black text-white lg:uppercase">
              Need Help?
            </p>
            <ul className="flex list-none flex-col items-start justify-start">
              <li className="mb-4 text-base font-normal text-[#DBDBDB]">
                <p className="">Call us toll-free:</p>
              </li>
              <li className="mb-4 text-white">
                <Link
                  href="tel:800-799-5165"
                  target="_blank"
                  className="flex flex-row items-center justify-center"
                >
                  <p className="hover-underline-animation text-2xl font-extrabold uppercase lg:text-xl">
                    1-800-799-5165
                  </p>
                </Link>
              </li>
              <li className="mb-4 text-base font-normal text-[#DBDBDB]">
                <p className="">Mon-Fri 9am-5pm PST</p>
              </li>
              <li className="mb-4 text-white">
                <Link
                  href="mailto:info@coverland.com"
                  target="_blank"
                  className="flex flex-row items-center justify-center"
                >
                  <BsFillEnvelopeFill color="#fff" size={15} />
                  <p className="hover-underline-animation ml-2 text-base font-normal text-[#DBDBDB] xl:ml-4">
                    info@coverland.com
                  </p>
                </Link>
              </li>
              {/* <li className="text-white mb-4">
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
              </li> */}
            </ul>
          </div>
          {/* <div
            id="csr-nav"
            className="flex flex-col items-start justify-start pb-8 lg:pb-0"
          >
            <p className="pb-4 text-lg font-black text-white lg:uppercase">
              Customer Service
            </p>
            <ul className="list-none">
              <li className="text-[#DBDBDB] font-normal text-base capitalize mb-4 hover-underline-animation">
                <Link href="/profile">My Orders</Link>
              </li>

              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="faqs">FAQs</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="contact">Contact Us</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="coupon-codes">Coupon Codes</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="customer-reviews">Customer Reviews</Link>
              </li>
            </ul>
          </div> */}
          <div
            id="info-nav"
            className="flex flex-col items-start justify-start pb-8 lg:pb-0"
          >
            <p className="pb-4 text-lg font-black text-white lg:uppercase">
              Information
            </p>
            <ul className="list-none">
              {/* <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="about">About Us</Link>
              </li> */}
              {/* <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="buying-guides">Buying Guides</Link>
              </li> */}
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/policies/warranty-policy">Warranty</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/policies/return-policy">Return Policy</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/policies/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/policies/shipping-policy">Shipping Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="copyright"
        className=" flex w-full  flex-col-reverse justify-center pt-8 lg:flex-row lg:justify-between"
      >
        <div className="flex w-full flex-col items-center justify-end opacity-70 lg:w-2/4 lg:items-start">
          <p className="text-center text-xs text-[#DBDBDB] lg:text-left">
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
          className="flex w-full flex-row flex-wrap items-start justify-center pb-8 opacity-70 lg:w-auto lg:flex-nowrap lg:items-end lg:justify-between lg:pb-0 "
        >
          <div className="align-center flex w-full flex-row flex-wrap items-center justify-center gap-2 md:w-3/5 lg:w-full lg:flex-nowrap lg:items-end lg:justify-between">
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
      {/* <LiveChat /> */}
    </footer>
  );
};

export default Footer;
