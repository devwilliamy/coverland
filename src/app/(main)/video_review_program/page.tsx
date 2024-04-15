import Image from 'next/image';
import React from 'react';
import DesktopBG from '@/images/video_reviews_program/video-reviews-bg-desktop.webp';
import MobileBG from '@/images/video_reviews_program/video-reviews-bg-mobile.webp';
import PhoneRec from '@/images/video_reviews_program/phone-car.webp';
import BigDownArrow from '@/images/video_reviews_program/big-review-arrow.png';
import BiggerArrow from '@/images/video_reviews_program/bigger-arrow.png';
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
  const steps = [
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
      description: (
        <>
          Receive our email with simple guidelines and
          <br className="hidden lg:flex" /> questions to help you prepare your
          review.
        </>
      ),
    },
    {
      icon: <MdOutlinePhotoCamera size={iconSize} />,
      title: 'Record Your Review',
      description: 'Record a video review and take photos, No edits needed!',
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="relative flex w-full max-w-[845px] flex-col">
        <div className="absolute flex min-h-[427px] w-full">
          <Image
            alt="video_reviews_bg"
            src={MobileBG}
            // className="absolute top-0 flex h-full max-h-[512px] w-full min-w-full  object-contain"
            className="z-[-1] flex h-full w-full lg:hidden"
          />
          <Image
            alt="video_reviews_bg"
            src={DesktopBG}
            // className="absolute top-0 flex h-full max-h-[512px] w-full min-w-full  object-contain"
            // className="absolute z-[-1] hidden h-full w-full max-w-[842px] lg:flex  "
            className="z-[-1]  hidden h-full  w-full  lg:flex lg:flex-1 lg:flex-col"
          />
        </div>
        <section className=" flex  flex-col items-center overflow-clip  ">
          <div className="relative flex  h-full w-full max-w-[842px] flex-col max-lg:items-center  ">
            {/* Mobile Start */}
            <div className="pb-[44px] lg:hidden">
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
              <div className="flex w-full justify-center">
                <p className="max-w-[320px]  pt-6 text-center text-[14px] font-[300] leading-[22px] text-[#F3F3F3] lg:text-[16px] lg:leading-[24px]">
                  We're inviting everyone who's purchased <br /> our car covers
                  to share their experience.
                </p>
              </div>
            </div>
            {/* Mobile End */}
            {/* Desktop Start */}
            <div className="relative hidden min-h-[425px] lg:flex lg:justify-between lg:gap-[35px]">
              <div className="flex flex-col items-center justify-center px-[40px] ">
                <div className="flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#717171] px-4 py-[3.5px] ">
                  <p className="text-[white]">Special Event</p>
                </div>
                <p className="pt-[28px] text-[32px] font-[900] leading-[37.5px] text-[#F3F3F3]">
                  Get $200
                </p>
                <p className="pt-[6px] text-[22px] font-[500] leading-[25.78px] text-[#F3F3F3]">
                  For Your Honest Review
                </p>
                <p className="flex w-full max-w-[320px] pb-[44px] pt-6   text-[14px] font-[300] leading-[22px] text-[#F3F3F3] lg:text-[16px] lg:leading-[24px]">
                  We're inviting everyone who's purchased <br /> our car covers
                  to share their experience.
                </p>
              </div>
              <Image
                alt="phone-car"
                src={PhoneRec}
                className=" -mr-[min(1vw,20px)] w-full min-w-[366px]  max-w-[457px] py-[85px]"
              />
            </div>
            {/* Desktop End */}
          </div>
        </section>
        <section className="flex flex-col bg-[#F3F3F3] pt-[50px]">
          <div className="z-[3] flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#D13030] px-4 py-[3.5px] ">
            <p className=" text-[white]">How It Works:</p>
          </div>
          <div className="relative flex  flex-col items-center gap-[22px] pb-[40px] pt-[32px] lg:pb-[68px] ">
            <div className="absolute left-1/2 top-[-10px] h-full -translate-x-1/2 lg:top-[0px]">
              <Image
                src={BigDownArrow}
                alt="big-down-arrow"
                className="h-full min-h-[110%] w-full min-w-[60px] lg:hidden lg:min-w-[120px] "
              />
              <Image
                src={BiggerArrow}
                alt="bigger-down-arrow"
                className="hidden h-full min-h-[110%] w-full min-w-[60px] lg:block  "
              />
            </div>
            {steps.map(({ icon, title, description }, i) => (
              <div className="z-[1] flex w-full max-w-[320px] items-center gap-[14px] rounded-[12px] bg-[white] px-[10px] py-5 lg:max-w-[680px] lg:justify-center lg:gap-[100px]">
                <div className={`min-w-[${iconSize}px]`}>{icon}</div>
                <div className="flex flex-col text-[14px] font-[900] leading-[15px] lg:w-[321px]">
                  <p className="text-[#D13030]">Step. {i + 1}</p>
                  <p className="pt-1">{title}</p>
                  <p className="pt-2 text-[12px] font-[300]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex justify-center px-[27px] py-[70px] lg:py-[110px]">
          <div className="z-[1] flex w-full max-w-[345px] items-center gap-[50px] rounded-[10px] bg-[white] py-[15px] pl-[30px] pr-[15px] text-[#D13030] outline outline-[2px]  outline-[#D13030] lg:max-w-[680px] lg:justify-center lg:gap-[110px]">
            <FilledAtm
              className={`flex w-full min-w-[${iconSize}px] max-w-[60px] lg:min-h-[108px] lg:min-w-[138px] lg:max-w-[128px]`}
            />
            <div className="flex max-w-[235px] flex-col  text-[14px] leading-[15px]">
              <p className="pt-1 text-[26px] font-[900] leading-[30px]">
                Get $200
              </p>
              <p className="pt-2 text-[12px] ">
                Send them to us and get cash via Zelle, Paypal, Venmo, etc.
              </p>
            </div>
          </div>
        </section>
        <section className="flex w-full max-w-[] flex-col  bg-[black] px-4 pt-10 ">
          <div className="flex flex-col self-center">
            <p className=" text-[14px] font-[700] leading-[30px] text-[white]">
              Participating will:
            </p>
            <ul className=" list-disc text-[14px]  text-[#d6d6d6d3] ">
              <li className="list-item">Reward you with $200 in cash</li>
              <li className="list-item">
                Assist others in making well-informed decisions
              </li>
              <li className="list-item">Help us enhance our products</li>
            </ul>
          </div>

          <p className="w-full items-center pb-[30px] pt-[60px] text-center text-[26px] font-[900] leading-[30px] text-[white]">
            Join now!
          </p>
        </section>
        <section className="bg-black">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeRn7m2eZEvWFmOe9OfYZMrvduLhM8vPpVJTFzLVLRLtyVUyQ/viewform?embedded=true"
            className="min-h-[620px] w-full bg-white text-white"
          >
            Loading…
          </iframe>
        </section>
      </div>
    </div>
  );
}
