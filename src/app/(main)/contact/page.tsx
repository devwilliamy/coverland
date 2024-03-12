import React from 'react';
import Banner from '@/images/hero/hero.webp';
import Image from 'next/image';
import { Raleway } from 'next/font/google';
import Phone from '@/images/contact/call 2.webp';
import Chat from '@/images/contact/chat 2.webp';
import Pin from '@/images/contact/location 1.webp';
import Mail from '@/images/contact/mail 1.webp';
import { Separator } from '@/components/ui/separator';

const raleway = Raleway({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-raleway',
});

const contactGrid = [
  { img: Pin, text: 'Coverland 15529 Blackburn Ave Norwalk, CA 90650' },
  { img: Chat, text: 'Live Chat' },
  { img: Phone, text: '(800)-799-5165' },
  { img: Mail, text: 'info@coverland.com' },
];

const Contact = () => {
  return (
    <section className="flex w-full flex-col">
      <span className="relative h-28 overflow-hidden lg:h-44">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.50)] from-0% via-[rgba(0,0,0,0.50)] via-100%"></div> */}
        <Image
          className="w-full bg-gray-300 bg-no-repeat object-contain"
          alt="coverland-banner"
          src={Banner}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={`text-[32px] font-bold leading-[32px] text-white lg:text-[40px] lg:leading-[44px] ${raleway.className}`}
          >
            Contact Us
          </p>
        </div>
      </span>
      <span className="flex h-full w-full flex-col items-center justify-center gap-[48px] py-[30px]">
        {contactGrid.map(({ img, text }) => (
          <div
            key={`contact-item-${img}`}
            className="flex max-w-[153px] flex-col items-center justify-center"
          >
            <Image src={img} alt="contact-grid-image" />
            <p
              className={`pt-[14px] text-center text-[16px] font-[700] leading-[21px]`}
            >
              {text}
            </p>
          </div>
        ))}
      </span>
      <Separator />
      <span className={`px-5 pt-[48px]`}>
        <p className="pb-[48px] text-[16px] leading-[21px] lg:text-[16px] lg:leading-[21px]">
          We love to hear from you! Please let us know if you have any questions
          or concerns and we will get back to you shortly. Thanks!
        </p>
        <label htmlFor="Name" className="pb-2 font-black">
          Name *
        </label>
        <input
          id="Email"
          type="text"
          required
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <label htmlFor="Email" className="pb-2 font-black">
          Email *
        </label>
        <input
          id="Phone Number"
          type="text"
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <label htmlFor="Phone Number" className="pb-2 font-black">
          Phone Number
        </label>
        <input
          id="Phone Number"
          type="text"
          required
          className="mb-[13px] min-h-[50px] w-full border-[2px] border-[#DBDBDB]"
        />
        <label htmlFor="help" className="pb-2 font-black">
          How Can We Help? *
        </label>
        <input
          id="help"
          type="text"
          required
          className="mb-[13px] min-h-[190px] w-full border-[2px] border-[#DBDBDB]"
        />
        <div className="mb-[70px] flex min-h-[40px] min-w-[135px] max-w-[135px] items-center justify-center rounded-full bg-gradient-to-br from-[#072c58] from-20% to-[#034998] to-80% text-[16px]  font-[700] leading-[21px] text-white ">
          SUBMIT
        </div>
      </span>
    </section>
  );
};

export default Contact;
