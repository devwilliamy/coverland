import Image from 'next/image';
import React from 'react';
import DesktopBG from '@/images/video_reviews_program/video-reviews-bg-desktop.webp';
import MobileBG from '@/images/video_reviews_program/video-reviews-bg-mobile.webp';
import PhoneRec from '@/images/video_reviews_program/phone-car.webp';
import BigDownArrow from '@/images/video_reviews_program/big-review-arrow.png';
import {
  MdLocalAtm,
  MdOutlineArticle,
  MdOutlineDrafts,
  MdOutlinePhotoCamera,
} from 'react-icons/md';

import { LucideCheckSquare } from 'lucide-react';
import FilledAtm from '@/components/icons/FilledAtm';

const iconSize = 45;
export default function VideoReviewPage() {
  return (
    <div>
      <section className=" flex  flex-col items-center overflow-clip  lg:pt-[71px]">
        <div className="relative flex h-full w-full max-w-[842px] flex-col items-center ">
          <Image
            alt="video_reviews_bg"
            src={MobileBG}
            // className="absolute top-0 flex h-full max-h-[512px] w-full min-w-full  object-contain"
            className="absolute z-[-1] max-h-[512px] w-full max-w-[842px]  "
          />
          <div className="flex flex-col items-center pt-[44px] ">
            <div className="flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#717171] px-4 py-[3.5px] ">
              <p className="text-[white]">Special Event</p>
            </div>
            <p className="pt-[28px] text-[32px] font-[900] leading-[37.5px] text-[#F3F3F3]">
              Get $200
            </p>
            <p className="pt-[6px] text-[22px] font-[500] leading-[25.78px] text-[#F3F3F3]">
              For Your Honest Review
            </p>
          </div>
          <Image
            alt="phone-car"
            src={PhoneRec}
            className=" min-w-[366px] max-w-[105vw] pl-[3vw] pt-5 max-lg:-mr-[min(5vw,40px)]"
          />
          <p className="max-w-[320px] pb-[44px] pt-6 text-center text-[14px] font-[300] leading-[22px] text-[#F3F3F3] lg:text-[16px] lg:leading-[24px]">
            We're inviting everyone who's purchased <br /> our car covers to
            share their experience.
          </p>
        </div>
      </section>
      <section className="flex flex-col bg-[#F3F3F3] pt-[50px]">
        <div className="flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#D13030] px-4 py-[3.5px] ">
          <p className=" text-[white]">How It Works:</p>
        </div>
        <div className="relative flex flex-col items-center gap-[22px] pb-[50px] pt-[32px]">
          <div className="">
            <Image
              src={BigDownArrow}
              alt="big-down-arrow"
              className="absolute left-1/2  -translate-x-1/2"
            />
          </div>
          {[
            {
              icon: <LucideCheckSquare size={iconSize} />,
              title: 'Buy Our Cover',
              description: 'Own one of our car covers? You’re set to go.',
            },
            {
              icon: <MdOutlineArticle size={iconSize} />,
              title: 'Fill In the Form',
              description: 'Complete the contact form below to register.',
            },
            {
              icon: <MdOutlineDrafts size={iconSize} />,
              title: 'Check Your Email',
              description:
                'Receive our email with simple guidelines and questions to help you prepare your review.',
            },
            {
              icon: <MdOutlinePhotoCamera size={iconSize} />,
              title: 'Record Your Review',
              description:
                'Record a video review and take photos, No edits needed!',
            },
          ].map(({ icon, title, description }, i) => (
            <div className="z-[1] flex w-full max-w-[320px] items-center gap-[14px] rounded-[12px] bg-[white] px-[10px] py-5">
              <div className={`min-w-[${iconSize}px]`}>{icon}</div>
              <div className="flex flex-col text-[14px] font-[900] leading-[15px]">
                <p className="text-[#D13030]">Step. {i + 1}</p>
                <p className="pt-1">{title}</p>
                <p className="pt-2 text-[12px] font-[300]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex justify-center px-[27px] pb-5 pt-[70px]">
        <div className="z-[1] flex w-full max-w-[345px] items-center gap-[50px] rounded-[10px] bg-[white] py-[15px] pl-[30px] pr-[15px]  text-[#D13030] outline outline-[2px] outline-[#D13030]">
          <FilledAtm
            className={`flex w-full min-w-[${iconSize}px] max-w-[60px]  lg:max-w-[128px]`}
          />
          <div className="flex flex-col text-[14px]  leading-[15px]">
            <p className="pt-1 text-[26px] font-[900] leading-[30px]">
              Get $200
            </p>
            <p className="pt-2 text-[12px] ">
              Send them to us and get cash via Zelle, Paypal, Venmo, etc.
            </p>
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col bg-[black] px-4 pt-10 ">
        <p className="text-[14px] font-[700] leading-[30px] text-[white]">
          Participating will:
        </p>
        <ul className="list-inside list-disc text-[14px]  text-[#d6d6d6d3] ">
          <li className="list-item">Reward you with $200 in cash</li>
          <li className="list-item">
            Assist others in making well-informed decisions
          </li>
          <li className="list-item">Help us enhance our products</li>
        </ul>
        <p className="w-full items-center pb-[30px] pt-[60px] text-center text-[26px] font-[900] leading-[30px] text-[white]">
          Join now!
        </p>
      </section>
    </div>
  );
}
