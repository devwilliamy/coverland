import Link from 'next/link';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import NewsletterForm from '../home/NewsletterForm';
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
import LiveChat from '@/components/LiveChat';
import { FaYoutube } from 'react-icons/fa';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { ReactNode } from 'react';

const IconCircle = ({ children }: { children: ReactNode }) => (
  <div className="flex aspect-square w-[30px] items-center justify-center rounded-full bg-white p-[5px]">
    {children}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center bg-[#1A1A1A] px-2 py-2 md:px-8 md:py-8 lg:px-14 lg:py-10 ">
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
            <Link
              href="https://youtube.com/@CoverLandUSA?si=hcqFGwnMgWrRfIdP"
              target="_blank"
              aria-label="Go to Coverland Youtube page"
            >
              <IconCircle>
                <FaYoutube className="h-full w-full" />
              </IconCircle>
            </Link>
            <Link
              href="https://www.instagram.com/coverland_us/"
              target="_blank"
              aria-label="Go to Coverland Instagram page"
            >
              <IconCircle>
                <PiInstagramLogoFill className="h-full w-full" />
              </IconCircle>
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
                <p className="">Contact us 24/7</p>
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
              <li className="mb-4 text-white">
                <Link
                  href="mailto:support@coverland.com"
                  target="_blank"
                  className="flex flex-row items-center justify-center"
                >
                  <BsFillEnvelopeFill color="#fff" size={15} />
                  <p className="hover-underline-animation ml-2 text-base font-normal text-[#DBDBDB] xl:ml-4">
                    support@coverland.com
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div
            id="info-nav"
            className="flex flex-col items-start justify-start pb-8 lg:pb-0"
          >
            <p className="pb-4 text-lg font-black text-white lg:uppercase">
              Information
            </p>
            <ul className="list-none">
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
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/contact">Contact Us</Link>
              </li>
              <li className="hover-underline-animation mb-4 text-base font-normal capitalize text-[#DBDBDB]">
                <Link href="/about">About Us</Link>
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
            Copyright &#169; {currentYear} Coverland.com. All Rights Reserved.
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
      <LiveChat />
    </footer>
  );
};

export default Footer;
