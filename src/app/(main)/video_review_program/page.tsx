'use client';
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
import { useMediaQuery } from '@mantine/hooks';

export default function VideoReviewPage() {
  const isMobile = useMediaQuery('(max-width: 621px)');
  const iconSize = isMobile ? 33 : 45;
  const LgBr = () => <br className="hidden min-[621px]:flex" />;

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
      description:
        'Receive our email with simple guidelines and questions to help you prepare your review.',
    },
    {
      icon: <MdOutlinePhotoCamera size={iconSize} />,
      title: 'Record Your Review',
      description: (
        <>
          Record a video review and take photos,
          <LgBr /> No edits needed!
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex w-full max-w-[845px] flex-col object-contain">
        <section className=" flex  flex-col items-center overflow-clip  ">
          <div className="relative flex  h-full w-full  flex-col  min-[621px]:items-center  ">
            <Image
              alt="video_reviews_bg"
              src={isMobile ? MobileBG : DesktopBG}
              className="absolute z-[-1] h-full w-full "
            />
            {/* Mobile Start */}
            <div className="flex w-full flex-col items-center pb-[44px] min-[621px]:hidden">
              <div className="flex flex-col items-center pt-[44px] ">
                <div className="flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#717171] px-4 py-[3.5px] ">
                  <p className="text-[white]">Special Event</p>
                </div>
                <p className="pt-[28px] text-[38px] font-[900] leading-[37.5px] text-[#F3F3F3]">
                  Get $200
                </p>
                <p className="pt-[6px] text-[22px] font-[500] leading-[25.78px] text-[#F3F3F3]">
                  For Your Honest Review
                </p>
              </div>
              <div className="-mr-[min(2vw,20px)] flex min-h-[217px] w-full items-center self-end pt-5 min-[621px]:-mr-[min(5vw,40px)]">
                <Image
                  alt="phone-car"
                  src={PhoneRec}
                  className="  h-full w-full  "
                />
              </div>
              <div className="flex w-full justify-center">
                <p className="flex max-w-[320px]  pt-6 text-center text-[16px] font-[300] leading-[22px] text-[#F3F3F3]  min-[621px]:text-[1px]  min-[621px]:leading-[24px]">
                  We're inviting everyone who's purchased
                  <br className="hidden max-[702px]:block" /> our car covers to
                  share their experience.
                </p>
              </div>
            </div>
            {/* Mobile End */}
            {/* Desktop Start */}
            <section className="relative hidden min-h-[425px] w-full  items-center  min-[621px]:flex min-[621px]:justify-between min-[621px]:gap-[30px] min-[621px]:gap-[35px]">
              <div className="flex w-full max-w-[320px] flex-col items-center justify-center  ">
                <div className="flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#717171] px-4 py-[3.5px] ">
                  <p className="text-[white]">Special Event</p>
                </div>
                <p className="pt-[28px] text-[32px] font-[900] leading-[37.5px] text-[#F3F3F3]">
                  Get $200
                </p>
                <p className="pt-[6px] text-center text-[22px] font-[500] leading-[25.78px] text-[#F3F3F3]">
                  For Your Honest Review
                </p>
                <p className="flex pb-[44px] pt-6  text-[14px] font-[300] leading-[22px] text-[#F3F3F3]  min-[621px]:text-[16px]  min-[621px]:leading-[24px]">
                  We're inviting everyone who's purchased{' '}
                  <br className="hidden min-[702px]:block" /> our car covers to
                  share their experience.
                </p>
              </div>
              <Image
                alt="phone-car"
                src={PhoneRec}
                className=" -mr-[min(1vw,20px)] w-full min-w-[366px]  max-w-[457px] self-center justify-self-end"
              />
            </section>
            {/* Desktop End */}
          </div>
        </section>
        <section className="flex flex-col bg-[#F3F3F3] pt-[50px]">
          <div className="z-[3] flex items-center justify-center self-center whitespace-nowrap rounded-full bg-[#D13030] px-4 py-[3.5px] ">
            <p className="text-[18px] leading-[21px] text-[white]">
              How It Works:
            </p>
          </div>
          <div className="relative flex  flex-col items-center gap-[22px] pb-[40px] pt-[32px]  min-[621px]:pb-[68px] ">
            <div className="absolute left-1/2 top-[-10px] h-full -translate-x-1/2  min-[621px]:top-[0px]">
              <Image
                src={BigDownArrow}
                alt="big-down-arrow"
                className="h-full min-h-[110%] w-full min-w-[60px]  min-[621px]:hidden  min-[621px]:min-w-[120px] "
              />
              <Image
                src={BiggerArrow}
                alt="bigger-down-arrow"
                className="hidden h-full min-h-[110%] w-full min-w-[60px]  min-[621px]:block  "
              />
            </div>
            {steps.map(({ icon, title, description }, i) => (
              <div className="z-[1] flex min-h-[130px] w-full max-w-[320px] items-center gap-[18px] rounded-[12px] bg-[white] px-[30px] py-5  min-[621px]:max-w-[680px]  min-[621px]:justify-center  min-[621px]:gap-[100px]">
                <div className={`min-w-[${iconSize}px]`}>{icon}</div>
                <div className="flex flex-col text-[14px] font-[900] leading-[15px]  min-[621px]:w-[321px]">
                  <p className="text-[18px] font-[700] text-[#D13030] min-[621px]:text-[22px]">
                    Step. {i + 1}
                  </p>
                  <p className="pt-2 text-[18px] min-[621px]:pt-3 min-[621px]:text-[24px]">
                    {title}
                  </p>
                  <p className=" pt-2.5 text-[16px] font-[300] leading-[20px] min-[621px]:pt-[16px] min-[621px]:text-[18px] min-[621px]:leading-[24px] ">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex justify-center px-[27px] py-[70px]  min-[621px]:py-[110px]">
          <div className="z-[1] flex w-full max-w-[345px] items-center gap-[50px] rounded-[10px] bg-[white] py-[15px] pl-[30px] pr-[15px] text-[#D13030] outline outline-[2px]  outline-[#D13030]  min-[621px]:max-w-[680px]  min-[621px]:justify-center  min-[621px]:gap-[110px]">
            <FilledAtm
              className={`flex w-full min-w-[${iconSize}px] max-w-[60px]  min-[621px]:min-h-[108px]  min-[621px]:min-w-[138px]  min-[621px]:max-w-[128px]`}
            />
            <div className="flex max-w-[265px] flex-col  text-[14px] leading-[15px]">
              <p className="text-[28px] font-[900] leading-[30px] min-[621px]:text-[36px] min-[621px]:leading-[42px]">
                Get $200
              </p>
              <p className="pt-1.5 text-[16px] leading-[15px] min-[621px]:text-[20px] min-[621px]:leading-[22px] ">
                Send them to us and get cash <LgBr /> via Zelle, Paypal, Venmo,
                etc.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-[50px]  flex  flex-col bg-[black] px-4 pt-10  ">
          <div className="flex flex-col px-8 text-[18px]  leading-[30px] min-[621px]:self-center min-[621px]:justify-self-center  min-[621px]:text-[20px]">
            <p className=" font-[700] text-[white]">Participating will:</p>
            <ul className="flex list-disc flex-col gap-1 pt-1  text-[#d6d6d6d3] ">
              <li className="list-item">Reward you with $200 in cash</li>
              <li className="list-item">
                Assist others in making well-informed decisions
              </li>
              <li className="list-item">Help us enhance our products</li>
            </ul>
          </div>

          <p className="w-full items-center pb-[30px] pt-[60px] text-center text-[30px] font-[900] leading-[30px] text-[white] min-[621px]:text-[32px]">
            Join now!
          </p>
        </section>
        <iframe
          height={isMobile ? 1450 : 1300}
          src="https://docs.google.com/forms/d/e/1FAIpQLSeRn7m2eZEvWFmOe9OfYZMrvduLhM8vPpVJTFzLVLRLtyVUyQ/viewform?embedded=true"
          className="w-full "
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
